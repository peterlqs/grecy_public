"use client";

import Searchbar from "@/components/Searchbar";
import { Card, CardContent } from "@/components/ui/card";
import { SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { LinkIcon } from "lucide-react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Woolworths } from "@/lib/db/migrations/type";

export default function ComparePage() {
  const [selectedProducts, setSelectedProducts] = useState<Woolworths[] | []>(
    []
  );

  return (
    <div className="flex flex-col min-h-screen px-8">
      <main className="flex-1">
        <div className="px-4 lg:px-6 pt-16 pb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 text-primary">
            Compare Products
          </h1>
          <p className="text-lg text-neutral-500 dark:text-neutral-400">
            Find healthier products at your local grocery store.
          </p>
        </div>
        <Searchbar
          setSelectedProducts={(product: Woolworths[]) =>
            setSelectedProducts(product)
          }
          selectedProducts={selectedProducts}
        />
        {/* Display selected product details here if selectedProducts is not null */}
        {selectedProducts.length > 0 ? (
          <div className="flex flex-col gap-4 mt-8">
            <div className="flex flex-col mt-4">
              <DataTable columns={columns} data={selectedProducts} />
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
}
