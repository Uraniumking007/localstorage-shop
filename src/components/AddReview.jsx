import React from "react";
import InputFile from "./form/InputFile";

const AddReview = () => {
  return (
    <div className="flex mt-4 flex-col gap-4 w-full ">
      <div className="review-container bg-base-100 w-full flex-col rounded-lg py-2 flex gap-3">
        <div className="flex text-start gap-6 mt-2">
          <div className="relative z-0 w-1/4 mb-4 ml-4 group">
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
          <div className="relative z-0 w-full mb-2 group">
            <input
              type="text"
              name="floating_comment"
              id="floating_comment"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_comment"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Comment
            </label>
          </div>
          <div className="btn btn-square min-w-fit px-2 mx-4">
            Submit Review
          </div>
        </div>
        <div className="w-3/4 mx-4">
          <InputFile />
        </div>
      </div>
    </div>
  );
};

export default AddReview;
