import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import stylesheet from "~/tailwind.css";
export const meta: MetaFunction = () => {
  return [
    { title: "Grass Farmers" },
    { name: "description", content: "Fresh Produce!" },
  ];
};
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="Grass Farmers"
          content="width=device-width, initial-scale=1"
        />
        <Meta />
        <Links />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&family=Urbanist:wght@100&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body>
        <Layout>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </Layout>
      </body>
    </html>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto bg-green-500 ">
      <header className="flex justify-between bg-green-500 items-center">
        <nav>
          <Link
            to="/"
            prefetch="intent"
            className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 mr-4 rounded"
          >
            Home
          </Link>

          <Link
            to="/about/"
            prefetch="intent"
            className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 mr-4 rounded"
          >
            About
          </Link>
          <Link
            to="/signup/"
            prefetch="intent"
            className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 mr-4 rounded"
          >
            Sign Up
          </Link>
          <Link
            to="/login/"
            prefetch="intent"
            className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 mr-4 rounded"
          >
            Login
          </Link>
          <Link
            to="/admin/"
            prefetch="intent"
            className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 mr-4 rounded"
          >
            Admin
          </Link>
        </nav>
        <h1 className="text-3xl font-bold mx-2">Grass Farmers</h1>
      </header>
      <div className="bg-green-400">Search Bar</div>
      <main>{children}</main>
    </div>
  );
}
