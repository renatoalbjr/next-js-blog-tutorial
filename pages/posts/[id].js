import Head from "next/head";
import Date from "../../components/date";
import Layout from "../../components/layout";
import { getAllPostsIds, getPostData } from "../../lib/posts";

export default function Post({ post }) {
  return (
    <Layout>
      <Head>
        <title>{post.title}</title>
      </Head>
      <h1 className="text-4xl font-extrabold tracking-tighter my-4">
        {post.title}
      </h1>
      <Date dateString={post.date} className="text-zinc-400" />
      <div
        className="reset-tailwind-preflight"
        dangerouslySetInnerHTML={{
          __html: post.content,
        }}
      />
    </Layout>
  );
}

export function getStaticPaths() {
  return {
    paths: getAllPostsIds().map((id) => {
      return {
        params: {
          id,
        },
      };
    }),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  return {
    props: {
      post: await getPostData(params.id),
    },
  };
}
