import React, { Component, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiBackEnd from "../../api/backend/api.Backend";
  // import StarRatings from 'react-star-ratings';
import { URL_BACK_PRODUCT_FILTER } from "../../constants/urls/urlBackEnd";



const StarsComponent = props => {
  function notes(produit_id, note){
    console.log(produit_id);
    return apiBackEnd
      .post(URL_BACK_PRODUCT_FILTER + "/" + produit_id)
      .then((res) => {
        return res;
      });
  }
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
              .post(URL_BACK_PRODUCT_FILTER + `${productID}`)
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
      <div>
        {}
      </div>
    );
  }


// class BarStars extends Component {
//   render() {
//     // aggregateRating = 2.35;
//     return (
//       <StarRatings 
//         rating={5} 
//         starDimension="40px" 
//         starSpacing="15px" />
//     );
//   }
// }

export default StarsComponent;