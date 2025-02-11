// the detaild page for each post
import React from "react";
import Link from "next/link";
import { fetchPosts } from "../services/posts"; // Import the fetchPosts function

// Fetch posts at build time using getStaticProps
export async function getStaticProps() {
  const posts = await fetchPosts(); // Use the imported function
  return {
    props: {
      posts,
    },
  };
}

export default function Home({ posts }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <main className="flex flex-col items-center justify-center flex-grow">
        <div className="p-5 w-full max-w-screen-xl">
          <h1 className="text-2xl font-bold mb-6">Blog Posts</h1>
          {/* Responsive Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {posts.map((post) => (
              <div key={post.id} className="border rounded-lg shadow-lg p-4">
                {/* Post Title */}
                <h2 className="text-xl font-semibold mb-2">
                  <Link href={`/posts/${post.id}`}>
                    <a className="text-blue-600 hover:underline">{post.title}</a>
                  </Link>
                </h2>
                {/* Post Body (First 100 characters) */}
                <p className="text-gray-700 mb-4">
                  {post.body.slice(0, 100)}...
                </p>
                {/* "Read More" Link */}
                <Link href={`/posts/${post.id}`}>
                  <a className="text-blue-500 hover:underline">Read More</a>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
