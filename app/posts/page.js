"use client";
import React, { useState, useEffect } from "react";
import PostItem from "./components/PostItem";
import Loading from "./loading";
import Error from "./error";

const AllPostsPage = () => {
  const [postsList, setPostsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch posts on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/posts`);
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();

        setPostsList(
          [...data.posts].sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          })
        );
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-slate-200">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 underline">
        All Posts - {postsList.length} Posts
      </h1>
      <ul className="space-y-6">
        {postsList?.map((post, index) => (
          <PostItem key={`${post.id}-${index}`} post={post} />
        ))}
      </ul>
    </div>
  );
};

export default AllPostsPage;
