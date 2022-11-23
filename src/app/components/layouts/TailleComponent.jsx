import React, {useState, useEffect, Fragment} from "react";
// requête API

function StockState(){
    // l'état retourné doit etre available true ou false pour chaque taille
    const [dataProduitSizeXS, setDataSizeXS] =
        useState("");
    const [dataProduitSizeS, setDataSizeS] =
        useState("");
    const [dataProduitSizeM, setDataSizeM] =
        useState("");
    const [dataProduitSizeL, setDataSizeL] =
        useState("");
    const [dataProduitSizeXL, setDataSizeXL] =
        useState("");
    const [dataProduitSizeXXL, setDataSizeXXL] =
        useState("");
    };

    useEffect(() => {
        // appel de la bdd
        fetch('url')
        .then(response => {
            // réponse de la bdd
            return response.json();
        })
        .then(data => {
            // sortir le chiffre du stock et taille_id
            setDataSizeL(data[2][3].url) = $available
        })
    })
// si le stock est à zéro ou inférieur, taille_id est opaque
        return (
            <Fragment>
                <div className="XS"><button>{dataProduitSizeXS && <p>XS</p>}</button></div>  
                <div className="S"><button>{dataProduitSizeS && <p>S</p>}</button></div>
                <div className="M"><button>{dataProduitSizeM && <p>M</p>}</button></div>
                <div className="L"><button>{dataProduitSizeL && <p>L</p>}</button></div>
                <div className="XL"><button>{dataProduitSizeXL && <p>XL</p>}</button></div>
                <div className="XXL"><button>{dataProduitSizeXXL && <p>XXL</p>}</button></div>
            </Fragment>
            );
        

const TailleComponent = stateSize({
    name:'stateSize',
    reducers: {
        // trouver et amener l'état "disponibilité des tailles"
        availableSize: (state) => {
            const size = {
                product: id_product,
                size: taille.id_product,
                // name: action.payload.name,
                // surname: action.payload.surname
            };
        },


    }
},
)
    // const [dataProduct, setDataProduct] = useState([
    //         {int: produit_id},
    //         {text: {taille}, taille_id},
    //         {int: {stock}, produit_id}
    // ]);
export default StockState;

