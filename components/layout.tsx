import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { HTMLProps, ReactNode } from "react";

const name = "Your Name";
export const siteTitle = "Next.js Sample Website";

interface props extends HTMLProps<HTMLDivElement> {
  home?: boolean;
}

export default function Layout({ children, home, className }: props) {
  return (
    <div
      className={
        "max-w-xl border p-4 mt-12 mb-24 mx-auto rounded-xl backdrop-blur-sm " +
        className
      }
    >
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className="flex flex-col items-center">
        {home ? (
          <>
            <Image
              priority
              src="/images/profile.jpg"
              className="rounded-full"
              height={144}
              width={144}
              alt=""
            />
            <h1 className="text-[2.5rem] leading-[1.2rem] font-extrabold tracking-tighter my-4">
              {name}
            </h1>
          </>
        ) : (
          <>
            <Link href="/">
              <a className="pointer-events-auto">
                <Image
                  priority
                  src="/images/profile.jpg"
                  className="rounded-full"
                  height={108}
                  width={108}
                  alt=""
                />
              </a>
            </Link>
            <h2 className="text-2xl font-bold my-4">
              <Link href="/">
                <a className="pointer-events-auto text-inherit">{name}</a>
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className="my-12">
          <Link href="/">
            <a className="pointer-events-auto hover:text-zinc-400">
              ← Back to home
            </a>
          </Link>
        </div>
      )}
    </div>
  );
}
