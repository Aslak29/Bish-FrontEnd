import React from "react";
import caddie from "../../assets/images/caddie.png";
import { Helmet } from "react-helmet-async";
import Taille from "./Taille";
import StarsComponent from "./StarsComponent";

const ProductDetail = (props) => {
  return (
    <div className="flex flex-col lg:flex-row justify-center bish-bg-product-detail rounded-lg">
      <Helmet>
        <title>Bish - {props.name}</title>
        <meta name="description" content={props.description} />
      </Helmet>

      <div className="p-7 w-3/4 md:w-3/5 lg:w-1/3 h-96 md:h-full w-fit m-auto">
        <img
          className="w-full h-full object-cover border-solid border-2 bish-border-gray"
          src={
            window.location.origin +
            "/src/app/assets/images/products/" +
            props.pathImage
          }
          alt={props.name}
        />
        {/*TODO: ajouter la source du produits*/}
      </div>
            <div className="p-8 md:w-5/6 w-full w-11/12 m-auto lg:m-0 relative md:pt-10 -z-0">
                <div className="flex flex-col sm:flex-row">
                    <h1 className="text-2xl  md:text-3xl lg:text-4xl">{props.name}</h1>
                    {props.noteAverage &&
                        <div className="flex items-center sm:ml-5">
                            <StarsComponent note={props.noteAverage} />
                        </div>
                    }
                </div>
                <div className="pt-5 pb-3 bish-text-blue text-sm md:text-2xl">

                    <div>
                        {(props.promotion.length !== 0 ?
                            <div>
                                <span className='line-through'>{props.price}€</span>
                                <span className='font-semibold text-3xl'> {props.promotion.price_remise}€</span>
                            </div>
                            :
                            <span>{props.price} €</span>
                    )}</div>
                </div>
                <div className="text-left text-sm md:text-lg">{props.description}</div>
                <div className="mb-40 mt-8">
                    <p className="text-sm md:text-lg bish-text-blue">Tailles :</p>
                    <div className='w-full lg:w-1/2 mt-4 flex gap-2'>
                        {Object.entries(props.stockBySize).map(([index, res]) =>
                            <div key={index} className={`w-1/6 flex justify-center ${ res.taille === "xs" ? "order-1" : res.taille === "s" ? "order-2" : res.taille === "m" ? "order-3" : res.taille === "l" ? "order-4" : res.taille === "xl" && "order-5"}`}>
                                <Taille taille={res} addStock={false}/>
                            </div>)}
                    </div>
                </div>
                <div className="flex justify-end absolute bottom-10 right-10">
                    <button className="flex items-center bish-bg-blue rounded-xl bish-text-white shadow-lg p-3">
                        Ajouter <img className="h-4 ml-3" src={caddie} alt=""/>
                    </button>
                </div>
            </div>
      </div>
    )
}

export default ProductDetail;