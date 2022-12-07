import React, {useState, useEffect} from "react";
import StarRatings from "react-star-ratings";

const StarsComponent = (props) => {

  const [matches, setMatches] = useState(window.matchMedia("(min-width: 640px)").matches)

  useEffect(() => {
    const handler = e => setMatches(e.matches);
    window.matchMedia("(min-width: 640px)").addEventListener('change', handler);
  },[])

  return (
    <div>
      {matches ? 
        <StarRatings
          rating={props.note}
          starRatedColor="#2EB7EB"
          numberOfStars={5}
          name="rating"
          starDimension="2vw"
          starSpacing="4px"
        >
        </StarRatings>
        :
        <StarRatings
          rating={props.note}
          starRatedColor="#2EB7EB"
          numberOfStars={5}
          name="rating"
          starDimension="5vw"
          starSpacing="4px"
        >
        </StarRatings>
      }
      
    </div>
  );
};

export default StarsComponent;
