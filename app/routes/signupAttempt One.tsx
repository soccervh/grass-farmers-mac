import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import React from "react";
import { db } from "~/utils/db.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data: {
    name: string;
    email: string;
    password: string;
  } = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const createdProduct = await db.user.create({ data });
  return json({ data: createdProduct });
};

export default function Signup() {
  return (
    <Form method="post">
      <label>
        Name:
        <input
          type="text"
          name="name"
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          required
        />
      </label>
      <button type="submit">Sign Up</button>
    </Form>
  );
}
