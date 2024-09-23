import FAQ from "../landing/FAQ";
import CTA from "../landing/CTA";
import Features from "../landing/Features";
import Hero from "../landing/Hero";
import Pricing from "../landing/Pricing";

export default function Component() {
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

  return (
    <div className="max-w-7xl mx-auto px-4">
      <Hero />
      <Features />
      {/* <Pricing /> */}
      <FAQ />
      <CTA />
    </div>
  );
}
