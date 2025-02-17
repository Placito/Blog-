import React from "react"; // Import React library for JSX support
import Link from "next/link"; // Import the Link component from Next.js for client-side navigation
import { fetchPosts } from "../services/posts"; // Import the fetchPosts function to fetch posts from an API or service

// Fetch posts at build time using getStaticProps
export async function getStaticProps() {
  const posts = await fetchPosts(); // Call the fetchPosts method to retrieve posts data
  return {
    props: {
      posts, // Return the fetched posts as props to the Home component
    },
  };
}

export default function Home({ posts }) {
  return (
    <div className="flex flex-col min-h-screen"> {/* Main wrapper for the page */}
      {/* Main Content */}
      <main className="flex flex-col items-center justify-center flex-grow">
        <div className="p-5 w-full max-w-screen-xl">
          {/* Title of the page */}
          <h1 className="text-2xl font-bold mb-6">Blog Posts</h1>

          {/* Responsive Grid Layout to display posts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {posts.map((post) => (
              <div key={post.id} className="border rounded-lg shadow-lg p-4 bg-white">
                {/* Post Title */}
                <h2 className="text-xl font-semibold mb-2">
                  <Link href={`/posts/${post.id}`}>
                    {post.title} {/* Title links to the post detail page */}
                  </Link>
                </h2>

                {/* Post Body (First 100 characters) */}
                <p className="text-gray-700 mb-4">
                  {post.body.slice(0, 100)}... {/* Display a preview of the post body */}
                </p>

                {/* "Read More" Link */}
                <Link href={`/posts/${post.id}`} className="text-blue-500 hover:underline">
                  Read More {/* Link to the full post detail */}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
