import React, { Component, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiBackEnd from "../../api/backend/api.Backend";
  // import StarRatings from 'react-star-ratings';
import { URL_BACK_STARS_PRODUCT } from "../../constants/urls/urlBackEnd";

function notes(produit_id, note){
  return apiBackEnd.get(URL_BACK_STARS_PRODUCT + '/' + produit_id + '/' + note).then(res=>{
    return res;
  });
}

const StarsComponent = props => {
    const { productID } = useParams();
    const [dataStar, setDataStar] = useState([]);
    // const setNewRating = (rating) => {
      //     this.props.dispatch(StarRatings.setRating(rating));
      // }
      // function changeRating(newRating, name) {
        // this.setState({
          //   rating: newRating,
          //   });
          // }
          useEffect(() => {
            apiBackEnd
            .get(URL_BACK_STARS_PRODUCT + `${productID}`)
            .then((response) => {
              setDataStar(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
      if(props.produitId){
        dataStar();
        notes(props.produitId, props.note).then
        ((response)=>{
          dataStar(response.data)
        })
      }
  }, []);


    // rating = 2;
    return (
      <StarRatings
        rating={this.note}
        starRatedColor=".bish-bg-blue"
        id={this.product_id}
        numberOfStars={5}
        name="rating"
      />
    );
  }


class BarStars extends Component {
  render() {
    // aggregateRating = 2.35;
    return (
      <StarRatings 
        rating={5} 
        starDimension="40px" 
        starSpacing="15px" />
    );
  }
}

export default StarsComponent;