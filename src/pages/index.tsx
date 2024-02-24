import React from "react";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import api from "@/api/base";
import { toast } from "react-hot-toast";
import type { BlogPostList as BlogPostListType } from "@/utils/interfaces/BlogPostList";
import Button from "@/components/Button";
import Image from "next/image";

export async function getServerSideProps() {
  try {
    const response = await api.get("posts");
    const data = response.data;
    return { props: { blogPosts: data } };
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    toast.error("An error occurred while loading data");
    return { props: { blogPosts: [] } };
  }
}

type HomeProps = {
  blogPosts: BlogPostListType[];
};

export default function Home({ blogPosts }: HomeProps) {
  const truncateText = (text: string, maxWords: number) => {
    const words = text.split(" ");
    const truncated = words.slice(0, maxWords).join(" ");
    return words.length > maxWords ? `${truncated} ...` : truncated;
  };

  return (
    <Layout>
      <Seo templateTitle="List Blog" />
      <div className="pt-16 pb-10 lg:pb-20 text-center text-black">
        <p className="pb-2 text-2xl lg:text-5xl font-bold">
          <span className=" px-2 pr-2 rounded-md bg-gofleet-secondary-3 text-white">
            GoFleet
          </span>
          Blog
        </p>
        <p className="text-lg lg:text-2xl">Welcome to GoFleet Blog!</p>
      </div>
      <div className="grid md:grid-cols-3 px-5 md:px-36 pb-10 gap-4">
        {blogPosts &&
          blogPosts.map((post) => (
            <div key={post.id} className="pt-5">
              <Image
                src="/images/logo.svg"
                alt="Logo gofleet"
                width={300}
                height={300}
                priority
                className="hidden lg:block mx-auto pb-3"
              />
              <Image
                src="/images/logo.svg"
                alt="Logo gofleet"
                width={200}
                height={200}
                priority
                className="lg:hidden mx-auto pb-3"
              />
              <p className="font-bold text-xl text-gray-800">{post.title}</p>
              <p className="pb-5 text-justify font-medium text-lg text-gray-500">
                {truncateText(post.body, 10)}
              </p>
              <Button variant="primary">
                <a href={`/blog-post-list`}>Read more</a>
              </Button>
            </div>
          ))}
      </div>
    </Layout>
  );
}
