import React, { Component, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiBackEnd from "../../api/backend/api.Backend";
import StarRatings from './react-star-ratings';
import { URL_BACK_STARS_PRODUCT } from "../../constants/urls/urlBackEnd";


const StarsComponent = () => {
    const [dataProduitStar, setDataStar] = useState([]);
    const { productID } = useParams();

    const setNewRating = (rating) => {
        this.props.dispatch(StarRatings.setRating(rating));
    }
    function changeRating(newRating, name) {
    this.setState({
      rating: newRating,
      });
    }
      useEffect(() => {
    apiBackEnd
      .get(URL_BACK_STARS_PRODUCT + `${productID}`)
      .then((response) => {
        setDataStar(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [productID]);

  render() {
    // rating = 2;
    return (
      <StarRatings
        rating={this.state.rating}
        starRatedColor=".bish-bg-blue"
        changeRating={this.changeRating}
        numberOfStars={5}
        name="rating"
      />
    );
  }
}

class BarStars extends Component {
  render() {
    // aggregateRating = 2.35;
    return (
      <StarRatings 
        rating={2.403} 
        starDimension="40px" 
        starSpacing="15px" />
    );
  }
}

export default StarsComponent;