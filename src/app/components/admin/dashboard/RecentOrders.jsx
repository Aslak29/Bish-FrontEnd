import React, {useEffect, useState} from "react";
import {URL_BACK_RECENT_COMMANDE} from "../../../constants/urls/urlBackEnd"
import apiBackEnd from "@/app/api/backend/api.Backend";

const RecentOrders = () => {
  const [commandes, setCommandes] = useState([])
 
 
  useEffect(() => {
    
    apiBackEnd.get(URL_BACK_RECENT_COMMANDE)
    .then(res => {
      console.log(res);
      setCommandes(res.data)
      })

    },[]);

  return (
    <div className='p-5'>
      <h5 className='mb-2'>Commande Récente :</h5>
      <table className='w-full text-center table-fixed'>
        <thead className='bish-bg-blue bish-text-white'>
          <tr>
            <th>Nom du client</th>
            <th>Date de la facture</th>
            <th>Prix total</th>
            <th>Etat de la commande</th>
          </tr>
        </thead>
        <tbody  className='bish-bg-product-detail'>
          {commandes.map((res,index)=> 
          <tr className='border-b-2'key={index}>
            <td className='truncate'>{res.user_name}</td>
            <td className='truncate'>{new Date(res.dateFacture.date.split(" ")[0]).toLocaleDateString("fr")}</td>
            <td className='truncate'>{res.price}</td>
            <td className='truncate'>{res.etat}</td>
          </tr>)}
         
        </tbody>
      </table>

    </div>
  )
}

export default RecentOrders