import React, { useEffect, useState } from "react";
import Link from "next/link";
import InputFile from "@/components/form/InputFile";
import { useRouter } from "next/router";

const Register = () => {
  const router = useRouter();
  const handleForm = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    try {
      validation(e);

      const image = localStorage.getItem("imageurl");

      const userDetails = {
        uid: crypto.randomUUID(),
        username: e.target.floating_username.value,
        password: e.target.floating_password.value,
        email: e.target.floating_email.value,
        phone: e.target.floating_phone.value,
        gender: e.target.gender.value,
        imgURL: image,
        shoppingCart: [],
      };

      localStorage.removeItem("imageurl");
      e.target.floating_username.value = "";
      e.target.floating_password.value = "";
      e.target.floating_repeat_password.value = "";
      e.target.floating_email.value = "";
      e.target.floating_phone.value = "";
      e.target.gender.selected = false;

      // const $file = e.target.file_input;
      // $file.addEventListener("change", (event) => {
      // });

      users.push(userDetails);

      localStorage.setItem("users", JSON.stringify(users));
      const user = localStorage.setItem("loggedIn", userDetails.uid);
      router.push("/");
    } catch (error) {
      alert(error);
    }
  };

  const validation = (v) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const username = users.find(
      (user) => user.username == v.target.floating_username.value
    );

    if (username) {
      v.target.floating_username.classList.add("dark:border-red-600");
      v.target.floating_username.classList.remove("dark:border-gray-600");

      throw new Error("Username Already Exists");
    }

    users.forEach((ele) => {
      if (v.target.floating_email.value != ele.email) {
        return;
      }
      throw new Error("This email is Already Used by Other User");
    });
    if (
      v.target.floating_password.value !=
      v.target.floating_repeat_password.value
    ) {
      throw new Error("Enter Same Password");
    }
    if (v.target.gender.value == "") {
      throw new Error("Select a Gender");
    }
  };

  return (
    <main className="bg-neutral w-screen h-screen flex justify-center items-center">
      <form
        className="w-1/3 flex flex-col justify-center bg-base-100 p-8 rounded-xl items-center"
        onSubmit={handleForm}
      >
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="floating_username"
            id="floating_username"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_username"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Username
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="email"
            name="floating_email"
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="password"
            name="floating_password"
            id="floating_password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="password"
            name="repeat_password"
            id="floating_repeat_password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_repeat_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Confirm password
          </label>
        </div>
        <div className="grid md:grid-cols-2 w-full md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="tel"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              name="floating_phone"
              id="floating_phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone number (123-456-7890)
            </label>
          </div>
          <div className="flex z-0 w-full justify-center items-center mt-3 mb-6 group">
            <div className="flex gap-3 items-center mb-4">
              <label htmlFor="">Gender:</label>
              <div className=" flex items-center ">
                <input
                  id="male"
                  type="radio"
                  name="gender"
                  value="Male"
                  className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="male"
                  className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Male
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="female"
                  type="radio"
                  name="gender"
                  value="Female"
                  className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="female"
                  className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Female
                </label>
              </div>
            </div>
          </div>
        </div>
        <InputFile />

        <div className="flex  flex-col text-center w-full ">
          <button type="submit" className="btn btn-secondary">
            Register
          </button>
          <Link href={"/login"}>
            <button type="button" className="text-base-content mt-2">
              Already a User? Login
            </button>
          </Link>
        </div>
      </form>
    </main>
  );
};

export default Register;
