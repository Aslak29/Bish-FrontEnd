import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiBackend from "../../api/backend/api.Backend";
import {URL_BACK_SINGLE_ORDER} from "../../constants/urls/urlBackEnd.js";



const OrderView = () => {
    const [singleOrder, setSingleOrder] = useState([]);
    const singleOrderID = useParams();
    
    useEffect(
      () => {
        apiBackend
          .post(URL_BACK_SINGLE_ORDER + `${singleOrderID.orderID}`)
          .then((response) => {
            if (response.status === 200) {
              setSingleOrder(response.data);
            }
            // $dataOrderArray =[];
            // foreach($idInCommandes as $idInCommande){
            //   $dataOrderArray
            // }
            console.log(response.data);
          })
          .catch((error) => {
            if (error.response.data["errorCode"] === "002") {
            }
          });
    },[]);
        

  return (
    <div>
      <h1 className="m-5 bish-text-blue text-center">Vos commandes en cours</h1>
      <div className="border-t-3 w-3/4 m-auto">
        <p className="bish-text-blue text-center">
          Numéro de commande : {"555999"} du {"00/00/99"}
        </p>
    </div>
    <div className="containerGeneral grid grid-cols-6 gap-6 bish-bg-product-detail w-full bish-shadow-grey m-5">
      <div className="description bish-text-gray font-medium m-5 text-center">
        <h6>Description</h6>
      </div>
      <div className="taille bish-text-gray font-medium m-5 text-center">
        <h6>Taille</h6>
      </div>
      <div className="quantite bish-text-gray font-medium m-5 text-center">
        <h6>Quantité</h6>
      </div>
      <div className="prix bish-text-gray font-medium m-5 text-center">
        <h6>Prix</h6>
      </div>
      <div className="remise bish-text-gray font-medium m-5 text-center">
        <h6>Remise</h6>
      </div>
      <div className="total bish-text-gray font-medium m-5 text-center">
        <h6>Total</h6>
      </div>
    </div>
    </div>
  )};
  
export default OrderView;