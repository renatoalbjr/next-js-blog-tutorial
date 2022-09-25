import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDir = path.join(process.cwd(), "posts");

function getPostID(filename) {
  return filename.replace(/\.md$/, "");
}

export interface IPost {
  id: string;
  content: string;
  title: string;
  date: string;
}

export function getAllPostsData(): IPost[] {
  const filenames = fs.readdirSync(postsDir);
  const allPosts = filenames.map((filename) => {
    const id = getPostID(filename);

    const fileContent = fs.readFileSync(path.join(postsDir, filename), "utf-8");

    const { data, content } = matter(fileContent);
    const { title, date } = data;

    const post: IPost = {
      id,
      title,
      date,
      content,
    };

    return post;
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

export function getAllPostsIds(): string[] {
  const filenames = fs.readdirSync(postsDir);
  return filenames.map((filename) => getPostID(filename));
}

export async function getPostData(id: string) {
  const fileContent = fs.readFileSync(path.join(postsDir, `${id}.md`), "utf-8");

  const matterResult = matter(fileContent);
  const contentHTML = await remark().use(html).process(matterResult.content);
  const content = contentHTML.toString();

  const post: IPost = {
    id,
    content,
    title: matterResult.data.title,
    date: matterResult.data.date,
  };

  return post;
}
