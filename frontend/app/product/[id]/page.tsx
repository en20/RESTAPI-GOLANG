"use client";
import { useEffect, useState } from "react";
import { use } from "react";
import { Product } from "../../types";
import FileUpload from "../../components/FileUpload";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export default function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null>(null);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`${API_URL}/product/${id}`);
      const data = await res.json();
      setProduct(data);
    } catch (err) {
      console.error("Error fetching product:", err);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">{product.product_name}</h1>
        <p className="text-xl text-gray-600 mb-4">Price: ${product.price}</p>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Arquivos do Produto</h2>
          <FileUpload productId={id} onUploadSuccess={fetchProduct} />

          {product.files && product.files.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-2">Arquivos Anexados:</h3>
              <ul className="list-none pl-0">
                {product.files.map((file, index) => (
                  <li
                    key={index}
                    className="mb-3 flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <a
                      href={file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex items-center"
                    >
                      <span className="truncate">{file.split("/").pop()}</span>
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                    <a
                      href={`${API_URL}/download?key=${encodeURIComponent(
                        file.split(".com/")[1]
                      )}/file`}
                      className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center"
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      Download
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
