"use client";

import { LandingFaqCollapsibleSection } from "../../components/landing/LandingFaqCollapsible";
import React from "react";

export default function Component() {
  return (
    <LandingFaqCollapsibleSection
      title="FAQ"
      description="Get answers to your questions about using GroceryOut."
      className="bg-green-700 text-white rounded-xl mt-12"
      faqItems={[
        {
          question: "How does GroceryOut work?",
          answer:
            "GroceryOut extracts ingredients from any recipe and converts them into a local grocery list, making your shopping experience seamless and efficient.",
        },
        {
          question: "Is GroceryOut suitable for beginners?",
          answer:
            "Absolutely! Whether you’re new to cooking or an experienced chef, GroceryOut offers tools and suggestions that make it easy to create your grocery list.",
        },
        {
          question: "Can I use GroceryOut for large grocery lists?",
          answer:
            "Yes, GroceryOut can handle grocery lists of any size. Just input your recipes, and we’ll help you organize and optimize your shopping.",
        },
        {
          question: "What types of recipes does GroceryOut support?",
          answer:
            "GroceryOut supports a wide range of recipes, from simple meals to complex dishes. Our system ensures that all ingredients are accurately extracted and listed.",
        },
      ]}
      withBackground
    />
  );
}
