import React, {useEffect, useState} from 'react'
import apiBackend from "../../api/backend/api.Backend";
import {URL_BACK_LIST_ORDERS} from "../../constants/urls/urlBackEnd";
import {useNavigate} from "react-router-dom";

const orders = () => {
    const navigate = useNavigate();
    const [infoCommande, setInfoCommande] = useState([]);

    useEffect( ()=>{
        apiBackend.post(URL_BACK_LIST_ORDERS + `${localStorage.id}`).then((response) => {
            if (response.status === 200) {
                setInfoCommande(
                    response.data
                );
            }
        });
    },[]);

    function fetchCommande(idCommande) {
        navigate('/espace-client/commandes/commande/', {state: {id: idCommande}});
    }

    return (
        <div>
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
                                {(commande.montant + commande.montant * 0.2 + 2).toFixed(2)} €
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
    )
}

export default orders;
