"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";
import { Coles } from "@/lib/db/migrations/type";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Coles>[] = [
  {
    accessorKey: "imageUrl",
    header: "Image",
    cell: ({ row }) => {
      const image = row.getValue("imageUrl");
      return (
        <div className="flex items-center justify-center">
          <Image
            src={image as string}
            alt="Product Image"
            width={100}
            height={100}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "productName",
    header: "Product Name",
  },
  {
    accessorKey: "ingredients",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ingredients
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const ingredients = row.getValue("ingredients");
      return <div className="lowercase">{ingredients as string}</div>;
    },
  },
  // Add allergenContains, allergyStatement, woolDietaryClaim, description, displayName
  {
    accessorKey: "allergen",
    header: "Allergens",
    cell: ({ row }) => {
      const allergens = row.getValue("allergen");
      return <div className="lowercase">{allergens as string}</div>;
    },
  },
  {
    accessorKey: "allergenStatement",
    header: "Allergy Statement",
    cell: ({ row }) => {
      const allergyStatement = row.getValue("allergenStatement");
      return <div className="lowercase">{allergyStatement as string}</div>;
    },
  },
  {
    accessorKey: "dietaryClaim",
    header: "Dietary Claim",
    cell: ({ row }) => {
      const woolDietaryClaim = row.getValue("dietaryClaim");
      return <div className="lowercase">{woolDietaryClaim as string}</div>;
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "cupString",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price (Unit)
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "price",
    header: () => <div className="text-left">Price</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "AUD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
];
