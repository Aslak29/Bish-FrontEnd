import React, {useEffect, useState} from 'react'
import apiBackend from "../../api/backend/api.Backend";
import {URL_BACK_LIST_ORDERS} from "../../constants/urls/urlBackEnd";
import {useNavigate} from "react-router-dom";
import { URL_404 } from '../../constants/urls/urlFrontEnd';
import loadingSVG from "@/app/assets/images/loading-spin.svg";

const orders = () => {
    const navigate = useNavigate();
    const [infoCommande, setInfoCommande] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect( ()=>{
        setIsLoading(true)
        apiBackend.post(URL_BACK_LIST_ORDERS + `${localStorage.id}`).then((response) => {
            setIsLoading(false)
            if (response.status === 200) {
                if (response.data.length === 0) {
                    setInfoCommande(null)
                }else {
                    setInfoCommande(
                        response.data
                    );
                }
            }
        }).catch((error) => {
            setInfoCommande(null)
            setIsLoading(false)
        })
    },[]);

    function fetchCommande(idCommande) {
        if (idCommande) {
            navigate('/espace-client/commandes/commande/', {state: {id: idCommande}});
        } else {
            navigate(URL_404)
        }
    }

    return (
        <div>
            <h1 className=" mb-5 bish-text-blue">Mes commandes</h1>

            { isLoading ? <img className='m-auto' src={loadingSVG} alt="Chargement"></img> :
                     infoCommande !== null ?
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
                            {infoCommande.map((commande) =>
                                <tr
                                    className="text-center cursor-pointer hover:bish-bg-blue hover:bish-text-white"
                                    key={commande.id}
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
                            )}
                            </tbody>
                        </table>
                        :
                        <div className='bish-bg-white rounded-xl w-4/5 mt-6 sm:mt-12 bish-shadow-grey mx-auto p-10'>
                            <p>Vous n'avez aucune commande !</p>
                        </div>
            }

        </div>
    )
}

export default orders;
