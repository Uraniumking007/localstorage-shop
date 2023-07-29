import React from "react";

const InputFile = () => {
  const handleImage = (e) => {
    //image processing
    const selectedfile = e.target.files;
    if (selectedfile.length <= 0) {
      return;
    }
    const [imageFile] = selectedfile;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      localStorage.setItem("imageurl", fileReader.result);
    };
    fileReader.readAsDataURL(imageFile);
  };
  return (
    <div className="flex gap-3 w-full items-center mb-4">
      <label
        className="flex mb-2 text-base min-w-fit font-medium text-base-content "
        htmlFor="file_input"
      >
        Upload file
      </label>
      <input
        className="flex w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        id="file_input"
        type="file"
        onChange={handleImage}
        required
      />
    </div>
  );
};

export default InputFile;
