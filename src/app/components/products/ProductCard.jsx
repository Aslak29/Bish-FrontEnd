import React, {useState, useEffect} from "react";
import image from '../../assets/images/products/example.png'
import { Link } from 'react-router-dom';

const ProductCard = props => {

  const [isClicked, setIsClicked] = useState(false);
  const [drawerDisplay, setDrawerDisplay] = useState("hidden");
  const [opacityStock, setOpacityStock] = useState('');
  const [stockLabelDisplay, setStockLabelDisplay] = useState('hidden');
  const [stockDisplay, setStockDisplay] = useState('flex lg:flex');
  const [stockDisplayResponsive, setStockDisplayResponsive] = useState('');

  const toggleDrawer = () =>{
    setIsClicked(!isClicked);
    if(!isClicked){
      setDrawerDisplay('block')
    }else{
      setDrawerDisplay('hidden')
    }
  }

  useEffect(() => {
    if(!props.stock) {
      setOpacityStock('opacity-50')
      setStockLabelDisplay('block')
      setStockDisplay('hidden')
      setStockDisplayResponsive('hidden')
    }
  },[])

  return (
    <div>
        <div className={`${drawerDisplay} ${stockDisplayResponsive} bish-bg-gray h-full w-full absolute top-0 left-0 z-10 opacity-50`} onClick={() => toggleDrawer()}/>
        <div className='relative group border-solid border-2 bish-border-gray'>
          <div className={`${stockLabelDisplay} absolute top-1/2 w-full text-center z-10`}>
            <span>Plus en stock</span>
          </div>
            <Link>
              <img src={image} alt="" className={`${opacityStock}`}/>
            </Link>
            {/* Triangle promotion */}
            {(props.promo > 0 && 
              <div className="triangle absolute top-0 right-0 opacity-95">
                <div className='rotate-45 absolute top-3 -right-16 sm:top-1 sm:-right-14 md:top-2 md:-right-16 lg:top-2 lg:-right-16 xl:top-3 xl:-right-20 2xl:top-4 2xl:-right-24'>
                  <span className='bish-text-white sm:text-sm md:text-lg lg:text-xl 2xl:text-2xl font-bold'>{props.promo}%</span>
                </div>
              </div>
            )}
            {/* Hover ajouter au panier */}
            <div className={`${drawerDisplay} ${stockDisplay} border-t-2 lg:border-0 bish-border-gray py-10 z-20 fixed left-0 flex-col lg:absolute bottom-0 lg:invisible lg:group-hover:visible lg:h-1/3 w-full bish-bg-white lg:opacity-90 justify-center`}>
                <span className='mx-auto'>Ajouter au panier</span>
                {/* TODO: Ajouter le composant taille */}
                <span className='mx-auto'>COMPOSANT TAILLE</span>
            </div>
        </div>
        <div className={`${opacityStock} flex flex-col`}>
            {/* TODO: Ajouter le composant note */}
            <span>COMPOSANT NOTE</span>
            <Link>Blouson uni matelassée</Link>
            <span className='font-bold'>29.00 €</span>
            <button className='lg:hidden border-solid border bish-border-gray rounded py-2 mx-5 mt-2' onClick={() => toggleDrawer()}>Ajouter</button>
        </div>
        {/* Drawer mobile */}
    </div>
  )
}

export default ProductCard