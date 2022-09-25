import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle } from "../components/layout";
import { getAllPostsData } from "../lib/posts";

export default function Home({ posts }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className="text-xl">
        <p className="my-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p className="my-6">
          (This is a sample website - you’ll be building a site like this on{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className="mt-4">
        <h2 className="font-bold text-3xl">Blog</h2>
        <ul>
          {posts.map((post) => {
            return (
              <li key={post.id} className="mt-6 mb-4">
                <Link href={"/posts/" + post.id}>
                  <a className="pointer-events-auto">
                    <h3 className="text-2xl hover:text-zinc-400">
                      {post.title}
                    </h3>
                  </a>
                </Link>
                <span className="text-zinc-400 text-sm">{post.date}</span>
              </li>
            );
          })}
        </ul>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = getAllPostsData();
  return {
    props: {
      posts,
    },
  };
}
