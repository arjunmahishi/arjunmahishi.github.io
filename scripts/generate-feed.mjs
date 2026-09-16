import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import matter from 'gray-matter';
import { remark } from 'remark';
import { externalPosts } from '../lib/external_posts.js';

const siteUrl = 'https://arjunmahishi.com';

function escapeXml(value) {
  return String(value).replace(/[<>&"']/g, (character) => ({
    '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;',
  })[character]);
}

function excerpt(content) {
  const paragraph = remark().parse(content).children.find((node) => node.type === 'paragraph');
  function text(node) {
    if (node.type === 'html' || node.type === 'image') return '';
    return node.children ? node.children.map(text).join('') : node.value || '';
  }
  const summary = paragraph ? text(paragraph).replace(/\s+/g, ' ').trim() : '';
  return summary.length > 300 ? `${summary.slice(0, 297).trimEnd()}…` : summary;
}

export async function generateFeed(postsDirectory, external = externalPosts) {
  const files = (await fs.readdir(postsDirectory)).filter((file) => file.endsWith('.md'));
  const posts = await Promise.all(files.map(async (file) => {
    const { data, content } = matter(await fs.readFile(path.join(postsDirectory, file), 'utf8'));
    return {
      ...data,
      id: file.replace(/\.md$/, ''),
      description: data.description || excerpt(content),
    };
  }));

  const items = [...posts, ...external].filter((post) => post.draft !== true).map((post) => {
    const date = new Date(post.date);
    if (!post.title || !post.date || Number.isNaN(date.getTime())) {
      throw new Error(`Missing title or invalid date for post: ${post.id}`);
    }
    const url = new URL(post.url || `/posts/${post.id}/`, siteUrl).href;
    return { ...post, date, url };
  }).sort((a, b) => b.date - a.date || a.url.localeCompare(b.url));

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Arjun Mahishi</title>
    <link>${siteUrl}/</link>
    <description>Software &amp; other interests by Arjun Mahishi</description>
    <language>en</language>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
${items.map((post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(post.url)}</link>
      <guid isPermaLink="true">${escapeXml(post.url)}</guid>
      <pubDate>${post.date.toUTCString()}</pubDate>
      <description>${escapeXml(post.description || `Read ${post.title} on ${new URL(post.url).hostname}.`)}</description>
    </item>`).join('\n')}
  </channel>
</rss>
`;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const feed = await generateFeed(path.join(process.cwd(), 'content', 'posts'));
  await fs.writeFile(path.join(process.cwd(), 'public', 'feed.xml'), feed);
}
