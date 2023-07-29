import Navbar from "@/components/Navbar";
import CartCard from "@/components/cards/CartCard";
import Link from "next/link";
import React from "react";
import CouponCode from "@/components/cards/CouponCode";
import { useAtom } from "jotai";
import { itemsPurchased, totalPrice, user } from "@/utils/atoms";
import CheckOutBtn from "@/components/Buttons/CheckOutBtn";

const Cart = () => {
  const [userValue, setUserValue] = useAtom(user);
  const [subTotalValue, setSubTotalValue] = useAtom(totalPrice);
  const [totalItemsValue, setTotalItemsValue] = useAtom(itemsPurchased);
  return (
    <main data-theme="night" className="bg-neutral flex flex-col h-screen">
      <Navbar />
      <div className="bg-neutral flex flex-col items-center w-full h-full">
        {userValue ? (
          <div className="w-full h-full flex flex-col items-center">
            {subTotalValue == 0 && totalItemsValue == 0 ? (
              <div className="flex h-screen justify-center items-center">
                <Link href={"/"}>
                  <h1 className="btn btn-secondary">Go Shopping Now</h1>
                </Link>
              </div>
            ) : (
              <>
                <h1 className="text-2xl my-4"> Shopping Cart</h1>
                <CartCard />
                <div className="flex items-end shadow-md shadow-slate-900 drop-shadow-lg flex-col w-full pr-10 pb-10">
                  <div className="bg-base-300 text-warning font-semibold p-4 rounded-xl">
                    <CouponCode />
                    {subTotalValue == 0 ? "" : `Total Price: ${subTotalValue}`}
                    <br />
                    {totalItemsValue == 0
                      ? ""
                      : ` Total Items: ${totalItemsValue}`}
                    <div className="w-full mt-2">
                      <CheckOutBtn />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="flex h-full w-full justify-center items-center text-4xl ">
            Please Login To view Cart
          </div>
        )}
      </div>
    </main>
  );
};

export default Cart;
