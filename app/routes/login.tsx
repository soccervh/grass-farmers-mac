import { Form, useActionData } from "@remix-run/react";
import React from "react";
import { TextField } from "./components/textfield";
import { LoaderFunction, MetaFunction, json } from "@remix-run/node";
import { Link } from "react-router-dom";
export const meta: MetaFunction = () => {
  return [
    {
      title: "Login - Grass Farmers!",
      description: "Login to Grass Farmers!",
    },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  return { fields: { email: "", password: "" } };
};

export const action = async ({ request }: { request: Request }) => {
  const formData = new URLSearchParams(await request.text());
  const email = formData.get("email");
  const password = formData.get("password");
  return json({ email, password });
};

export default function Login() {
  const actionData = useActionData() as {
    fields?: { email?: string; password?: string };
  };
  const [FormData, setFormData] = React.useState({
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
    <div className="h-screen  bg-green-500 justify-center items-center flex flex-col gap-y-5">
      <Form
        method="post"
        className="rounded-lg bg-green-300 p-5 m-5 flex flex-col gap-y-5"
      >
        <h1 className="text-3xl font-bold mx-2">Login</h1>
        <TextField
          htmlFor={"email"}
          label={"email"}
          value={FormData.email}
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
          className="bg-green-500 text-white p-2 rounded-lg"
        >
          Submit
        </button>

        <p>
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="
          text-red-500 hover:text-red-700
          "
          >
            Signup
          </Link>
        </p>
      </Form>
    </div>
  );
}
