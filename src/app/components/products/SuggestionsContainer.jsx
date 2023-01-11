import React from 'react'
import ProductCard from './ProductCard';
import { suggestions } from "../../api/backend/product"
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { URL_404 } from '../../constants/urls/urlFrontEnd.js'
import loadingSVG from '../../assets/images/loading-spin.svg'

const SuggestionsContainer = props => {

  const [suggestionsByCateg, setSuggestionsByCateg] = useState([])
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (props.idCategorie !== '-') {
      setIsLoading(true)
      suggestions(props.idCategorie, props.id).then((res) => {
        setIsLoading(false)
        if (res.status === 200){
          setSuggestionsByCateg(res.data)
        } 
      }).catch(error => {
        if (error.response.data["errorCode"] === "003"){
            navigate(URL_404)
        }});
    }
  },[props.id])

  return (
    <>
      {
        suggestionsByCateg[0] &&
        <div>
          {props.idCategorie !== '-' ? <h2 className='text-2xl underline'>Vous Aimerez Aussi</h2> : <></>}
          {
            isLoading ? (<img className='m-auto' src={loadingSVG} alt="Chargement"></img>)
            : 
            (
              <div className='grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6 my-6 lg:mx-24'>
                {suggestionsByCateg.map((r) =><ProductCard update={props.update} key={r.id} produit={r}/> )}
              </div>
              )
            }
            
        </div>
      }
    </>
    
  )
}

export default SuggestionsContainer