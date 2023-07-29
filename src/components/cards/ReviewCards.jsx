import Image from "next/image";

import React from "react";

export function ReviewCard({ user, comment }) {
  return (
    <div className="review-container bg-base-100 w-full rounded-lg py-2 flex gap-3">
      <div className="avatar flex">
        <div className="w-8 mask mask-squircle">
          <Image src="/next.svg" alt="" width={48} height={48} />
        </div>
      </div>
      <div className="flex flex-col items-start">
        <h6 className="text-lg">{user}</h6>
        <p className="text-base">{comment}</p>
      </div>
    </div>
  );
}

const ReviewCards = (value) => {
  return (
    <div className="flex flex-col gap-4 w-full ">
      {value
        ? value.reviews.map((review, key) => {
            return (
              <div key={key}>
                <ReviewCard {...review} />
              </div>
            );
          })
        : "nothing"}
    </div>
  );
};

export default ReviewCards;
