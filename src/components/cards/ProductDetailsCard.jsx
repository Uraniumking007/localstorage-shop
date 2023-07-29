import AddToCart from "../Buttons/AddToCartBtn";
import BuyNowBtn from "../Buttons/BuyNowBtn";
import Carousel from "../Carousel";
import Link from "next/link";

export default function ProductDetailsCard({ product }) {
  return (
    <div className="flex w-full justify-evenly  gap-8 px-8 mt-8">
      <div className="w-full h-fit flex my-4 justify-end">
        <div className="flex w-full justify-center">
          {product ? (
            product.images ? (
              <Carousel value={product.images} />
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="flex flex-col w-full justify-between text-left p-8">
        <div>
          <h1 className="text-2xl  ">
            {product ? product.name : "No Product"}
          </h1>
          <div>Price: {product ? product.price : "NA"}</div>
          <div>Description: {product ? product.description : "NA"}</div>
        </div>
        <div className="card-actions justify-evenly">
          {/* <Link href="/checkout">
            <button className="btn btn-primary">Buy Now</button>
          </Link> */}
          <BuyNowBtn />
          <AddToCart keyy={product.uid} />
        </div>
      </div>
    </div>
  );
}
