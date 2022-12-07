import React from 'react'
import {Helmet} from "react-helmet-async";

const OrderView = () => {
  return (
    <div className="titleAndTableContainer w-full text-center">
      <Helmet>
        <title>Bish - Commandes</title>
      </Helmet>
      <h1 className="m-5 bish-text-blue">Vos commandes en cours</h1>
      {/* table Container */}
      <div className="border-t-3 w-3/4 m-auto">
        <p className="border bish-text-white bish-bg-blue">
          Numéro de commande : {"555999"} du {"00/00/99"}
        </p>
        <table className="table-auto bish-shadow-grey w-full m-auto">
          <thead>
            <tr>
              <th className="border bish-text-white bish-bg-gray">
                {"img"} Description
              </th>
              <th className="border bish-text-white bish-bg-gray">Taille</th>
              <th className="border bish-text-white bish-bg-gray">Quantité</th>
              <th className="border bish-text-white bish-bg-gray">
                Prix Unitaire
              </th>
              <th className="border bish-text-white bish-bg-gray">Remise</th>
              <th className="border bish-text-white bish-bg-gray">Total</th>
            </tr>
          </thead>
          <tbody>foreach sur la table commande par id_utilisateur</tbody>
          {/* container Frais de port, taxes, TOTAL & adresse de livraison*/}
          <tfoot>
            <tr>
              {/* container Frais de port, taxes, TOTAL*/}
              <th className="bish-text-gray">
              Sous-total produits
              {/*manque une balise pour ranger les 3 aspects financiers*/}
              </th>
              <td>f</td>
            </tr>
            <tr>
              <th className="bish-text-gray">
              Frais de port et taxes
              </th>
              <td>f</td>
            </tr>
            <tr>
              <th className="bish-text-white bish-bg-blue rounded-xl">
              TOTAL:
              </th>
              <td>45</td>
            </tr>
            <tr className="border">
              <th className="bish-text-gray">Adresse de livraison</th>
              <tr className="text-left">user_id.rue</tr>
              <tr className="text-left">user_id.postal_code</tr>
              <tr className="text-left">user_id.city</tr>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default OrderView