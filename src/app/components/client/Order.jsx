import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import apiBackend from "../../api/backend/api.Backend";
import {URL_BACK_SINGLE_ORDER} from "../../constants/urls/urlBackEnd";
import {URL_404} from "../../constants/urls/urlFrontEnd";
import loadingSVG from "../../assets/images/loading-spin.svg";
import detailsIMG from '../../assets/images/detailsIMG.png'
import StarsRating from "@/app/components/client/StarsRating";
import {useSelector} from "react-redux";
import {selectUser} from "@/app/redux-store/authenticationSlice";
import {ToastContainer} from "react-toastify";

const Order = (props) => {

    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const user = useSelector(selectUser);
    // SVG isLoading si requête en cours
    const [isLoading, setIsLoading] = useState(false);
    const [infoClient, setInfoClient] = useState({});
    const [totalCommande, setTotalCommande] = useState(0);
    const [codePromo, setCodePromo] = useState({})

    let infoClientCommande = [];

    useEffect(() => {
        setIsLoading(true);
        apiBackend
            .get(URL_BACK_SINGLE_ORDER + `${props.id}`)
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
                    const remise = infoClientCommande[0].codePromo.remise;
                    if (infoClientCommande[0].codePromo.remiseType === "pourcent"){
                        setCodePromo({remise: remise,remiseType: "%"})
                    }else if (infoClientCommande[0].codePromo.remiseType === "euro"){
                        setCodePromo({remise: remise,remiseType: "€"})
                    }else {
                        setCodePromo(infoClientCommande[0].codePromo)
                    }
                    console.log(infoClientCommande[0].codePromo)
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
        <div className='flex flex-col items-center justify-center shadow bish-bg-white mb-11 lg:w-3/4 w-11/12 mx-auto px-2 sm:px-11 pb-6 bish-bg-white-up rounded-lg'>
            <span className='text-center my-auto text-2xl font-medium my-11'>Suivi de commande</span>
            {isLoading ? (
                <img
                    className="absolute top-1/3 left-1/2"
                    src={loadingSVG}
                    alt="Chargement"
                ></img>
            ) : (
                <>
                    <ToastContainer/>
                    <table
                        className="table-fixed w-full pl-5 font-medium text-xs sm:text-base"
                        id="searchTable"
                    >
                        {/* Nom de chaque colonne */}
                        <thead className="shadow mb-11">
                        <tr className="">
                            {/* Titres des colonnes dans le header de la table */}
                            <th>Image</th>
                            <th colSpan='2'>Nom</th>
                            {props.etatCommande === "Livrée" && <th colSpan='2'>Note</th>}
                            <th>Taille</th>
                            <th>Quantité</th>
                            <th>Prix</th>
                            <th>Prix Remisé</th>
                            <th>Remise</th>
                            <th>Total</th>
                        </tr>
                        </thead>
                        {/* Liste des articles */}
                        <tbody className="">
                        {/* Retourne une ligne pour chaque élément */}
                        {rows.map((row, index) => {
                            return (
                                <tr className="text-center my-5" key={index}>
                                    <td className="flex items-center justify-center mt-4">
                                        <img
                                            src={row.image !== "-" ? window.location.origin + "/src/app/assets/images/products/" + row.image : detailsIMG}
                                            alt=""
                                            className="w-1/2 items-center border-solid border-2 bish-border-gray"
                                        />
                                    </td>
                                    <td colSpan='2'>{row.nomProduit}</td>
                                    {props.etatCommande === "Livrée" &&
                                        <td colSpan="2">
                                            <StarsRating noteUser={row.noteByUser} userId={user.id} produitId={row.produitId}/>
                                        </td>
                                    }
                                    <td className="uppercase">{row.Taille}</td>
                                    <td>{row.quantite}</td>
                                    <td>{row.prixUnitaire.toFixed(2)} €</td>
                                    <td>{row.prixRemise !== "-" ?
                                        row.prixRemise + " €" : "-"
                                    }</td>
                                    <td>{row.remise !== null ?
                                        row.remise.toFixed(0) + "%" : "-"
                                    }</td>
                                    <td className="text-center">{row.total.toFixed(2)} €</td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                    <div className="flex flex-col lg:flex-row justify-between w-full border-t-[3px] mt-5 pt-5 font-medium text-center text-xs sm:text-base">
                        <div
                            className="flex flex-row bish-bg-white-up items-start justify-start w-full lg:w-1/2 p-2">
                            <div className="flex my-auto w-3/5">Adresse de livraison:</div>
                            <div className="flex my-auto justify-start sm:justify-center text-center w-full">
                                <span>{infoClient.rue + " " + infoClient.Code_Postal + " " + infoClient.ville}</span>
                            </div>
                        </div>
                        <div className="flex flex-row h-full justify-end lg:justify-center pt-5">
                            <div className="flex flex-col text-right pr-5">
                                <span>Sous-total Produits : </span>
                                {codePromo.remise !== "-" &&
                                    <span>Code-Promo : </span>
                                }

                                <span className="bish-bg-blue bish-text-white rounded text-center font-medium">
                                    TOTAL :
                                </span>
                            </div>
                            <div className="flex flex-col text-right">
                                <span>{totalCommande.toFixed(2) + " €"}</span>{console.log(codePromo.remiseType)}
                                {codePromo.remise !== "-" &&
                                    <span>{codePromo.remise + " " + codePromo.remiseType}</span>
                                }
                                <span>
                                    {codePromo.remise !== "-" ?
                                        codePromo.remiseType === "%" ?
                                        (totalCommande - ((totalCommande * codePromo.remise)/100)).toFixed(2)+ " €"
                                            :
                                            (totalCommande - codePromo.remise).toFixed(2)+ " €"
                                        :
                                        totalCommande.toFixed(2) + " €"
                                    }
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