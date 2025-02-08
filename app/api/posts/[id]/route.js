import Post from "@/models/Post";
import connectDB from "@/utils/connectDb";
import { NextResponse } from "next/server";

// GET Request - Get a single post by ID
export async function GET(request, { params }) {
  // Connect to the database
  await connectDB();

  try {
    // Await the params object and destructure the `id`
    const { id } = await params;

    // Database Operations
    const post = await Post.findById(id);

    // If the post is not found, return a 404 error
    if (!post) {
      return new NextResponse(JSON.stringify({ message: "Post not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Return the post as a JSON response
    return new NextResponse(JSON.stringify({ post }), {
      status: 200, // Indicates successful request
      headers: { "Content-Type": "application/json" }, // Add headers
    });
  } catch (error) {
    console.error("Error fetching post:", error);
    return new NextResponse(
      JSON.stringify({ message: "Failed to fetch post: " + error.message }),
      {
        status: 500, // Server error status code
        headers: { "Content-Type": "application/json" }, // Add headers
      }
    );
  }
}
// PUT Request - Get a single post by ID and update it
export async function PUT(request, { params }) {
  // Connect to the database
  await connectDB();

  // Get the payload
  const data = await request.json();

  try {
    // Await the params object and destructure the `id`
    const { id } = await params;

    // Database Operations
    const post = await Post.findByIdAndUpdate(id, data, { new: true });

    // If the post is not found, return a 404 error
    if (!post) {
      return new NextResponse(JSON.stringify({ message: "Post not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Return the post as a JSON response
    return new NextResponse(JSON.stringify({ post }), {
      status: 200, // Indicates successful request
      headers: { "Content-Type": "application/json" }, // Add headers
    });
  } catch (error) {
    console.error("Error fetching post:", error);
    return new NextResponse(
      JSON.stringify({ message: "Failed to fetch post: " + error.message }),
      {
        status: 500, // Server error status code
        headers: { "Content-Type": "application/json" }, // Add headers
      }
    );
  }
}
// DELETE Request - Get a single post by ID and delete it
export async function DELETE(request, { params }) {
  // Connect to the database
  await connectDB();

  try {
    // Await the params object and destructure the `id`
    const { id } = await params;

    // Database Operations
    const post = await Post.findByIdAndDelete(id);

    // If the post is not found, return a 404 error
    if (!post) {
      return new NextResponse(JSON.stringify({ message: "Post not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Return the post as a JSON response
    return new NextResponse(
      JSON.stringify({ message: "Post deleted successfully ✅" }),
      {
        status: 200, // Indicates successful request
        headers: { "Content-Type": "application/json" }, // Add headers
      }
    );
  } catch (error) {
    console.error("Error fetching post:", error);
    return new NextResponse(
      JSON.stringify({ message: "Failed to fetch post: " + error.message }),
      {
        status: 500, // Server error status code
        headers: { "Content-Type": "application/json" }, // Add headers
      }
    );
  }
}
