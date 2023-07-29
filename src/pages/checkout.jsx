import Navbar from "@/components/Navbar";
import React from "react";

const Checkout = () => {
  return (
    <main data-theme="night" className="bg-neutral flex flex-col h-screen">
      <Navbar />
      <div className="h-full flex justify-center items-center w-full">
        <span className="text-4xl">Checkout Integration?</span>
      </div>
    </main>
  );
};

export default Checkout;
