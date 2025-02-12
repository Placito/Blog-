import { fetchPosts } from "../../services/posts";

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
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-700">{post.body}</p>
    </div>
  );
}
