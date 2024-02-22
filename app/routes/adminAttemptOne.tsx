import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import React from "react";
import { db } from "~/utils/db.server";
import cabbage from "./images/cabbage.jpg";
import { PrismaClient } from "@prisma/client";
export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = await db.product.create({
    data: {
      name: formData.get("name") as string,
      price: formData.get("price") as string,
      imageUrl: formData.get("imageUrl") as string,
    },
  }); // Create a new comment
  return json({ data });
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const products = await db.product.findMany();

  return json({ products });
};

const prisma = new PrismaClient();

export async function actionDelete({
  params,
}: {
  params: { productId: string };
}) {
  const { productId } = params;
  console.log("Working on deleteing product", productId);
  // Delete the product from your database
  const result = await prisma.product.delete({
    where: {
      id: productId.toString(),
    },
  });
  console.log("Deleted product", result);
  return redirect("/products");
}

async function UpdateProduct(id: string): Promise<void> {
  const updatedProduct = await prisma.product.update({
    where: {
      id: id,
    },
    data: {
      name: "New Product Name", // replace with the new name
      price: "99.99", // replace with the new price as a string
      imageUrl: "http://new-image-url.com", // replace with the new image URL
    },
  });

  console.log(updatedProduct);
}

export default function Admin() {
  const data = useLoaderData();
  return (
    <div className="bg-green-500">
      <h1>Admin</h1>
      <p>This is the admin page</p>
      <Form
        method="post"
        action="/admin"
      >
        <div className="flex">
          <div className=" pb-2">
            <label
              htmlFor="name"
              className="text-right mr-2"
            >
              Name:
            </label>
            <input
              type="text"
              name="name"
              id="name"
            />
          </div>
          <div className=" pb-2">
            <label
              htmlFor="price"
              className="text-right mr-2"
            >
              Price:
            </label>
            <input
              type="text"
              name="price"
              id="price"
            />
          </div>
          <div className=" pb-2">
            <label
              htmlFor="imageUrl"
              className="text-right mr-2"
            >
              ImageURL:
            </label>
            <input
              type="text"
              name="imageUrl"
              id="imageUrl"
            />
            <button
              type="submit"
              className="border-2 border-green-700 bg-green-700 text-white font-bold   rounded transition duration-300 hover:bg-green-900 "
            >
              Create Product
            </button>
          </div>
        </div>
      </Form>
      <div className="bg-gray-300">
        <h2>Products</h2>
        <ul>
          {((data as any).products as any[]).map((product: any) => (
            <div
              key={product.id}
              className="grid grid-cols-4 gap-2 bg-gray-200 p-2 m-2 rounded transition duration-300 hover:bg-gray-300"
            >
              <div></div>
              <div className=" text-right w-40">
                <img src={`${product.imageUrl}`} />
              </div>

              <div>
                <div>Name:{product.name} </div>{" "}
                <div> Price - ${product.price}</div>
              </div>
              <div className="">This is the explanation area</div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
