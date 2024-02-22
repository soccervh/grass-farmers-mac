import { Link } from "@remix-run/react";
import React from "react";

export default function ErrorPage() {
  return (
    <div className="h-screen">
      <p>
        You have come to a page we haven't made yet or you have gotten an error.
      </p>
      <div>
        <Link
          to="/"
          prefetch="intent"
          className="text-green-800 font-bold hover:text-green-900"
        >
          Go back to the home page
        </Link>
      </div>
    </div>
  );
}
