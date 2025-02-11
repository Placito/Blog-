import React from "react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <main className="flex flex-col items-center justify-center flex-grow">
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
          Explore the latest blog posts fetched from an API:
        </p>
      </main>
    </div>
  );
}
