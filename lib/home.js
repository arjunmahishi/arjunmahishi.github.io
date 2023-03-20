import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import prism from 'remark-prism';

export async function getHomeContent() {
  const fullPath = path.join(process.cwd(), 'content', 'home.md');
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);

  const processedCont  = await remark()
   .use(html, { sanitize: false })
   .use(prism)
   .process(matterResult.content)

  const contentHTML = processedCont.toString()

  return {
    contentHTML,
    ...matterResult.data,
  };
}
