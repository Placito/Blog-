// Fetch the list of posts
export async function fetchPosts() {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = await res.json();
    return posts;
  }
  
  // Fetch a single post by ID
  export async function fetchPostById(id) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const post = await res.json();
    return post;
  }
  