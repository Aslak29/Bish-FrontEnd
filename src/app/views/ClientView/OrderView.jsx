import React from "react";
import {useLocation} from "react-router-dom";
import {Helmet} from "react-helmet-async";
import Order from "../../components/client/Order";

function OrderView() {

    const location = useLocation();

    return (
        <div className="h-full">
            <Helmet></Helmet>
            <Order id={location.state.id}/>
        </div>
    );
}

export default OrderView;
