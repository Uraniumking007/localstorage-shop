import { products } from "@/utils/arrays";
import { useState, useEffect, useCallback } from "react";
import React from "react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { checkCart, shoppingCart, user, users } from "@/utils/atoms";

const AddToCart = ({ keyy }) => {
  const [userValue, setUserValue] = useAtom(user);
  const [usersValue, setUsersValue] = useAtom(users);
  const [checkCartValue, setCheckCartValue] = useState(false);
  const [shoppingCartValue, setShoppingCartValue] = useAtom(shoppingCart);
  const router = useRouter();

  const handleCheckCart = useCallback(
    (arr) => {
      if (arr) {
        arr.forEach((item) => {
          if (item.uid == keyy) {
            setCheckCartValue(true);
          }
        });
      }
    },
    [keyy]
  );

  useEffect(() => {
    if (user && shoppingCartValue) {
      handleCheckCart(shoppingCartValue);
    }
  }, [shoppingCartValue, handleCheckCart]);

  const handleClick = (e) => {
    e.preventDefault();
    if (userValue) {
      const product = products.find((product) => product.uid == keyy);
      if (product && !checkCartValue) {
        product.quantity = 1;
        shoppingCartValue.push(product);
        setShoppingCartValue([...shoppingCartValue]);
        localStorage.setItem("users", JSON.stringify(usersValue));
        router.reload();
        return;
      }
      router.push("/cart");
      return;
    }
    router.push("/login");
  };

  return (
    <button className="btn btn-primary" onClick={handleClick}>
      {checkCartValue ? "Go to Cart" : "Add to Cart"}
    </button>
  );
};

export default AddToCart;
