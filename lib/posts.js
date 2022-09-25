import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDir = path.join(process.cwd(), "posts");

function getPostID(filename) {
  return filename.replace(/\.md$/, "");
}

export function getAllPostsData() {
  const filenames = fs.readdirSync(postsDir);
  const allPosts = filenames.map((filename) => {
    const id = getPostID(filename);

    const fileContent = fs.readFileSync(path.join(postsDir, filename), "utf-8");

    const post = matter(fileContent);

    return {
      id,
      ...post.data,
      content: post.content,
    };
  });

  return allPosts.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}

export function getAllPostsIds() {
  const filenames = fs.readdirSync(postsDir);
  return filenames.map((filename) => getPostID(filename));
}

export async function getPostData(id) {
  const fileContent = fs.readFileSync(path.join(postsDir, `${id}.md`), "utf-8");

  const post = matter(fileContent);
  const contentHTML = await remark().use(html).process(post.content);
  const content = contentHTML.toString();

  return {
    id,
    content,
    ...post.data,
  };
}
