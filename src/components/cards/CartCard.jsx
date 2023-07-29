import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useAtom } from "jotai";
import { shoppingCart, user, users } from "@/utils/atoms";
import Link from "next/link";

export const CartCard = ({ item, keyy }) => {
  const [userValue, setUserValue] = useAtom(user);
  const [usersValue, setUsersValue] = useAtom(users);
  const [shoppingCartValue, setShoppingCartValue] = useAtom(shoppingCart);
  const router = useRouter();

  const handlePurge = useCallback(() => {
    if (shoppingCartValue[keyy].quantity != 0) {
      return;
    }
    shoppingCartValue.splice(keyy, 1);
    localStorage.setItem("users", JSON.stringify(usersValue));
  }, [keyy, shoppingCartValue, usersValue]);
  useEffect(() => {
    if (userValue) {
      handlePurge();
    }
  }, [handlePurge, userValue]);

  const handleDelete = (e) => {
    e.preventDefault();
    if (!confirm("Are you sure about removing this product from Cart")) {
      return;
    }
    if (!userValue) {
      return;
    }
    shoppingCartValue.splice(keyy, 1);
    localStorage.setItem("users", JSON.stringify(usersValue));
    router.reload();
  };

  const handleQuantity = (e) => {
    if (!userValue) {
      return;
    }
    if (e.target.value == "") {
      shoppingCartValue[keyy].quantity = 0;
    }
    shoppingCartValue[keyy].quantity = e.target.value;
    setShoppingCartValue(shoppingCartValue);
    localStorage.setItem("users", JSON.stringify(usersValue));
    handlePurge(userValue);
    router.reload();
  };
  const addQuantity = (e) => {
    e.preventDefault();
    shoppingCartValue[keyy].quantity++;
    localStorage.setItem("users", JSON.stringify(usersValue));
    router.reload();
  };
  const deductQuantity = (e) => {
    e.preventDefault();
    shoppingCartValue[keyy].quantity--;
    localStorage.setItem("users", JSON.stringify(usersValue));
    handlePurge(userValue);
    router.reload();
  };

  return (
    <div className="bg-base-100 flex justify-between items-center m-4 rounded-lg">
      <div className="flex justify-center items-center">
        <div>
          {item.images ? (
            <Image
              src={item.images[0]}
              width={148}
              height={148}
              className="rounded-lg m-2"
              alt=""
            />
          ) : (
            ""
          )}
        </div>
        <div>
          <h6 className=" pl-4 pt-4 text-xl">{item.name}</h6>
          <p className="pl-4 pb-4 pt-2">{item.price}</p>
        </div>
      </div>
      <div className="pr-4 flex gap-7 items-center">
        <div
          className="btn btn-circle btn-secondary text-secondary-content font-extrabold btn-sm"
          onClick={deductQuantity}
        >
          -
        </div>
        <div className="grid md:grid-cols-1 w-fit md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              pattern="numeric"
              name="floating_quantity"
              id="floating_quantity"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder={item.quantity}
              defaultValue={item.quantity}
              onClick={(e) => {
                e.preventDefault();
              }}
              onChange={handleQuantity}
              required
            />
            <label
              htmlFor="floating_quantity"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Quantity ( i.e: 1 )
            </label>
          </div>
        </div>
        <div
          className="btn btn-circle btn-secondary text-secondary-content font-extrabold btn-sm"
          onClick={addQuantity}
        >
          +
        </div>
        <div
          className=" btn btn-circle btn-secondary p-1"
          onClick={handleDelete}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

const CartCards = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const userId = localStorage.getItem("loggedIn") || null;
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const mainUser = users.find((user) => user.uid == userId);
    setUser(mainUser);
  }, []);

  return (
    <div className="w-full h-full">
      {user ? (
        user.shoppingCart.map((item, key) => {
          return (
            <Link href={`products/${item.uid}`} key={key}>
              <CartCard item={item} keyy={key} />
            </Link>
          );
        })
      ) : (
        //   <CartCard  />
        <div className="flex h-full w-full justify-center items-center text-4xl ">
          Please Login To view Cart
        </div>
      )}
    </div>
  );
};

export default CartCards;
