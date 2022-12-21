import React from "react";
import { Helmet } from "react-helmet-async";
import Orders from "../../components/client/Orders";

function OrdersView(){

  return (
    <div className="w-full text-center">
      <Helmet>
        <title>Bish - Mes Commandes</title>
      </Helmet>
        <Orders/>
      </div>
      );
    }

export default OrdersView;
