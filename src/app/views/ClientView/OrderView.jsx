import React, { useState, useEffect, useRef } from "react";
// import { useParams } from "react-router-dom";
import apiBackend from "../../api/backend/api.Backend";
import { useNavigate, useParams } from "react-router-dom";
import { URL_BACK_SINGLE_ORDER } from "../../constants/urls/urlBackEnd.js";
import { Helmet } from "react-helmet-async";
import loadingSVG from "../../assets/images/loading-spin.svg";
// import TableRow from "./../../components/admin/TableRow";
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
  const [infoCommande, setInfoCommande] = useState();
  const [etatCommande, setEtatCommande] = useState();
  const [dateCommande, setDateCommande] = useState();
  let infoClientCommande = [];

  useEffect(() => {
    setIsLoading(true);
    apiBackend
      .post(URL_BACK_SINGLE_ORDER + `${orderID}`)
      .then((response) => {
        if (response.status === 200) {
          setInfoCommande(
            response.data[response.data.length - 1][0].numeroCommande
          );
          setEtatCommande(response.data[response.data.length - 1][0].Etat);
          setDateCommande(
            response.data[response.data.length - 1][0].dateFacture
          );
          // pop pour sortir les infos Commande à part des articles
          infoClientCommande = response.data.pop();

          console.log(infoClientCommande[0].Adresse);
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
        <table className="table-fixed w-full pl-5 mt-20" id="searchTable">
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
                      className={`object-cover w-1/2 h-1/2`}
                    />
                  </td>
                  <td>{row.nomProduit}</td>
                  <td className="uppercase">{row.Taille}</td>
                  <td>{row.quantite}</td>
                  <td>{row.prixUnitaire}</td>
                  <td>{row.remise}</td>
                  <td>{row.total}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {
        <div>
          //{" "}
          {/*infoClientCommande.map((info, index) => {
          // return (
          //     <h3>{info[0].Adresse}</h3>
          //     <p>{}</p>
          //     );
      //   })*/}
        </div>
      }
    </div>
  );
}

export default OrderView;
