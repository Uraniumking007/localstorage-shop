import Image from "next/image";
import React, { useCallback, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import ThumbnailCart from "./cards/ThumbnailCart";
import { useAtom } from "jotai";
import {
  itemsPurchased,
  shoppingCart,
  totalPrice,
  user,
  users,
  validPromoCode,
} from "@/utils/atoms";
import CheckOutBtn from "./Buttons/CheckOutBtn";

const Navbar = () => {
  const [userValue, setUserValue] = useAtom(user);
  const [usersValue, setUsersValue] = useAtom(users);
  const [subTotalValue, setSubTotalValue] = useAtom(totalPrice);
  const [totalItemsValue, setTotalItemsValue] = useAtom(itemsPurchased);
  const [shoppingCartValue, setShoppingCartValue] = useAtom(shoppingCart);
  const [validPromoCodeValue, setPromoCode] = useAtom(validPromoCode);

  const router = useRouter();

  const handleCalc = useCallback(
    (value) => {
      let total = 0;
      let numberItems = 0;
      const arr = Object.values(value);
      arr.forEach((item) => {
        total += Number(item.price) * Number(item.quantity);
        numberItems += Number(item.quantity);
      });

      if (validPromoCodeValue) {
        const cost = total;
        const discount = (cost * 20) / 100;
        const newTotal = cost - discount;
        setSubTotalValue(newTotal.toFixed(2));
      } else {
        setSubTotalValue(total.toFixed(2));
      }

      setTotalItemsValue(numberItems);
    },
    [setSubTotalValue, setTotalItemsValue, validPromoCodeValue]
  );

  useEffect(() => {
    const userId = localStorage.getItem("loggedIn") || null;
    const mainUsers = JSON.parse(localStorage.getItem("users")) || [];
    const mainUser = mainUsers.find((user) => user.uid == userId);
    setUserValue(mainUser);
    setUsersValue(mainUsers);
    if (mainUser) {
      setShoppingCartValue(mainUser.shoppingCart);
      handleCalc(mainUser.shoppingCart);
    }
  }, [setUserValue, setUsersValue, setShoppingCartValue, handleCalc]);

  useEffect(() => {
    if (shoppingCartValue) {
      handleCalc(shoppingCartValue);
    }
  }, [shoppingCartValue, handleCalc]);

  const handleLogOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("loggedIn");
    router.reload();
  };

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link href={"/"} className="btn btn-ghost normal-case text-xl">
            E - Commerce
          </Link>
        </div>
        <div className="flex-none">
          <div className="dropdown  dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>

                <span className="badge badge-sm indicator-item">
                  {totalItemsValue == 0 ? 0 : totalItemsValue}
                </span>
              </div>
            </label>
            <div
              tabIndex={0}
              className="mt-3 card card-compact shadow-black/30  dropdown-content w-52 bg-base-100 shadow-lg"
            >
              <div className="card-body w-fit">
                <span className="font-bold text-lg">
                  Total Products: {totalItemsValue == 0 ? 0 : totalItemsValue}
                </span>
                {userValue ? (
                  totalItemsValue == 0 ? (
                    <div className="text-base-content">Cart is empty</div>
                  ) : (
                    userValue.shoppingCart.map((item, key) => {
                      return (
                        <div key={key}>
                          <ThumbnailCart item={item} keyy={key} />
                        </div>
                      );
                    })
                  )
                ) : (
                  <div className="btn btn-secondary btn-sm">Login</div>
                )}

                <span className="text-info">Subtotal: ${subTotalValue}</span>
                <div className="card-actions">
                  <Link href="/cart">
                    <button className="btn btn-primary font-bold capitalize w-full">
                      View cart
                    </button>
                  </Link>
                  {/* <CheckOutBtn /> */}
                </div>
              </div>
            </div>
          </div>
          {userValue ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <Image
                    src={userValue ? userValue.imgURL : "/next.svg"}
                    width={48}
                    height={48}
                    alt=""
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content shadow-black/30 mt-3 p-2 shadow-lg bg-base-100 rounded-box w-52"
              >
                {/* <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li> */}
                <li onClick={handleLogOut}>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          ) : (
            <Link href={"/login"}>
              <div className="btn btn-secondary">Login</div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
