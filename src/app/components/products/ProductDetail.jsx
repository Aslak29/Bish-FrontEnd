import React from 'react'
import caddie from "../../assets/images/caddie.png";
import {Helmet} from "react-helmet-async";
const ProductDetail = (props) => {

    return (
            <div className="flex flex-col lg:flex-row justify-center bish-bg-product-detail rounded-lg">
                <Helmet>
                    <title>Bish - {props.name}</title>
                    <meta name="description" content={props.description}/>
                </Helmet>


                <div className="p-7 w-3/4 md:w-3/5 lg:w-1/3 h-96 md:h-full w-fit m-auto">
                    <img className="w-full h-full object-cover border-solid border-2 bish-border-gray" src={window.location.origin + '/src/app/assets/images/products/' + props.pathImage} alt={props.name}/>
                    {/*TODO: ajouter la source du produits*/}
                </div>


                <div className="p-8 md:w-5/6 w-full w-11/12 m-auto lg:m-0 relative md:pt-10 -z-0">
                    <div className="flex">
                        <h1 className="text-2xl  md:text-3xl lg:text-4xl">{props.name}</h1>
                        <div className="flex items-center ml-5">
                            Note
                            {/*TODO: ajouter le component Note ici*/}
                        </div>
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
                    <div className="text-left text-sm md:text-lg">
                        {props.description}
                    </div>
                    <div className="mb-40 mt-8">
                        <p className="text-sm md:text-lg bish-text-blue">Tailles :</p>
                        {/*TODO: ajouter le component Tailles ici*/}
                    </div>
                    <div className="flex justify-end absolute bottom-10 right-10">
                        <button className="flex items-center bish-bg-blue rounded-xl bish-text-white shadow-lg p-3">Ajouter <img className="h-4 ml-3" src={caddie} alt=""/></button></div>
                    </div>
            </div>
    )
}

export default ProductDetail;