"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetchPosts } from "../services/posts";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu toggle

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
  ];

  useEffect(() => {
    const loadPosts = async () => {
      const postsData = await fetchPosts();
      setPosts(postsData);
    };
    loadPosts();
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    const filtered = posts.filter((post) => {
      const titleMatch = post.title.toLowerCase().includes(value.toLowerCase());
      const userIdMatch = post.userId.toString().includes(value);
      const idMatch = post.id.toString().includes(value);
      return titleMatch || userIdMatch || idMatch;
    });
    setFilteredSuggestions(filtered);
  };

  const handleSuggestionClick = (post) => {
    setSearchQuery(post.title); // Set search query to the selected post title
    setFilteredSuggestions([]); // Clear suggestions
    router.push(`/posts/${post.id}`); // Navigate to the post's page
    setIsOpen(false); // Close mobile menu when a suggestion is clicked
    setSearchQuery(""); // Reset the search input field
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const foundPost = posts.find(
      (post) => post.title.toLowerCase() === searchQuery.toLowerCase()
    );
    if (foundPost) {
      router.push(`/posts/${foundPost.id}`);
    }
    setSearchQuery(""); // Reset the search input field after submitting
  };

  const handleMenuItemClick = () => {
    setIsOpen(false); // Close the menu when an item is clicked
  };

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-gray-700 hover:text-red-500">
            Blog
          </Link>
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 justify-center items-center">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-gray-700 hover:text-red-500"
              >
                {item.name}
              </Link>
            ))}

            {/* Desktop Search Bar  */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                className="border border-gray-300 rounded-lg px-4 py-2 w-64 focus:ring-2 focus:ring-blue-500"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
              {filteredSuggestions.length > 0 && (
                <ul className="absolute w-full bg-white border border-gray-300 mt-1 rounded-lg shadow-lg z-10">
                  {filteredSuggestions.map((post) => (
                    <li
                      key={post.id}
                      className="p-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSuggestionClick(post)} // Close menu when suggestion is clicked
                    >
                      {post.title}
                    </li>
                  ))}
                </ul>
              )}
            </form>
          </div>
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu (Dropdown) */}
        {isOpen && (
          <ul className="absolute bg-white border border-gray-300 rounded-lg shadow-lg z-10 top-12 right-0 w-48">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  className="block text-gray-700 text-center py-2 hover:text-red-500 mb-2"
                  onClick={handleMenuItemClick} // Close menu when item is clicked
                >
                  {item.name}
                </Link>
              </li>
            ))}
            {/* Search Bar for Mobile */}
            <form onSubmit={handleSearchSubmit} className="relative mx-auto w-3/4 mb-2">
              <input
                type="text"
                className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
              {filteredSuggestions.length > 0 && (
                <ul className="absolute w-full bg-white border border-gray-300 mt-1 rounded-lg shadow-lg z-10">
                  {filteredSuggestions.map((post) => (
                    <li
                      key={post.id}
                      className="p-2 cursor-pointer hover:bg-gray-100 hover:text-red-500"
                      onClick={() => handleSuggestionClick(post)} // Close menu when suggestion is clicked
                    >
                      {post.title}
                    </li>
                  ))}
                </ul>
              )}
            </form>
          </ul>
        )}
      </div>
    </nav>
  );
}
