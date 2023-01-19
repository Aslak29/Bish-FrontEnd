import React, { useState } from "react";
import trash from "../../assets/images/trash.png";
import { useDispatch } from 'react-redux';
import { removeItem, updateItemQuantity } from '../../redux-store/cartSlice';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../../assets/styles/components/overlay.css';
import checkIMG from '../../assets/images/check.png'

const ShoppingChild = props => {

  const product = props.product
  const dispatch = useDispatch()

  const [quantity, setQuantity] = useState(product.quantity)
  const [readNewPrice, setReadNewPrice] = useState(product.newPrice ? false : true)
  const [readNewStock, setReadNewStock] = useState(product.newStock ? false : true)

  const removeInCart = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui bish-bg-blue bish-text-white p-5 text-center rounded-xl space-y-5'>
            <h5 className="font-medium">Êtes-vous sûr ?</h5>
            <p>Voulez-vous supprimer le produit {product.name} {product.size.toUpperCase()} de votre panier ?</p>
            <div className="flex flex-row gap-5 justify-center">
              <button className="bish-bg-white text-black p-2 rounded bish-text-white flex-1" onClick={onClose}>Non</button>
              <button className="bish-bg-white text-black p-2 rounded bish-text-white flex-1"
                onClick={() => {
                  dispatch(removeItem({
                    id: product.id,
                    size: product.size
                  }))
                  props.remove(product.id, product.size)                
                  onClose();
                }}
              >
                Oui
              </button>
            </div> 
          </div>
        );
      },
      overlayClassName: "bish-bg-overlay"
    });
  }

  const incrementQuantity = () => {
    if(quantity < product.maxQuantity) {
      dispatch(updateItemQuantity({
        id: product.id,
        size: product.size,
        quantity: quantity + 1
      }))
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if(quantity > 1) {
      dispatch(updateItemQuantity({
        id: product.id,
        size: product.size,
        quantity: quantity - 1
      }))
      setQuantity(quantity - 1)
    }
  }

  return (
    <div className={`bish-bg-gray-shop w-full m-auto ${product.quantity < 1 && 'opacity-50'}`}>
      <div className={`flex flex-col pt-5 mx-10 ${!props.lastItem && "border-b bish-border-gray"} ${((readNewPrice && readNewStock) || product.quantity < 1) && 'pb-5'}`}>
        <div className="flex flex-row justify-around text-center items-center">
          <img className="w-1/12" src={window.location.origin + '/src/app/assets/images/products/' + product.pathImage} alt={product.name} />
          <span className="flex-1">{product.name}</span>
          {
            product.price_remise ?
            <span className="bish-text-blue flex-1 font-medium"><span className="line-through">{product.price} €</span> <span className="text-lg">{product.price_remise} €</span></span>
            :
            <span className="bish-text-blue flex-1 font-medium text-lg">{product.price} €</span>
          }
          <div className="flex-1">
            <div className="rounded box-border h-8 p-1 px-4 text-center bish-bg-blue bish-text-white w-2/4 m-auto">
              <span>{product.size.toUpperCase()}</span>
            </div>
          </div>
          {
            product.quantity > 0 ?
            <>
              <div className="flex-1">
                <div className="gap-5 flex flex-row">
                  <button className="bish-bg-product-detail px-2" onClick={() => decrementQuantity()}>-</button>
                  <span className="block bish-bg-product-detail px-6">{quantity}</span>
                  <button className="bish-bg-product-detail px-2" onClick={() => incrementQuantity()}>+</button>
                </div>
              </div>
              <button onClick={() => removeInCart()}>
                <img className="my-auto h-5" src={trash} alt="Supprimer" />
              </button>
            </>
            :
            <span className="flex-1 font-bold text-lg">Plus en stock</span>
          }
          
        </div>
        {
          (!readNewPrice && product.quantity > 0) &&
          <div className="w-full bish-bg-blue-opacity p-1 flex flex-row justify-center place-items-center gap-5">
            <span>Attention ! Le prix a changé depuis l'ajout à votre panier</span>
            <button onClick={() => setReadNewPrice(true)}>
              <img className="h-5" src={checkIMG} alt="Confirmer nouveau prix" />
            </button>
          </div>
        }
        {
          (!readNewStock && product.quantity > 0) &&
          <div className="w-full bish-bg-blue-opacity p-1 flex flex-row justify-center place-items-center gap-5">
            <span>Attention ! La quantité maximale a changé depuis l'ajout à votre panier</span>
            <button onClick={() => setReadNewStock(true)}>
              <img className="h-5" src={checkIMG} alt="Confirmer nouveau prix" />
            </button>
          </div>
        }   
      </div>
    </div>
  );
}

export default ShoppingChild;
