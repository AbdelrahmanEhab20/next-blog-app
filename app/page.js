import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          {/* Heading */}
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
            Welcome to <span className="text-blue-600">Blog Next</span>
          </h1>
          <p className="text-lg text-gray-600 mb-12">
            Your go-to place for sharing and reading amazing blog posts. Join
            our community and start writing today!
          </p>

          {/* Image */}
          <div className="relative w-full h-96 mb-12 rounded-xl overflow-hidden shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1461988320302-91bde64fc8e4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
              alt="Blog Image"
              layout="fill"
              objectFit="cover"
              className="transform hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              href="/posts/create"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105 shadow-md"
            >
              Add a New Post
            </Link>
            <Link
              href="/posts"
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition duration-300 transform hover:scale-105 shadow-md"
            >
              Explore Posts
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
