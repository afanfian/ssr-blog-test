import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import { BlogPostList as BlogPostListType } from "@/utils/interfaces/BlogPostList";
import BlogDetailComponent from "@/components/BlogDetail";
import SearchInput from "@/components/SearchInput";
import PageSizeSelect from "@/components/PageSizeSelect";
import SortOrderSelect from "@/components/SortOrderSelect";
import SortBySelect from "@/components/SortBySelect";
import Loading from "@/components/Loading";
import api from "@/api/base";
import { toast } from "react-hot-toast";

export async function getServerSideProps() {
  try {
    const blogPostsResponse = await api.get("posts");
    const blogPostsData = blogPostsResponse.data;
    return {
      props: {
        blogPosts: blogPostsData,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    toast.error("An error occurred while loading data");
    return { props: { blogPosts: [] } };
  }
}

type BlogDetailProps = {
  blogPosts: BlogPostListType[];
};

export default function BlogDetail({ blogPosts }: BlogDetailProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<BlogPostListType[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortProperty, setSortProperty] = useState<"title">("title");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (blogPosts.length > 0) {
      setLoading(false);
    }
  }, [blogPosts]);

  // Data Blog
  console.log(blogPosts);

  useEffect(() => {
    const filteredPosts = blogPosts
      .filter((post) => {
        const searchableContent = `${post.title} ${post.body} `;
        return searchableContent
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      })
      .slice(0, pageSize);

    const sortedPosts = sortResults(filteredPosts);

    setSearchResults(sortedPosts);
  }, [searchQuery, blogPosts, pageSize, sortOrder, sortProperty]);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const handlePageSizeChange = (value: number) => {
    setPageSize(value);
  };

  const handleSortOrderChange = (value: "asc" | "desc") => {
    setSortOrder(value);
  };

  const handleSortPropertyChange = (value: "title") => {
    setSortProperty(value);
  };

  const getProperty = (obj: any, prop: string) => {
    if (prop) {
      return obj[prop].toLowerCase();
    }
  };

  const sortResults = (data: BlogPostListType[]): BlogPostListType[] => {
    const sortedData = [...data];
    sortedData.sort((a, b) => {
      const aValue = getProperty(a, sortProperty);
      const bValue = getProperty(b, sortProperty);

      if (sortOrder === "asc") {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });

    return sortedData;
  };

  return (
    <Layout>
      <Seo templateTitle="Blog Detail" />
      {loading && <Loading />}
      <div className={`pb-10 ${loading ? "hidden" : ""}`}>
        {" "}
        <div className="pt-16 pb-10 lg:pb-20 text-center text-black">
          <p className="pb-2 text-2xl lg:text-5xl font-bold">
            <span className=" px-2 pr-2 rounded-md bg-gofleet-secondary-3 text-white">
              GoFleet
            </span>
            Blog
          </p>
          <p className="text-lg lg:text-2xl">Welcome to GoFleet Blog Detail!</p>
        </div>
        <div className="px-5 md:px-36 gap-5">
          <div className="flex flex-col lg:flex-row justify-start lg:justify-between lg:items-center mb-10">
            <div className="pb-5 lg:pb-0">
              <SearchInput value={searchQuery} onChange={handleSearch} />
            </div>
            <div className="flex flex-col lg:flex-row space-y-5 lg:space-y-0">
              <div>
                <label className="mr-2">Show Data:</label>
                <PageSizeSelect
                  value={pageSize}
                  onChange={handlePageSizeChange}
                />
              </div>
              <div>
                <label className="mr-2 ml-0 lg:ml-4">Sort Order:</label>
                <SortOrderSelect
                  value={sortOrder}
                  onChange={handleSortOrderChange}
                />
              </div>
              <div>
                <label className="mr-2 ml-0 lg:ml-4">Sort By:</label>
                <SortBySelect
                  value={sortProperty}
                  onChange={handleSortPropertyChange}
                />
              </div>
            </div>
          </div>
          {searchResults.length === 0 ? (
            <p className="text-2xl font-bold text-center text-red-500">
              The data you are looking for does not exist!
            </p>
          ) : (
            searchResults.map((post) => {
              return <BlogDetailComponent key={post.id} posts={post} />;
            })
          )}
        </div>
      </div>
    </Layout>
  );
}
