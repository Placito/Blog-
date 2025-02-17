import Head from "next/head";

export default function About() {
  return (
    <>
      <Head>
        <title>About Us</title>
        <meta name="description" content="Learn more about our company and team." />
      </Head>

      <main className="h-screen flex flex-col bg-gray-100">
        <div className="flex items-center justify-center p-6 max-w-3xl mx-auto">
          <div className="max-w-3xl bg-white shadow-lg rounded-2xl p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">About Us</h1>
            <p className="text-gray-600 text-lg">
              We are a dedicated team committed to producing high-quality content and articles for our blog.
              Our mission is to create meaningful experiences for our users by leveraging technology
              and innovation.
            </p>
            <div className="mt-6">
              <h2 className="text-2xl font-semibold text-gray-700">Our Team</h2>
              <ul className="list-disc list-inside text-gray-600 mt-2">
                <li>John Doe - Founder & CEO</li>
                <li>Jane Smith - Writer</li>
                <li>Mariana Plácito - Head of Design and Development</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
