# Blog Application with Next.js and Tailwind CSS

Objective

This project is a responsive blog application built with Next.js and Tailwind CSS. It fetches and displays blog posts from an API, utilizes dynamic routing, and ensures a seamless user experience across different devices.

Features

1. Homepage (/)

    * Fetches a list of blog posts from the JSONPlaceholder API using getStaticProps.

    * Displays posts in a responsive grid layout using Tailwind CSS.

    * Each blog post card includes:

        - Title (clickable link to post details page).

        - First 100 characters of the body.

        - "Read More" link leading to the full post page.

2. Post Details Page (/post/[id])

    * Implements a dynamic route (/post/[id]).

    * Uses getStaticPaths and getStaticProps to pre-generate pages for each post.

    * Displays the full post details:

        - Title

        - Full body

        - Post ID and Author (userId field)

3. Search Functionality (Optional Hashtag Search)

    * Allows users to filter posts by clicking on hashtags.

    * Provides precise results without needing a title-based search.

4. Responsive Design

    * Optimized for desktop, tablet, and mobile using Tailwind CSS.

5. Navigation Bar

    * Includes links to:

        - Home (/)

        - About (/about) (Placeholder page)

        - Highlights the active route using Tailwind's active class.


## Installation & Setup

Prerequisites:

    * Ensure you have Node.js and npm installed.

Steps to Set Up the Project:

Clone the repository:
```bash
git clone https://github.com/your-username/blog-app.git
cd blog-app
```

Install dependencies:
```bash
npm install
````

Run the development server:
```bash
npm run dev
```

Open in browser:
Visit http://localhost:3000

## Approach & Advanced Features

* Next.js Static Site Generation (SSG):

    - Used getStaticProps for fetching posts at build time.

    - Used getStaticPaths for pre-rendering post pages.

* Tailwind CSS:

    - Designed a clean and responsive layout.

    - Utilized utility classes for rapid styling.

* Reusability & Maintainability:

    - Separated components for Navbar, Footer, and Post Cards.

* Deployed to Vercel:

    - Live preview available at []