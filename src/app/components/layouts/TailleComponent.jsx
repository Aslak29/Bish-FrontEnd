import React, { useState, useEffect } from "react";
// requête API
import { useParams } from "react-router-dom";
import apiBackEnd from "../../api/backend/api.Backend";
import { URL_BACK_SIZE_PRODUCT } from "../../constants/urls/urlBackEnd";

// function sizeAndStock(props){

//   const [sizeAndStock, setDatasizeAndStock] = useState[
//   { produit_id:, id:${name},
//     key:, $key:${key},
//     values:, ${values},
//   }
//   ]
// }
const TailleComponent = () => {
  let setDataProduct = [];
  // const [dataProduitSizeS, setDataSizeS] = useState([]);
  // const [dataProduitSizeM, setDataSizeM] = useState([]);
  // const [dataProduitSizeL, setDataSizeL] = useState([]);
  // const [dataProduitSizeXL, setDataSizeXL] = useState([]);
  const [dataProduitSize, setDataSize] = useState([]);
  const { productID } = useParams();
  // const [dataProduct, setDataProduct] = useState([0, 1, 3]);
  // console.log(TailleComponent);
  // let arraySizeByProduct = [];
  useEffect(() => {
    apiBackEnd
      .get(URL_BACK_SIZE_PRODUCT + `${productID}`)
      .then((response) => {
        for (const [key, value] of Object.entries(response.data)) {
          const arrayRender = [];
          const arraySizeByProduct = Object.entries(`${key}:${value.stock}`);
          arraySizeByProduct.every(key, value);
          console.log(arraySizeByProduct);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  // console.log(dataProduitSize);

  // le stock est-il positif ou non ?
  let noStock = Boolean;
  function sizeAvailable() {
    if (dataProduitSize <= 0) {
      noStock = true;
    } else {
      noStock = false;
    }
  }
  // si le stock est à zéro ou inférieur, taille_id est opaque

  return (
    <div>
      <div>
        <button
          className={`(${sizeAvailable} = false) ? btn-secondary-bish : btn-primary-bish`}
        ></button>
      </div>
    </div>
  );
};

export default TailleComponent;
