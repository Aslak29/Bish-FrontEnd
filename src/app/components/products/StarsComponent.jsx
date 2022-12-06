import React from "react";

import StarRatings from "react-star-ratings";
// import { URL_PRODUCT_LINK } from '/produits/produit/';

const StarsComponent = (props) => {
  let noteAverage = props;
  console.log(props);
  // const note = 3.2;
  // let produit = props.produit;

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
        {noteAverage}
      </StarRatings>
    </div>
  );
};

export default StarsComponent;
