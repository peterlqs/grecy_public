"use client";

import { LandingSaleCtaSection } from "../../components/landing/cta/LandingSaleCta";
import { LandingSocialProof } from "../../components/landing/social-proof/LandingSocialProof";
import React from "react";

const avatarItems = [
  {
    imageSrc: "https://picsum.photos/id/64/100/100",
    name: "John Doe",
  },
  {
    imageSrc: "https://picsum.photos/id/65/100/100",
    name: "Jane Doe",
  },
  {
    imageSrc: "https://picsum.photos/id/669/100/100",
    name: "Alice Doe",
  },
];

export default function Component() {
  return (
    <LandingSaleCtaSection
      title="Simplify Your Grocery Shopping"
      descriptionComponent={
        <>
          <p className="max-w-lg mx-auto text-center">
            Discover how GroceryOut can streamline your grocery shopping by
            turning any recipe into a local grocery list. Save time and effort
            with our easy-to-use platform.
          </p>
        </>
      }
      ctaHref="#"
      ctaLabel="Try GroceryOut now"
    />
  );
}
