import { fetchPosts } from "../../services/posts"; // Import function to fetch posts from the service
import Link from "next/link"; // Import Link from Next.js to handle navigation between pages

// This function is used to fetch all the possible paths for dynamic routes at build time
export async function getStaticPaths() {
  const posts = await fetchPosts(); // Fetch all posts
  const paths = posts.map((post) => ({
    params: { id: post.id.toString() }, // Convert post ID to string as required by Next.js
  }));

  return {
    paths, // Return an array of paths to pre-render at build time
    fallback: false, // If a user navigates to a path not in `paths`, show a 404 page (no fallback)
  };
}

// This function fetches the data needed to render the page for each post at build time
export async function getStaticProps({ params }) {
  const posts = await fetchPosts(); // Fetch all posts
  const post = posts.find((p) => p.id.toString() === params.id); // Find the post matching the dynamic `id` param

  if (!post) {
    return { notFound: true }; // If no post is found, return `notFound` to show a 404 page
  }

  return {
    props: { post }, // Return the post data as props to the component
  };
}

// Post component that will display each post's details
export default function Post({ post }) {
  return (
    <>
      <div className="p-6 max-w-3xl mx-auto">
        {/* Post title */}
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        
        {/* Post body/content */}
        <p className="text-gray-700">{post.body}</p>
        <br />
        
        {/* Post user ID (or author) */}
        <p className="text-gray-700 text-sm">
          {"Author/Post ID: "}
          {post.userId}
        </p>
        <br />
        
        {/* Go back to Home button inside a styled box */}
        <div>
          <Link
            href={`/`} // Link to navigate back to the home page
            className="inline-block text-white bg-red-500 px-6 py-2 rounded-lg shadow-lg hover:bg-red-600"
          >
            Go back to Home
          </Link>
        </div>
      </div>
    </>
  );
}
