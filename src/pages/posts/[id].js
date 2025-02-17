import { fetchPosts } from "../../services/posts";
import Link from "next/link";

export async function getStaticPaths() {
  const posts = await fetchPosts(); // Fetch all posts
  const paths = posts.map((post) => ({
    params: { id: post.id.toString() }, // Convert id to string as required by Next.js
  }));

  return {
    paths,
    fallback: false, // `false` means other routes will 404
  };
}

export async function getStaticProps({ params }) {
  const posts = await fetchPosts();
  const post = posts.find((p) => p.id.toString() === params.id);

  if (!post) {
    return { notFound: true };
  }

  return {
    props: { post },
  };
}

export default function Post({ post }) {
  return (
    <>
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-700">{post.body}</p>
        <br />
        <p className="text-gray-700 text-sm">
          {"Author/Post ID: "}
          {post.userId}
        </p>
        <br/>
        {/* Go back button inside a styled box */}
      <div>
        <Link
          href={`/`}
          className="inline-block text-white bg-red-500 px-6 py-2 rounded-lg shadow-lg hover:bg-red-600"
        >
          Go back to Home
        </Link>
      </div>
      </div>
      
    </>
  );
}
