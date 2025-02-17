"use client"; // This tells Next.js that this is a client-side component (important for hooks like useState)
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetchPosts } from "../services/posts"; // Import the fetchPosts function to get blog posts

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState(""); // State to store the search query input by the user
  const router = useRouter(); // Hook to access Next.js router for navigation
  const [filteredSuggestions, setFilteredSuggestions] = useState([]); // State to store filtered search results
  const [posts, setPosts] = useState([]); // State to store all the blog posts fetched from the API
  const [isOpen, setIsOpen] = useState(false); // State for toggling the mobile menu (open/close)

  // Navigation items for the menu
  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
  ];

  // useEffect hook to load posts from the API when the component is mounted
  useEffect(() => {
    const loadPosts = async () => {
      const postsData = await fetchPosts(); // Fetch posts from the API
      setPosts(postsData); // Update the state with the fetched posts
    };
    loadPosts();
  }, []); // Empty dependency array ensures this runs only once when the component is mounted

  // Handle search query change and filter posts based on the input
  const handleSearchChange = (e) => {
    const value = e.target.value; // Get the value from the input field
    setSearchQuery(value); // Update the search query state

    // Filter posts by title, userId, or postId (case-insensitive search)
    const filtered = posts.filter((post) => {
      const titleMatch = post.title.toLowerCase().includes(value.toLowerCase());
      const userIdMatch = post.userId.toString().includes(value);
      const idMatch = post.id.toString().includes(value);
      return titleMatch || userIdMatch || idMatch;
    });

    setFilteredSuggestions(filtered); // Update the state with filtered suggestions
  };

  // Handle clicking on a suggestion from the search dropdown
  const handleSuggestionClick = (post) => {
    setSearchQuery(post.title); // Set the search query to the selected post title
    setFilteredSuggestions([]); // Clear the suggestions list
    router.push(`/posts/${post.id}`); // Navigate to the selected post's page
    setIsOpen(false); // Close the mobile menu after a suggestion is clicked
    setSearchQuery(""); // Clear the search input field after selection
  };

  // Handle form submission of the search (when Enter is pressed)
  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Find the post that matches the search query
    const foundPost = posts.find(
      (post) => post.title.toLowerCase() === searchQuery.toLowerCase()
    );
    
    if (foundPost) {
      router.push(`/posts/${foundPost.id}`); // Navigate to the post page if found
    }
    
    setSearchQuery(""); // Clear the search input field after submitting
  };

  // Handle closing the mobile menu when a menu item is clicked
  const handleMenuItemClick = () => {
    setIsOpen(false); // Set the mobile menu state to closed
  };

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo - Home link */}
          <Link href="/" className="text-2xl font-bold text-gray-700 hover:text-red-500">
            Blog
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 justify-center items-center">
            {/* Rendering navigation items */}
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-gray-700 hover:text-red-500"
              >
                {item.name}
              </Link>
            ))}

            {/* Desktop Search Bar */}
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
                  {/* Render filtered suggestions */}
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
            onClick={() => setIsOpen(!isOpen)} // Toggle the mobile menu open/close
          >
            {/* Hamburger Icon for mobile menu */}
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
            {/* Render navigation items for mobile */}
            {navItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  className="block text-gray-700 text-left pl-3 py-2 hover:text-red-500 mb-1 hover:bg-gray-100 border-b border-black"
                  onClick={handleMenuItemClick} // Close menu when item is clicked
                >
                  {item.name}
                </Link>
              </li>
            ))}

            {/* Mobile Search Bar */}
            <form onSubmit={handleSearchSubmit} className="relative text-left p-1 ">
              <input
                type="text"
                className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
              {filteredSuggestions.length > 0 && (
                <ul className="absolute w-full bg-white border border-gray-300 mt-1 rounded-lg shadow-lg z-10">
                  {/* Render filtered suggestions for mobile */}
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
