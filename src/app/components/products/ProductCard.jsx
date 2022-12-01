import React, {useState, useEffect} from "react";
import image from '../../assets/images/products/example.png'
import { Link } from 'react-router-dom';
import { URL_PRODUCT_LINK } from "../../constants/urls/urlFrontEnd";
import Taille from './Taille';

const ProductCard = props => {

  const [isClicked, setIsClicked] = useState(false);
  const [drawerDisplay, setDrawerDisplay] = useState("hidden");
  const [opacityStock, setOpacityStock] = useState('');
  const [stockLabelDisplay, setStockLabelDisplay] = useState('hidden');
  const [stockDisplay, setStockDisplay] = useState('flex lg:flex');
  const [stockDisplayResponsive, setStockDisplayResponsive] = useState('');
  const produit = props.produit;

  const [inStock, setInStock] = useState(false);

  const toggleDrawer = () =>{
    setIsClicked(!isClicked);
    if(!isClicked){
      setDrawerDisplay('block')
    }else{
      setDrawerDisplay('hidden')
    }
  }

  useEffect(() => {
    if(!inStock) {
      setOpacityStock('opacity-50')
      setStockLabelDisplay('block')
      setStockDisplay('hidden')
      setStockDisplayResponsive('hidden')
    } else {
      setOpacityStock('opacity-100')
      setStockLabelDisplay('hidden')
      setStockDisplay('flex lg:flex')
      setStockDisplayResponsive('block')
    }
  },[inStock])

  const addStock = stock => {
    if (stock > 0) {
      setInStock(true)
    }
  }

  return (
    <div>
        <div className={`${drawerDisplay} ${stockDisplayResponsive} bish-bg-gray h-full w-full absolute top-0 left-0 z-10 opacity-50`} onClick={() => toggleDrawer()}/>
        <div className='relative group border-solid border-2 bish-border-gray'>
          <div className={`${stockLabelDisplay} absolute top-1/2 w-full text-center z-10`}>
            <Link to={`${URL_PRODUCT_LINK}${produit.id}`} className='block w-full h-full'>Plus en stock</Link>
          </div>
          {(
                props.update ? <Link to={`${URL_PRODUCT_LINK}${produit.id}`} onClick={props.update}><img src={image} alt="" className={`${opacityStock}`}/></Link>
              : <Link to={`${URL_PRODUCT_LINK}${produit.id}`}><img src={image} alt="" className={`${opacityStock}`}/></Link>
              )}
            {/* Triangle promotion */}
            {(props.produit.promotion.length !== 0 &&
              <div className="triangle absolute top-0 right-0 opacity-95">
                <div className='rotate-45 absolute top-3 -right-16 sm:top-1 sm:-right-14 md:top-2 md:-right-16 lg:top-2 lg:-right-16 xl:top-3 xl:-right-20 2xl:top-4 2xl:-right-24'>
                  <span className='bish-text-white sm:text-sm md:text-lg lg:text-xl 2xl:text-2xl font-bold'>{props.produit.promotion.remise}%</span>
                </div>
              </div>
            )}
            {/* Hover ajouter au panier */}
            <div className={`${drawerDisplay} ${stockDisplay} border-t-2 lg:border-0 bish-border-gray pt-10 pb-12 z-20 fixed left-0 flex-col lg:absolute bottom-0 lg:invisible lg:group-hover:visible lg:h-1/3 w-full bish-bg-white-opacity-90 justify-center`}>
                <span className='mx-auto mb-2 text-lg'>Ajouter au panier</span>
                <span className='w-full flex flex-row space-x-2 px-5 justify-center'>
                  {Object.entries(produit.stockBySize).map(([index, res]) => <Taille key={index} taille={res} addStock={addStock}/>)}
                </span>
            </div>
        </div>
        <div className={`${opacityStock} flex flex-col`}>
            {/* TODO: Ajouter le composant note */}
            <span>COMPOSANT NOTE</span>
              {(
                props.update ? <Link to={`${URL_PRODUCT_LINK}${produit.id}`} onClick={props.update} className="hover:bish-text-blue hover:font-semibold">{produit.name}</Link>
              : <Link to={`${URL_PRODUCT_LINK}${produit.id}`} className="hover:bish-text-blue hover:font-semibold">{produit.name}</Link>
              )}
            <div>{(props.produit.promotion.length !== 0 ?
                <div>
                    <span className='font-bold line-through bish-text-gray'>{props.produit.price}€</span>
                    <span className="font-bold text-xl"> {props.produit.promotion.price_remise}€</span>
                </div>
                 :
                <span className='font-bold'>{props.produit.price} €</span>
            )}</div>

            <button className='lg:hidden border-solid border bish-border-gray rounded py-2 mx-5 mt-2' onClick={() => toggleDrawer()}>Ajouter</button>
        </div>
    </div>
  )
}

export default ProductCard