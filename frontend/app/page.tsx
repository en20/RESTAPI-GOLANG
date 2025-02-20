"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Product } from "./types";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <Link
            href={`/product/${product.id_product}`}
            key={product.id_product}
          >
            <div className="border p-4 rounded hover:shadow-lg transition">
              <h2 className="text-xl font-semibold">{product.product_name}</h2>
              <p className="text-gray-600">Price: ${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
