import React, {useState, useEffect} from "react";
import { Link, useNavigate } from 'react-router-dom';
import { URL_PRODUCT_LINK } from "../../constants/urls/urlFrontEnd";
import Taille from './Taille';
import StarsComponent from "./StarsComponent";
import { useDispatch } from 'react-redux';
import { addItem } from "../../redux-store/cartSlice";
import { useSelector } from 'react-redux';
import { selectUser } from "../../redux-store/authenticationSlice";
import { selectIsLogged } from './../../redux-store/authenticationSlice';
import { toast } from 'react-toastify'
import { URL_LOGIN } from './../../constants/urls/urlFrontEnd';

// import s3 from "../../bucket_S3/aws" // Disable this import if you use S3 Bucket
const ProductCard = props => {

  const [isClicked, setIsClicked] = useState(false);
  const [drawerDisplay, setDrawerDisplay] = useState("hidden");
  const [opacityStock, setOpacityStock] = useState('');
  const [stockLabelDisplay, setStockLabelDisplay] = useState('hidden');
  const [stockDisplay, setStockDisplay] = useState('flex lg:flex');
  const [stockDisplayResponsive, setStockDisplayResponsive] = useState('');
  const produit = props.produit;
  const [env]= useState(import.meta.env.VITE_NODE_ENV);

  const [inStock, setInStock] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const user = useSelector(selectUser);
  const isLogged = useSelector(selectIsLogged);

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

  const addCart = (product, size) => {
    if(user && user.roles[0] === "ROLE_ADMIN") {
      toast.warn("Un administrateur ne peut pas ajouter de produit à son panier", { position: "top-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light" });
    } else {
      dispatch(addItem({
        id: product.id,
        name: product.name,
        quantity: 1,
        size: size,
        price: product.promotion.id ? product.promotion.price_remise : product.price,
      }))
    }
  }

  return (
    <div>
        <div className={`${drawerDisplay} ${stockDisplayResponsive} bish-bg-gray h-full w-full absolute top-0 left-0 z-10 opacity-50`} onClick={() => toggleDrawer()}/>
        <div className='relative group border-solid border-2 bish-border-gray mb-1 h-96 md:h-64 2xl:h-96'>
          <div className={`${stockLabelDisplay} absolute top-1/2 w-full text-center z-10`}>
            <Link to={`${URL_PRODUCT_LINK}${produit.id}`} className='block w-full h-full'>Plus en stock</Link>
          </div>
          {env === "production" ?
              (
                  props.update ? <Link to={`${URL_PRODUCT_LINK}${produit.id}`} onClick={props.update}><img src={s3.getSignedUrl('getObject', {Bucket: 'awsbish', Key: 'assets/images/products/'+produit.pathImage})} alt="" className={`${opacityStock} object-cover w-full h-full`}/></Link>
              : <Link to={`${URL_PRODUCT_LINK}${produit.id}`}><img src={s3.getSignedUrl('getObject', {Bucket: 'awsbish', Key: 'assets/images/products/'+produit.pathImage})} alt="" className={`${opacityStock} object-cover w-full h-full`}/></Link>
              )
              :
              (
               props.update ? <Link to={`${URL_PRODUCT_LINK}${produit.id}`} onClick={props.update}><img src={window.location.origin + '/src/app/assets/images/products/' + produit.pathImage} alt="" className={`${opacityStock} object-cover w-full h-full`}/></Link>
                   : <Link to={`${URL_PRODUCT_LINK}${produit.id}`}><img src={window.location.origin + '/src/app/assets/images/products/' + produit.pathImage} alt="" className={`${opacityStock} object-cover w-full h-full`}/></Link>
              )
          }
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
                <span className='mx-auto mb-2 text-lg lg:text-base xl:text-lg'>Ajouter au panier</span>
                <div className='w-full gap-1 flex justify-center'>
                  {Object.entries(produit.stockBySize).map(([index, res]) =>
                      <div onClick={() => addCart(produit, res.taille)} key={index} className={`w-1/6 flex justify-center ${ res.taille === "xs" ? "order-1" : res.taille === "s" ? "order-2" : res.taille === "m" ? "order-3" : res.taille === "l" ? "order-4" : res.taille === "xl" && "order-5"}`}>
                          <Taille taille={res} addStock={addStock}/>
                      </div>)}
                </div>
            </div>
        </div>
        <div className={`${opacityStock} flex flex-col`}>
            {produit.noteAverage && <StarsComponent note={produit.noteAverage}/>}
              {(
                props.update ? <Link to={`${URL_PRODUCT_LINK}${produit.id}`} onClick={props.update} className="hover:bish-text-blue hover:font-semibold">{produit.name}</Link>
              : <Link to={`${URL_PRODUCT_LINK}${produit.id}`} className="hover:bish-text-blue hover:font-semibold">{produit.name}</Link>
              )}
            <div>{(props.produit.promotion.length !== 0 ?
                <div>
                    <span className='font-bold line-through text-base sm:text-sm md:text-base bish-text-gray'>{props.produit.price.toFixed(2)}€</span>
                    <span className="font-bold text-xl sm:text-base md:text-xl"> {props.produit.promotion.price_remise.toFixed(2)}€</span>
                </div>
                 :
                <span className='font-bold text-xl'>{props.produit.price.toFixed(2)} €</span>
            )}</div>

            <button className='lg:hidden border-solid border bish-border-gray rounded py-2 mx-5 mt-2' onClick={() => toggleDrawer()}>Ajouter</button>
        </div>
    </div>
  )
}

export default ProductCard