import React, {useEffect, useState} from "react";
import {URL_BACK_RECENT_USER} from "../../../constants/urls/urlBackEnd"
import apiBackEnd from "@/app/api/backend/api.Backend";

const Customer = () => {

  const [users, setUsers] = useState([])
 
 
  useEffect(() => {
    
    apiBackEnd.get(URL_BACK_RECENT_USER)
    .then(res => {
      setUsers(res.data)
      })

    },[]);

  return (
    <div className='p-5'>
      <h5 className="mb-2">Utilisateur Récents :</h5>
      <table className="w-full text-center table-fixed">
        <thead className="bish-bg-blue bish-text-white">
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Téléphone</th>
          </tr>
        </thead>
        <tbody className="bish-bg-product-detail">
        {users.map((res,index)=> 
          <tr className='border-b-2'key={index}>
            <td className='truncate'>{res.name}</td>
            <td className='truncate'>{res.surname}</td>
            <td className='truncate'>{res.email}</td>
            <td className='truncate'>{res.phone}</td>
          </tr>)}
        </tbody>
      </table>
    </div>
  );
};

export default Customer;
