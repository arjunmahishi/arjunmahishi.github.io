import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import prism from 'remark-prism';

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
  const postsDirectory = contentPathMapping[contentType || 'posts'];

  let fileNames = [];
  try {
     fileNames = fs.readdirSync(postsDirectory);
  } catch (error) {
    console.log('postsDirectory', postsDirectory)
    console.log('error', error)
  }

  const allPostsData = fileNames.map((fileName) => {
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
    };
  });

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

  const processedCont  = await remark()
   .use(html, { sanitize: false })
   .use(prism)
   .process(matterResult.content)

  const contentHTML = processedCont.toString()

  return {
    id,
    contentHTML,
    ...matterResult.data,
  };
}
