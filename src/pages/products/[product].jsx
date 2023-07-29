import Navbar from "@/components/Navbar";
import ReviewCards from "@/components/cards/ReviewCards";
import { products } from "@/utils/arrays";
import ProductDetailsCard from "@/components/cards/ProductDetailsCard";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AddReview from "@/components/AddReview";
import { useAtom } from "jotai";
import { shoppingCart } from "@/utils/atoms";
import { useCallback } from "react";

const Index = () => {
  const router = useRouter();

  const [product, setProduct] = useState();
  const [shoppingCartValue, setShoppingCartValue] = useAtom(shoppingCart);
  const [checkCartValue, setCheckCartValue] = useState(false);

  const handleCheckCart = useCallback(
    (arr) => {
      if (arr) {
        arr.forEach((item) => {
          if (item.uid == router.query.product) {
            setCheckCartValue(true);
          }
        });
      }
    },
    [router.query.product]
  );

  useEffect(() => {
    const productId = router.query.product;
    const newProduct = products.find((product) => product.uid == productId);
    handleCheckCart(shoppingCartValue);
    setProduct(newProduct);
  }, [router.query.product, shoppingCartValue, handleCheckCart]);

  return (
    <main className="bg-neutral h-full" data-theme="night">
      <Navbar />

      <div className=" justify-center w-full  text-center mt-0 py-6 h-full overflow-visible">
        <div className="bg-base-300 mx-8 rounded-lg ">
          {product ? <ProductDetailsCard product={product} /> : ""}
        </div>
        <div className="flex bg-base-300 flex-col items-start rounded-lg p-4 mx-8 mt-8">
          <h1 className="">Reviews</h1>
          <div className="flex mt-4 flex-col w-full">
            {product ? <ReviewCards {...product} /> : "no product"}
            {checkCartValue ? <AddReview /> : ""}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Index;
