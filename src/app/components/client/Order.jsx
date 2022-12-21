import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import apiBackend from "../../api/backend/api.Backend";
import {URL_BACK_SINGLE_ORDER} from "../../constants/urls/urlBackEnd";
import {URL_404} from "../../constants/urls/urlFrontEnd";
import loadingSVG from "../../assets/images/loading-spin.svg";

const Order = (props) => {

    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    // SVG isLoading si requête en cours
    const [isLoading, setIsLoading] = useState(false);
    const [infoClient, setInfoClient] = useState({});
    const [totalCommande, setTotalCommande] = useState(0);

    let infoClientCommande = [];

    useEffect(() => {
        setIsLoading(true);
        apiBackend
            .post(URL_BACK_SINGLE_ORDER + `${props.id}`)
            .then((response) => {
                if (response.status === 200) {
                    let total = 0;
                    response.data.map((res) => {
                        total += res.total && res.total;
                        res.total && setTotalCommande(total);
                    });
                    // pop pour sortir les infos Commande à part des articles
                    infoClientCommande = response.data.pop();
                    infoClientCommande[0].Adresse.ville = infoClientCommande[0].Adresse.ville.toUpperCase()
                    setInfoClient(infoClientCommande[0].Adresse);
                    setRows(response.data);
                    setIsLoading(false);
                }
            })
            .catch((error) => {
                if (error.response.data["errorCode"] === "002") {
                    navigate(URL_404);
                }
            });
    }, []);


    return (
        <div className='flex flex-col items-center justify-center shadow bish-bg-white mb-11 w-3/4 mx-auto px-11 pb-6 bish-bg-white-up rounded-lg'>
            <span className='text-center my-auto text-2xl font-medium my-11'>Suivi de commande</span>
            {isLoading ? (
                <img
                    className="absolute top-1/3 left-1/2"
                    src={loadingSVG}
                    alt="Chargement"
                ></img>
            ) : (
                <>
                    <table
                        className="table-fixed w-full pl-5 font-medium"
                        id="searchTable"
                    >
                        {/* Nom de chaque colonne */}
                        <thead className="shadow mb-11">
                        <tr className="">
                            {/* Titres des colonnes dans le header de la table */}
                            <th>Image</th>
                            <th>Nom</th>
                            <th>Taille</th>
                            <th>Quantité</th>
                            <th>Prix</th>
                            <th>Remise</th>
                            <th>Total</th>
                        </tr>
                        </thead>
                        {/* Liste des articles */}
                        <tbody className="">
                        {/* Retourne une ligne pour chaque élément */}
                        {rows.map((row, index) => {
                            return (
                                <tr className="text-center py-5" key={index}>
                                    <td className="flex items-center justify-center mt-4">
                                        <img
                                            src={
                                                window.location.origin +
                                                "/src/app/assets/images/products/" +
                                                row.image
                                            }
                                            alt=""
                                            className="w-1/2 items-center border-solid border-2 bish-border-gray"
                                        />
                                    </td>
                                    <td>{row.nomProduit}</td>
                                    <td className="uppercase">{row.Taille}</td>
                                    <td>{row.quantite}</td>
                                    <td>{row.prixUnitaire} €</td>
                                    <td>{row.remise.toFixed(0)} %</td>
                                    <td className="text-center">{row.total} €</td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                    <div className="flex flex-row justify-between w-full border-t-[3px] mt-5 pt-5 font-medium">
                        <div
                            className="flex flex-row bish-bg-white-up items-start justify-start text-center w-1/2 p-2">
                            <div className="flex my-auto w-3/5">Adresse de livraison:</div>
                            <div className="flex my-auto justify-center text-center w-full">
                                <span>{infoClient.rue + " " + infoClient.Code_Postal + " " + infoClient.ville}</span>
                            </div>
                        </div>
                        <div className="flex flex-row h-full">
                            <div className="flex flex-col pr-5">
                                <span>Sous-total Produits: </span>
                                <span>Taxes: </span>
                                <span>Frais de port: </span>
                                <span className="bish-bg-blue bish-text-white rounded text-center font-medium">
                                    TOTAL:
                                </span>
                            </div>
                            <div className="flex flex-col text-right">
                                <span>{totalCommande.toFixed(2) + " €"}</span>
                                <span>{(totalCommande * 0.2).toFixed(2) + " €"}</span>
                                <span> 2 €</span>
                                <span>
                                    {(totalCommande + totalCommande * 0.2 + 2).toFixed(2) + " €"}
                                </span>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>

    )
}

export default Order;