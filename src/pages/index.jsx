import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import ProductCards from "@/components/cards/ProductCards";

export default function Home() {
  return (
    <main data-theme="night" className="bg-neutral h-screen min-h-full pb-8">
      <Navbar />
      <section className="flex gap-4 mt-4 w-full justify-center">
        <ProductCards />
      </section>
    </main>
  );
}
