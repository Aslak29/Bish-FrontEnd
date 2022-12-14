import React from 'react'
import {Helmet} from "react-helmet-async";
import React from "react";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import apiBackend from "../../api/backend/api.Backend";
import {URL_ORDER} from '/espace-client/commandes/commande/:orderID';

const OrdersView = () => {
  const [singlesOrders, setSinglesOrders] = useState([]);
  const singleOrderID=useParams();

  useEffect(() => {
    apiBackend.get(URL_ORDER).then((response => {
      setSinglesOrders(response.data[id]);
    }))
  }, []);

const OrderView = () => {
  return (
    <div>
      <Helmet>
        <title>Bish - Commandes</title>
      </Helmet>
      SeeOrderView</div>
  )
}

export default OrderView