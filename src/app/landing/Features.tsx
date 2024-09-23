"use client";

import {
  LandingProductTourSection,
  LandingProductTourList,
  LandingProductTourTrigger,
  LandingProductTourContent,
} from "../../components/landing/LandingProductTour";
import { VideoPlayer } from "../../components/shared/VideoPlayer";
import React from "react";
import Image from "next/image";

export default function Component() {
  return (
    <div className="px-4">
      <LandingProductTourSection
        titleComponent={
          <h2 className="text-5xl font-semibold leading-tight">
            Created in seconds.
          </h2>
        }
        descriptionComponent={
          <div className="flex flex-col max-w-xl">
            {/* <p className="mt-4 md:text-xl">
              GroceryOut is an intuitive grocery list builder that makes your
              grocery list look beautiful.
            </p> */}

            <p className="mt-4 md:text-xl opacity-50">
              It automatically sorts your groceries by unit price and calculates
              the total cost for you.
            </p>
          </div>
        }
        defaultValue="feature-1"
      >
        <LandingProductTourList>
          <LandingProductTourTrigger value="feature-1">
            <p className="text-xl font-bold">
              Extract ingredients from any recipe
            </p>
            <p>
              GroceryOut can extract ingredients from any recipe and convert
              them into a local grocery list.
            </p>
          </LandingProductTourTrigger>

          <LandingProductTourTrigger value="feature-2">
            <p className="text-xl font-bold">Filter out harmful ingredients</p>
            <p>
              GroceryOut can filter out harmful ingredients and only include
              healthy ones.
            </p>
          </LandingProductTourTrigger>

          <LandingProductTourTrigger value="feature-3">
            <p className="text-xl font-bold">
              Compare products ingredients across stores
            </p>
            <p>Currently support Coles and Woolworths</p>
          </LandingProductTourTrigger>
        </LandingProductTourList>
        <LandingProductTourContent value="feature-1">
          <Image
            className="rounded-md border"
            src="/feature-1.png"
            alt="Extract ingredients from any recipe"
            width={1000}
            height={1000}
          />
        </LandingProductTourContent>
        <LandingProductTourContent value="feature-2">
          <Image
            className="rounded-md border"
            src="/feature-2.png"
            alt="Filter out harmful ingredients"
            width={1000}
            height={1000}
          />
        </LandingProductTourContent>

        <LandingProductTourContent value="feature-3">
          <Image
            className="rounded-md border"
            src="/feature-3.png"
            alt="Compare products in real time"
            width={1000}
            height={1000}
          />
        </LandingProductTourContent>
      </LandingProductTourSection>
    </div>
  );
}
