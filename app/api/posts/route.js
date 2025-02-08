import Post from "@/models/Post";
import { NextResponse } from "next/server";
import connectDB from "@/utils/connectDb";

// ! POST Request - Create a new post
export async function POST(request) {
  // Connect to the database
  await connectDB();

  // Get the payload
  const data = await request.json();

  try {
    // Database Operations
    const post = await Post.create(data);
    return new NextResponse(JSON.stringify({ post }), {
      status: 201, // Indicates successful creation
      headers: { "Content-Type": "application/json" }, // Add headers
    });
  } catch (error) {
    console.error("Error creating post:", error);
    return new NextResponse(
      JSON.stringify({ message: "Failed to create post: " + error.message }),
      {
        status: 500, // Server error status code
        headers: { "Content-Type": "application/json" }, // Add headers
      }
    );
  }
}
// ? GET Request - List All Posts
export async function GET() {
  // Connect to the database
  await connectDB();

  try {
    // Database Operations
    const posts = await Post.find();
    return new NextResponse(JSON.stringify({ posts }), {
      status: 200, // Indicates successful request
      headers: { "Content-Type": "application/json" }, // Add headers
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return new NextResponse(
      JSON.stringify({ message: "Failed to fetch posts: " + error.message }),
      {
        status: 500, // Server error status code
        headers: { "Content-Type": "application/json" }, // Add headers
      }
    );
  }
}
