import React, {useState, useEffect} from "react";
import { Helmet } from "react-helmet-async";
import apiBackend from "../../api/backend/api.Backend";
import { URL_BACK_LIST_ORDERS } from "../../constants/urls/urlBackEnd.js";
import { useNavigate } from "react-router-dom";

function OrdersView(){
  const navigate = useNavigate();
  const [infoCommande, setInfoCommande] = useState([]);
  
  useEffect(()=>{
    apiBackend.post(URL_BACK_LIST_ORDERS + `${localStorage.id}`).then((response) => {
      console.log(response.data);
      if (response.status === 200) {
        setInfoCommande(
          response.data
          );
        }
    });
  },[]);

function fetchCommande(idCommande) {
  navigate('/espace-client/commandes/commande/' + idCommande);
}
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
        {infoCommande.map((commande, index)=>   {
            return (
              <tr
                className="text-center cursor-pointer hover:bish-bg-blue hover:bish-text-white"
                key={index}
                onClick={() => fetchCommande(commande.id)}
              >
                <td className="border-r-2 py-5 bish-border-gray">
                  {commande.id}
                </td>
                <td className="border-x-2 py-5 bish-border-gray">
                  {commande.montant}
                </td>
                <td className="border-x-2 py-5 bish-border-gray">
                  {commande.date_facture}
                </td>
                <td className="border-l-2 py-5 bish-border-gray">
                  {commande.etatCommande}
                </td>
              </tr>
            );
          })}
            </tbody>
            </table>
      </div>
      );
    }

export default OrdersView;
