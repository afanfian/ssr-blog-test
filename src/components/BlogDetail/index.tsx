import React from "react";
import Image from "next/image";
import { BlogPostList as BlogPostListType } from "@/utils/interfaces/BlogPostList";

interface BlogPostProps {
  posts: BlogPostListType;
}

const BlogDetailComponent: React.FC<BlogPostProps> = ({ posts }) => {
  return (
    <div className="space-y-2">
      <Image
        src="/images/logo.svg"
        alt="Logo gofleet"
        width={400}
        height={400}
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
      <div className="text-justify space-y-1 gap-5">
        <p className="font-bold text-xl text-gray-800">{posts?.title}</p>
        <p className="pb-2 text-justify font-medium text-xl text-gray-500">
          {posts?.body}
        </p>
      </div>
    </div>
  );
};

export default BlogDetailComponent;
