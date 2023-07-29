import Image from "next/image";
import React from "react";

const Carousel = ({ value }) => {
  return (
    <div className="flex">
      <div className="carousel carousel-center w-fit">
        {value
          ? value.map((item, key) => {
              return (
                <div id={`item${key}`} key={key} className="carousel-item">
                  <Image
                    src={item}
                    className="w-9/12"
                    width={500}
                    height={500}
                    alt=""
                  />
                </div>
              );
            })
          : ""}
      </div>
      <div className="flex justify-center flex-col py-2 gap-2">
        {value
          ? value.map((item, key) => {
              return (
                <a href={`#item${key}`} className="btn btn-xs" key={key}>
                  {key + 1}
                </a>
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default Carousel;
