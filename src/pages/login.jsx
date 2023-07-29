import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Login = () => {
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn");
    if (isLoggedIn) {
      router.push("/");
    }
  });

  const router = useRouter();
  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const { floating_username: username, floating_password: password } =
      e.target;

    const loggedInUser = users.find(
      (user) =>
        user.username === username.value && user.password === password.value
    );

    if (!loggedInUser) {
      password.classList.add("dark:border-red-600");
      password.classList.remove("dark:border-gray-600");
      username.classList.add("dark:border-red-600");
      username.classList.remove("dark:border-gray-600");
      return;
    }

    localStorage.setItem("loggedIn", loggedInUser.uid);
    router.push("/");
  };

  return (
    <main
      data-theme="night"
      className="bg-neutral w-screen h-screen flex justify-center items-center"
    >
      <form
        className="w-1/3 flex flex-col justify-center bg-base-100 p-8 rounded-xl items-center"
        onSubmit={handleLogin}
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
        <div className="flex flex-col  w-full text-center">
          <button type="submit" className="btn btn-secondary">
            Login
          </button>
          <Link href={"/register"}>
            <button type="button" className="text-base-content mt-2">
              Not a User? Register Now!
            </button>
          </Link>
        </div>
      </form>
    </main>
  );
};

export default Login;
