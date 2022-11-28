import React, { useState, useEffect } from "react";
// requête API
import { useParams } from "react-router-dom";
import apiBackEnd from "../../api/backend/api.Backend";
import { URL_BACK_SIZE_PRODUCT } from "../../constants/urls/urlBackEnd";

const TailleComponent = () => {
  const [dataProduitSizeS, setDataSizeS] = useState([]);
  const [dataProduitSizeM, setDataSizeM] = useState([]);
  const [dataProduitSizeL, setDataSizeL] = useState([]);
  const [dataProduitSizeXL, setDataSizeXL] = useState([]);
  // const { productID } = useParams();
  const [dataProduct, setDataProduct] = useState([]);
  
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
  },[])
    // tri par taille
    // window.addEventListener("sort", actionSort)
    // function actionSort() {}
    // // on supprime la fonction de tri
    // return () => {
    //   window.removeEventListener("sort", actionSort);
    // };
    
    function stockIsOK(props){
      const availableInStock = props.availableInStock;
      if(availableInStock){
        return <button className="btn-primary-bish">{setDataSizeS(response.data["s"])}</button>
      }else{
        return (
          <button className="btn-secondary-bish">
            {setDataSizeS(response.data["s"])}
          </button>
        );
      }
    }
  
  let noStock = Boolean;
  if (setDataSizeS[1], dataProduitSizeM, dataProduitSizeL, dataProduitSizeXL <= 0){
    noStock = true;
    }else{
      noStock = false;  
    };
  // si le stock est à zéro ou inférieur, taille_id est opaque

    return (
      <div>
        <div>
            <button 
              className={
              (noStock = false ? "btn-secondary-bish" : "btn-primary-bish")
            }
          >
            {"S"}
          </button>
          <button
            className={
              (noStock = false ? "btn-secondary-bish" : "btn-primary-bish")
            }
          >
            {"M"}
          </button>
          <button
            className={
              (noStock = false ? "btn-secondary-bish" : "btn-primary-bish")
            }
          >
            {"L"}
          </button>
          <button
            className={
              (noStock = false ? "btn-secondary-bish" : "btn-primary-bish")
            }
          >
            {"XL"}
          </button>
        </div>
      </div>
    );
  }


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
