import type { MetaFunction } from "@remix-run/node";
import { Link, Outlet } from "@remix-run/react";
import { useState } from "react";
import cabbage from "./images/cabbage.jpg";
import corn from "./images/corn.jpg";
import lettuce from "./images/lettuce.png";
import tomatoes from "./images/tomatoes.png";
import grapes from "app/routes/images/grapes.png";
import strawberries from "app/routes/images/strawberries.png";
import peas from "app/routes/images/peas.png";
import pears from "app/routes/images/pears.png";
import blueberries from "app/routes/images/blueberries.png";

export const meta: MetaFunction = () => {
  return [
    { title: "Grass Farmers" },
    { name: "description", content: "Fresh Produce!" },
  ];
};

export default function Index() {
  const data = [
    {
      name: "Blueberries",
      price: 5.99,
      image: blueberries,
      alt: "Blueberries",
    },
    {
      name: "Cabbage",
      price: 2.99,
      image: cabbage,
      alt: "Cabbage",
    },
    {
      name: "Corn",
      price: 4.99,
      image: corn,
      alt: "Corn",
    },
    {
      name: "Grapes",
      price: 2.99,

      image: grapes,
      alt: "Grapes",
    },
    {
      name: "Pears",
      price: 2.99,
      image: pears,
      alt: "Pears",
    },
    {
      name: "Peas",
      price: 3.99,
      image: peas,
      alt: "Peas",
    },
    {
      name: "Strawberries",
      price: 2.99,
      image: strawberries,
      alt: "Strawberries",
    },
    {
      name: "Tomatoes",
      price: 2.99,
      image: tomatoes,
      alt: "Tomatoes",
    },
  ];
  const [count, setCount] = useState(0);
  let incrementCount = () => {
    setCount(count + 1);
  };

  let decrementCount = () => {
    setCount(count - 1);
  };

  let resetCount = () => {
    setCount(0);
  };
  return (
    <div className="bg-green-300 grid grid-cols-10">
      <div className="grid col-span-8 grid-cols-4 text-center px-4">
        {data.map((item) => (
          <div
            key={item.name}
            className="p-4"
          >
            <img
              className="w-64 h-64 object-cover rounded-lg mx-auto transition duration-300 hover:scale-110"
              src={item.image}
              alt={item.alt}
            />
            <p className="mt-2">{item.name}</p>
            <p className="mt-2">${item.price}</p>
            {count < 1 ? (
              <button
                onClick={decrementCount}
                disabled
                id="minus"
                className="text-3xl bg-red-500 transition duration-300 hover:bg-red-700 text-white font-bold px-2 pb-1 rounded"
              >
                -
              </button>
            ) : (
              <button
                onClick={decrementCount}
                id="minus"
                className="text-3xl bg-red-500 transition duration-300 hover:bg-red-700 text-white font-bold px-2 pb-1 rounded"
              >
                -
              </button>
            )}
            <span className="text-2xl">{count < 1 ? "   " : count} </span>
            <button
              onClick={incrementCount}
              id="plus"
              className="text-3xl bg-green-500 transition duration-300 hover:bg-green-700 text-white font-bold px-2 pb-1 rounded"
            >
              +
            </button>
            <div>
              <button
                onClick={resetCount}
                className="bg-blue-500 text-white
                 font-bold px-2 pt-1 mt-4 rounded border-2 border-blue-700 transition duration-300 hover:bg-blue-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div>
        <div className="text-center text-8xl font-displayTwo">
          {" "}
          Your body will be fresh!
        </div>
        <div className="flex items-center justify-center text-3xl font-displayTwo">
          <Link
            to="/signup"
            prefetch="intent"
            className="bg-green-700 hover:bg-green-800 text-center justify-center text-white font-bold py-2 px-4 mr-4 rounded"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
