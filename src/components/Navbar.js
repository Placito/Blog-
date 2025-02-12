"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import React from "react";
import { useRouter } from "next/router"; // Import useRouter from next/router
import { fetchPosts } from "../services/posts"; // Import the fetchPosts function

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter(); // Use useRouter hook from Next.js
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [posts, setPosts] = useState([]); // To store the fetched posts

  // Navigation items array
  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
  ];

  useEffect(() => {
    // Fetch posts from the API when the component mounts
    const loadPosts = async () => {
      const postsData = await fetchPosts();
      setPosts(postsData); // Store posts data
    };
    loadPosts();
  }, []);

  /// Handle input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    // Filter posts based on title, userId, or id
    const filtered = posts.filter((post) => {
      const titleMatch = post.title.toLowerCase().includes(value.toLowerCase());
      const userIdMatch = post.userId.toString().includes(value);
      const idMatch = post.id.toString().includes(value);
      return titleMatch || userIdMatch || idMatch;
    });

    setFilteredSuggestions(filtered);
  };

  // Handle suggestion click
  const handleSuggestionClick = (post) => {
    setSearchQuery(post.title);
    setFilteredSuggestions([]);
    router.push(`/posts/${post.id}`); // Navigate to the post page using the post's ID
  };

  // Handle form submit (e.g., pressing Enter)
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Search query:", searchQuery);
    // Optional: You can add logic to search by title or ID if needed
    const foundPost = posts.find(
      (post) => post.title.toLowerCase() === searchQuery.toLowerCase()
    );
    if (foundPost) {
      router.push(`/posts/${foundPost.id}`); // Navigate to the post page if a match is found
    }
    setSearchQuery(""); // Clear the search input
  };

  return (
    <div>
      <nav className="block w-full max-w-screen px-4 py-4 mx-auto bg-white bg-opacity-90 sticky top-3 shadow lg:px-8 backdrop-blur-lg backdrop-saturate-150 z-[9999]">
        <div className="container flex flex-wrap items-center justify-between mx-auto text-slate-800">
          <Link
            href="/"
            className="mr-4 block cursor-pointer py-1.5 text-red-600 font-bold text-2xl active:text-red-800"
          >
            <svg
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              className="w-8 h-8" // You can control the size with Tailwind CSS
            >
              <g clipPath="url(#a)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.27 14.1a6.5 6.5 0 0 0 3.67-3.45q-1.24.21-2.7.34-.31 1.83-.97 3.1M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.48-1.52a7 7 0 0 1-.96 0H7.5a4 4 0 0 1-.84-1.32q-.38-.89-.63-2.08a40 40 0 0 0 3.92 0q-.25 1.2-.63 2.08a4 4 0 0 1-.84 1.31zm2.94-4.76q1.66-.15 2.95-.43a7 7 0 0 0 0-2.58q-1.3-.27-2.95-.43a18 18 0 0 1 0 3.44m-1.27-3.54a17 17 0 0 1 0 3.64 39 39 0 0 1-4.3 0 17 17 0 0 1 0-3.64 39 39 0 0 1 4.3 0m1.1-1.17q1.45.13 2.69.34a6.5 6.5 0 0 0-3.67-3.44q.65 1.26.98 3.1M8.48 1.5l.01.02q.41.37.84 1.31.38.89.63 2.08a40 40 0 0 0-3.92 0q.25-1.2.63-2.08a4 4 0 0 1 .85-1.32 7 7 0 0 1 .96 0m-2.75.4a6.5 6.5 0 0 0-3.67 3.44 29 29 0 0 1 2.7-.34q.31-1.83.97-3.1M4.58 6.28q-1.66.16-2.95.43a7 7 0 0 0 0 2.58q1.3.27 2.95.43a18 18 0 0 1 0-3.44m.17 4.71q-1.45-.12-2.69-.34a6.5 6.5 0 0 0 3.67 3.44q-.65-1.27-.98-3.1"
                  fill="#666"
                />
              </g>
              <defs>
                <clipPath id="a">
                  <path fill="#fff" d="M0 0h16v16H0z" />
                </clipPath>
              </defs>
            </svg>
          </Link>

          {/* Menu links - Horizontal Layout */}
          <div className="flex items-center space-x-6">
            {navItems.map((item, index) => (
              <li
                key={index}
                className="flex items-center p-1 text-lg gap-x-2 text-slate-600 hover:text-red-500"
              >
                <Link href={item.href} className="flex items-center">
                  {item.name}
                </Link>
              </li>
            ))}
            {/* Search Input Section */}
            <div className="hidden lg:block">
              <ul className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
                <li>
                  <form
                    className="max-w-md mx-auto"
                    onSubmit={handleSearchSubmit}
                  >
                    <label
                      htmlFor="default-search"
                      className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                    >
                      Search
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        id="default-search"
                        className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search here..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleSearchSubmit(e); // Trigger form submit if Enter is pressed
                          }
                        }}
                      />

                      {/* Autocomplete Suggestions */}
                      {filteredSuggestions.length > 0 && (
                        <ul className="absolute w-full bg-white border border-gray-300 mt-1 rounded-lg shadow-lg z-10">
                          {filteredSuggestions.map((post) => (
                            <li
                              key={post.id}
                              className="flex items-center p-1 text-lg gap-x-2 text-slate-600 hover:text-red-500"
                              onClick={() => handleSuggestionClick(post)}
                            >
                              {post.title} (ID: {post.id}, User: {post.userId})
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </form>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
