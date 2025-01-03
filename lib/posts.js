import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import prism from 'remark-prism';
import gfm from 'remark-gfm';
import { rehype } from 'rehype'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import rehypeToc from 'rehype-toc'
import readingTime from 'reading-time';
import { externalPosts } from './external_posts';
import { imageHandler } from './mdast-handlers';

const contentPathMapping = {
  posts: path.join(
    process.cwd(),
    'content',
    'posts'
  ),
  'vim-adventures': path.join(
    process.cwd(),
    'content',
    'vim-adventures'
  )
}

export function getAllPosts(contentType) {
  contentType = contentType || 'posts';
  const postsDirectory = contentPathMapping[contentType];

  let fileNames = [];
  try {
    fileNames = fs.readdirSync(postsDirectory);
  } catch (error) {
    console.log('postsDirectory', postsDirectory)
    console.log('error', error)
  }

  let allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
      readTime: getReadTime(matterResult.content),
    };
  });

  // Combine external posts with internal posts
  if (contentType === "posts") {
    allPostsData.push(...externalPosts);
  }

  // filter out drafts
  if (process.env.NODE_ENV !== 'development') {
    allPostsData = allPostsData.filter((post) => post.draft !== true)
  }

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    }

    return -1;
  });
}

export function getAllPostIds(contentType) {
  const postsDirectory = contentPathMapping[contentType || 'posts'];
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getPostData(id, contentType) {
  const postsDirectory = contentPathMapping[contentType || 'posts'];
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);

  const processedCont = await remark()
    .use(gfm)
    .use(html, {
      sanitize: false, handlers: {
        code: prism,
        image: imageHandler,
      }
    })
    .use(prism)
    .process(matterResult.content)

  const contentHTML = processedCont.toString()

  let rehypePipeline = rehype()
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: 'wrap',
      properties: { class: 'anchor' }
    })

  // Add table of contents if it's enabled
  if (matterResult.data.toc) {
    rehypePipeline = rehypePipeline.use(rehypeToc, { nav: false })
  }

  const processedHTML = await rehypePipeline.process(contentHTML)
  return {
    id,
    contentHTML: processedHTML.toString(),
    ...matterResult.data,
    readTime: getReadTime(matterResult.content),
  };
}

const getReadTime = (content) => {
  const result = readingTime(content);
  return result.text;
} 
