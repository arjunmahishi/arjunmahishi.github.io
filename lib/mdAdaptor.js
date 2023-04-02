import { remark } from 'remark';
import html from 'remark-html';
// import prism from 'remark-prism';

export async function mdToHTML(rawMD) {
  return await remark()
    .use(html)
    // .use(prism)
    .process(rawMD)
}
