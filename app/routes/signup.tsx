import React, { useState } from "react";
import { Form, useActionData, Link } from "@remix-run/react";
import { TextField } from "./components/textfield";
import { LoaderFunction, MetaFunction, json } from "@remix-run/node";
export const meta: MetaFunction = () => {
  return [
    {
      title: "Signup - Grass Farmers!",
      description: "Signup to Grass Farmers!",
    },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  return { fields: { name: "", email: "", password: "" } };
};

export const action = async ({ request }: { request: Request }) => {
  const formData = new URLSearchParams(await request.text());
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  return json({ name, email, password });
};
export default function Signup() {
  const actionData = useActionData() as {
    fields?: { name?: string; email?: string; password?: string };
  };
  const [FormData, setFormData] = useState({
    name: actionData?.fields?.name || "",
    email: actionData?.fields?.email || "",
    password: actionData?.fields?.password || "",
  });

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement>,
    key: string,
  ) {
    setFormData((prev) => ({ ...prev, [key]: e.target.value }));
  }
  return (
    <div className="h-screen">
      <div className="h-full justify-center items-center flex flex-col gap-y-5">
        <Form
          method="post"
          className="rounded-lg bg-green-300 p-6 w-96"
        >
          <h1 className="text-3xl font-bold mx-2 pb-3">Create an account</h1>
          <TextField
            htmlFor={"name"}
            label={"name"}
            value={FormData.name}
            placeholder={"John Doe"}
            onChange={(e) => handleInputChange(e, "name")}
          />
          <TextField
            htmlFor={"email"}
            label={"email"}
            value={FormData.email}
            placeholder={"your email..."}
            onChange={(e) => handleInputChange(e, "email")}
          />
          <TextField
            htmlFor={"password"}
            label={"password"}
            type={"password"}
            value={FormData.password}
            onChange={(e) => handleInputChange(e, "password")}
          />
          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded w-full mt-3 hover:bg-green-600 transition duration-300"
          >
            Create your account
          </button>
          <div>
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-500 hover:text-blue-700 "
            >
              Login
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}
