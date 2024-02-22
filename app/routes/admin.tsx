import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import React from "react";
import { db } from "~/utils/db.server";

export async function action({ request }: { request: any }) {
  let formData = await request.formData();
  let data = await db.product.create({
    data: {
      name: formData.get("name") as string,
      price: formData.get("price") as string,
      imageUrl: formData.get("imageUrl") as string,
    },
  });

  return json({ data });
}
export const loader = async ({ params }: LoaderFunctionArgs) => {
  const products = await db.product.findMany();

  return json({ products });
};
export default function Admin() {
  const data = useLoaderData();
  return (
    <div>
      <Form
        method="post"
        className="h-screen"
      >
        <label>
          Name:
          <input
            type="text"
            name="name"
            required
          />
        </label>
        <label>
          Price:
          <input
            type="text"
            name="price"
            required
          />
        </label>
        <label>
          Image URL:
          <input
            type="url"
            name="imageUrl"
            required
          />
        </label>
        <button type="submit">Create Product</button>
      </Form>
      <div>
        <div>Products</div>
        <div>
          {(data as any).products.map((product: any) => {
            //
            return (
              <div
                key={product.id}
                className="grid grid-cols-6 gap-2 bg-gray-200 p-2 m-2 rounded transition duration-300 hover:bg-gray-300"
              >
                <button>Edit</button>
                <div>
                  <img
                    className="max-w-40"
                    src={product.imageUrl}
                  />
                </div>
                <div>
                  <div>{product.name}</div>
                  <div>{product.price}</div>
                </div>
                <div className="col-span-2"> Explanation</div>
                <button>Delete</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
