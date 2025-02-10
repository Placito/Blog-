import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Posts from "../components/Posts";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center flex-grow p-8 sm:p-20">
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
          Explore the latest blog posts fetched from an API:
          {/* Blog Posts Section */}
          <div className="mt-10 w-full">
            <Posts />
          </div>
        </p>
        
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
