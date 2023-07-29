import Link from "next/link";
import React from "react";
import { products } from "../../utils/arrays";
import Image from "next/image";
import AddToCart from "../Buttons/AddToCartBtn";
import { Router, useRouter } from "next/router";

const ProductCards = () => {
  return (
    <div className=" grid grid-cols-3 gap-4">
      {products.map((item, key) => {
        return (
          <div key={key}>
            <Link href={`products/${item.uid}`}>
              <ProductCard {...item} />
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default ProductCards;

function BuyNowBtn() {
  const router = useRouter();
  const handleBuyNow = (e) => {
    e.preventDefault();
    router.push("/checkout");
  };
  return (
    <button className="btn btn-primary" onClick={handleBuyNow}>
      Buy Now
    </button>
  );
}

export function ProductCard({ uid, name, description, price, images }) {
  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl">
      <figure className="mt-4">
        {images ? (
          <Image
            src={images[0]}
            priority={"false"}
            alt="Shoes"
            width={720}
            height={480}
            className="h-56"
          />
        ) : (
          ""
        )}
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{description}</p>
        <p>{price}</p>
        <div className="card-actions justify-evenly">
          <BuyNowBtn />
          <AddToCart keyy={uid} />
        </div>
      </div>
    </div>
  );
}
