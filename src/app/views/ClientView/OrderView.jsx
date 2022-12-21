import React, { useState, useEffect } from "react";
import apiBackend from "../../api/backend/api.Backend";
import { useNavigate, useParams } from "react-router-dom";
import { URL_BACK_SINGLE_ORDER } from "../../constants/urls/urlBackEnd.js";
import { Helmet } from "react-helmet-async";
import loadingSVG from "../../assets/images/loading-spin.svg";
import TitleContainer from "../../components/admin/TitleContainer";
import { URL_404 } from "../../constants/urls/urlFrontEnd";

function OrderView() {
  // const [singleOrder, setSingleOrder] = useState([]);
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [formCreate] = useState();
  // SVG isLoading si requête en cours
  const [isLoading, setIsLoading] = useState(false);
  const { orderID } = useParams();
  const [infoCommande, setInfoCommande] = useState([]);
  const [etatCommande, setEtatCommande] = useState();
  const [dateCommande, setDateCommande] = useState();
  const [infoClient, setInfoClient] = useState({});
  const [totalCommande, setTotalCommande] = useState(0);

  let infoClientCommande = [];
  // infoClientCommande = useRef(infoClientCommande[0].Adresse);
  useEffect(() => {
    setIsLoading(true);
    apiBackend
      .post(URL_BACK_SINGLE_ORDER + `${orderID}`)
      .then((response) => {
        if (response.status === 200) {
          let total = 0;
          response.data.map((res) => {
            total += res.total && res.total;
            res.total && setTotalCommande(total);
            console.log(res.total);
          });
          setInfoCommande(
            response.data[response.data.length - 1][0].numeroCommande
          );
          setEtatCommande(response.data[response.data.length - 1][0].Etat);
          setDateCommande(
            response.data[response.data.length - 1][0].dateFacture
          );
          // pop pour sortir les infos Commande à part des articles
          infoClientCommande = response.data.pop();
          // console.log(response.data.pop());
          setInfoClient(infoClientCommande[0].Adresse);
          console.log(infoClientCommande);
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
  // Pour récupération Adresse Client uniquement
  useEffect(() => {
    console.log(infoClient);
  }, [infoClient]);

  return (
    <div>
      <Helmet></Helmet>
      <TitleContainer
        form={formCreate}
        name={
          "Commande n° " +
          JSON.stringify(infoCommande) +
          " passée le " +
          JSON.stringify(dateCommande) +
          " Status : " +
          JSON.stringify(etatCommande)
        }
      />
      {/* TABLE PRODUITS */}
      {isLoading ? (
        <img
          className="absolute top-1/3 left-1/2"
          src={loadingSVG}
          alt="Chargement"
        ></img>
      ) : (
        <table
          className="table-fixed w-3/4 pl-5 mt-20 font-medium"
          id="searchTable"
        >
          {/* Nom de chaque colonne */}
          <thead className="border-b-4 bish-border-gray sticky top-40 bish-bg-white shadow">
            <tr>
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
          <tbody>
            {/* Retourne une ligne pour chaque élément */}
            {rows.map((row, index) => {
              return (
                <tr className="text-center" key={index}>
                  <td>
                    <img
                      src={
                        window.location.origin +
                        "/src/app/assets/images/products/" +
                        row.image
                      }
                      alt=""
                      className={`w-1/2 h-1/2 items-center`}
                    />
                  </td>
                  <td>{row.nomProduit}</td>
                  <td className="uppercase">{row.Taille}</td>
                  <td>{row.quantite}</td>
                  <td>{row.prixUnitaire}</td>
                  <td>{row.remise}</td>
                  <td className="text-end">{row.total}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {
        <div className="flex flex-row justify-between w-3/4 m-1 font-medium">
          <div className="border-b-4 flex flex-row bish-bg-white-up items-start justify-start text-center w-1/2 p-2">
            <div className="flex my-auto">Adresse de livraison:</div>
            <div className="flex flex-col text-center w-full">
              <span>{infoClient.rue}</span>
              <span>{infoClient.Code_Postal}</span>
              <span>{infoClient.ville}</span>
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
      }
    </div>
  );
}

export default OrderView;
