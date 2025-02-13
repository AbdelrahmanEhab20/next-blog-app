"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import Swal from "sweetalert2"; // Import SweetAlert2
import Loading from "../loading";

const PostDetails = ({ params }) => {
  const router = useRouter();

  // Unwrap params using React.use()
  const { id } = React.use(params); // Fix: Unwrap params

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch post data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/posts/${id}`);
        if (!response.ok) throw new Error("Failed to fetch post data");
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Delete post with SweetAlert2 confirmation
  const handleDeletePost = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`/api/posts/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) throw new Error("Failed to delete post");

          Swal.fire("Deleted!", "Your post has been deleted.", "success");
          router.push("/posts");
        } catch (error) {
          console.error("Error deleting post:", error);
          Swal.fire("Error!", "Failed to delete the post.", "error");
        }
      }
    });
  };
  // Loading state
  if (loading) {
    return <Loading />;
  }

  // Error state
  if (error) {
    return <Error message={error} />;
  }

  // Render post details
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Post Details</h1>
        <div className="flex space-x-4">
          <Link href={`/posts/edit/${data?.post?._id}`}>
            <button className="flex items-center text-blue-600 hover:text-blue-800 transition duration-300">
              <MdEdit size="24" className="mr-2" />
              Edit
            </button>
          </Link>
          <button
            onClick={handleDeletePost}
            className="flex items-center text-red-600 hover:text-red-800 transition duration-300"
          >
            <MdDelete size="24" className="mr-2" />
            Delete
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Title</h2>
          <p className="text-gray-600 mt-2">{data?.post?.title}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800">Description</h2>
          <p className="text-gray-600 mt-2">{data?.post?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
