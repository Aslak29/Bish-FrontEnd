import React from 'react'
import ProductCard from './ProductCard';
import { suggestions } from "../../api/backend/product"
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { URL_404 } from '../../constants/urls/urlFrontEnd.js'

const SuggestionsContainer = props => {

  const [suggestionsByCateg, setSuggestionsByCateg] = useState([])
  const navigate = useNavigate();
  const [updateSuggests, setUpdateSuggests] =  useState(false);


  useEffect(() => {
    if (props.idCategorie !== '-') {
      suggestions(props.idCategorie).then((res) => {
        if (res.status === 200){
          setSuggestionsByCateg(res.data)
        } 
      }).catch(error => {
        if (error.response.data["errorCode"] === "003"){
            navigate(URL_404)
        }});
    }
  },[updateSuggests])

  //Permet de relancer le useEffect pour changer le contenu de SuggestionsContainer au clic sur une ProductCard
  const updateSuggestionsComponent = () => {
    setUpdateSuggests(!updateSuggests)
    props.update()
  };    

  return (
    <div>
      {props.idCategorie !== '-' ? <h2 className='text-2xl underline'>Vous Aimerez Aussi</h2> : <></>}
        <div className='flex flex-row space-x-6 my-6 mx-24'>
            {suggestionsByCateg.map((r) => <ProductCard update={updateSuggestionsComponent} key={r.id} produit={r}/>)}
        </div>
    </div>
  )
}

export default SuggestionsContainer