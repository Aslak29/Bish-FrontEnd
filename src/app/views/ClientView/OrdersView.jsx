import React from "react";
import { Helmet } from "react-helmet-async";

const OrdersView = () => {
  return (
    <div className="w-full text-center">
      <Helmet>
        <title>Bish - Mes Commandes</title>
      </Helmet>
      <h1 className=" mb-5 bish-text-blue">Mes commandes</h1>
      <table className="table-auto bish-shadow-grey w-3/4 m-auto">
        <thead className="border-b-2 bish-border-gray">
          <tr>
            <th className="border-r-2 py-5 bish-border-gray">Référence</th>
            <th className="border-x-2 py-5 bish-border-gray">Montant</th>
            <th className="border-x-2 py-5 bish-border-gray">Date</th>
            <th className="border-l-2 py-5 bish-border-gray">Etat</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border-r-2 py-5 bish-border-gray">1565161</td>
            <td className="border-x-2 py-5 bish-border-gray">50.78€</td>
            <td className="border-x-2 py-5 bish-border-gray">21/11/2018</td>
            <td className="border-l-2 py-5 bish-border-gray">Livrée</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OrdersView;
