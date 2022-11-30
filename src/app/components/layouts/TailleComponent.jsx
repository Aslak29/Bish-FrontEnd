import React, { useState, useEffect } from "react";
// requête API
import { useParams } from "react-router-dom";
import apiBackEnd from "../../api/backend/api.Backend";
import { URL_BACK_SIZE_PRODUCT } from "../../constants/urls/urlBackEnd";

const TailleComponent = () => {
  const [dataProduitSize, setDataSize] = useState([]);
  const { productID } = useParams();

  useEffect(() => {
    apiBackEnd
      .get(URL_BACK_SIZE_PRODUCT + `${productID}`)
      .then((response) => {
        setDataSize(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [productID]);
  return (
    <div>
      <div>
        {Object.entries(dataProduitSize).map(([key, value])=>{
          return (
            <div>
              <button
                className={`${value.stock <= 0 ? "btn-secondary-bish" : "btn-primary-bish"}`}
              >
                {key}
              </button>
            </div>
          );
        }
      )
    }
      </div>
    </div>
  );
};

export default TailleComponent;
