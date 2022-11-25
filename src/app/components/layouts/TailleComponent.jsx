import React, { useState, useEffect } from "react";
// requête API
import { useParams } from "react-router-dom";
import apiBackEnd from "../../api/backend/api.Backend";
import { URL_BACK_SIZE_PRODUCT } from "../../constants/urls/urlBackEnd";

// const url =;
const TailleComponent = () => {
  // l'état retourné doit etre available true ou false pour chaque taille
  const [dataProduitSizeS, setDataSizeS] = useState([]);
  const [dataProduitSizeM, setDataSizeM] = useState([]);
  const [dataProduitSizeL, setDataSizeL] = useState([]);
  const [dataProduitSizeXL, setDataSizeXL] = useState([]);
  const { productID } = useParams();

  useEffect(() => {
    apiBackEnd.post(URL_BACK_SIZE_PRODUCT + `${productID}`)
    .then((response) => {
      setDataSizeS(response.data["s"]["stock"])
      setDataSizeM(response.data["m"]["stock"])
      setDataSizeL(response.data["l"]["stock"])
      setDataSizeXL(response.data["xl"]["stock"])
      console.log(response);
    })
    .catch((error)=>{
      console.log(error)
    })
    // const newArr = [] -- nouveau tableau pour ne pas toucher au useEffect nécessaire ??
    // tri par taille
    // window.addEventListener("sort", actionSort)
    // function actionSort() {}
    // // on supprime la fonction de tri
    // return () => {
    //   window.removeEventListener("sort", actionSort);
    // };
  }, []);
  // si le stock est à zéro ou inférieur, taille_id est opaque
  return (
    <div>
      <div>
        <button className="btn-primary-bish">{dataProduitSizeS}</button>
        <button className="btn">{dataProduitSizeM}</button>
        <button className="btn">{dataProduitSizeL}</button>
        <button className="btn">{dataProduitSizeXL}</button>
      </div>
    </div>
  );
};

// const TailleComponent = stateSize({
//     name:'stateSize',
//     reducers: {
//         // trouver et amener l'état "disponibilité des tailles"
//         availableSize: (state) => {
//             const size = {
//                 product: id_product,
//                 size: taille.id_product,
//                 // name: action.payload.name,
//                 // surname: action.payload.surname
//             };
//         },
//     }
// },
// )
// const [dataProduct, setDataProduct] = useState([
//         {int: produit_id},
//         {text: {taille}, taille_id},
//         {int: {stock}, produit_id}
// ]);
export default TailleComponent;
