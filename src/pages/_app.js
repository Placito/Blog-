import React from "react"; // Import React library for JSX support
import "./styles/globals.css"; // Import global styles for the application
import './styles/footer.css';
import Navbar from "../components/Navbar"; // Import the Navbar component for site navigation
import Footer from "../components/Footer"; // Import the Footer component for the footer content
import Head from "next/head"; // Import Head from Next.js to manage the head of the page (meta tags, title, etc.)

// Main app component that wraps around every page in the app
export default function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* Next.js Head component to manage meta tags for the page */}
      <Head>
        <title>My Awesome Blog</title> {/* Title of the web page */}
        <meta name="description" content="A blog about awesome things!" /> {/* Description for the page */}
        <link rel="icon" href="/favicon.ico" /> {/* Link to favicon (the small icon displayed in the browser tab) */}
      </Head>

      {/* Navbar - Navigation menu that appears at the top of the page */}
      <Navbar />

      {/* Main component that renders the specific page's content */}
      <Component {...pageProps} />

      {/* Footer - Content that appears at the bottom of the page */}
      <Footer />
    </>
  );
}
