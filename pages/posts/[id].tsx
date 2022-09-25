import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Date from "../../components/date";
import Layout from "../../components/layout";
import { getAllPostsIds, getPostData, IPost } from "../../lib/posts";

export default function Post({ post }: { post: IPost }) {
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

export const getStaticPaths: GetStaticPaths = () => {
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
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: {
      post: await getPostData(params.id as string),
    },
  };
};
