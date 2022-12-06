import React from "react";
import StarRatings from "react-star-ratings";

const StarsComponent = (props) => {

  return (
    <div>
      <StarRatings
        rating={props.note}
        starRatedColor="#2EB7EB"
        numberOfStars={5}
        name="rating"
        starDimension="30px"
        starSpacing="4px"
        >
      </StarRatings>
    </div>
  );
};

export default StarsComponent;
