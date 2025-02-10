"use client";
import Link from "next/link";
import { useState } from "react";

// PostItem Component for individual posts
const PostItem = ({ post }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div key={post?._id} className="mb-5 p-4 bg-gray-50 rounded-lg shadow">
      <h2 className="text-xl font-semibold text-gray-700">{post?.title}</h2>
      <p className="text-gray-600">
        {post.description.length > 100
          ? `${post.description.substring(0, 100)}...`
          : post.description}
      </p>
      <Link
        href={`/posts/${post?._id}`}
        className="text-blue-500 hover:text-blue-700 transition duration-300"
      >
        Read more
      </Link>
    </div>
  );
};

export default PostItem;
