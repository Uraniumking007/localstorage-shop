import { checkOutProcess } from "@/utils/atoms";
import { useAtom } from "jotai";
import Link from "next/link";
import React from "react";

const CheckOutBtn = () => {
  const [checkOutValue, setCheckOutValue] = useAtom(checkOutProcess);
  const handleClick = () => {
    setCheckOutValue("started");
  };
  return (
    <Link href={"/checkout"}>
      <div
        className="btn btn-warning w-full font-bold capitalize"
        onClick={handleClick}
      >
        Check out
      </div>
    </Link>
  );
};

export default CheckOutBtn;
