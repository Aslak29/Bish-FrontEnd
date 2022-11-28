import React from 'react'
import ProductCard from './ProductCard';

const SuggestionsContainer = () => {
  return (
    <div>
        <h2 className='text-2xl underline'>Vous Aimerez Aussi</h2>
        <div className='flex flex-row space-x-6 my-6 mx-24'>
            {/* TODO: GET RANDOM 4 PRODUITS DE LA MEME CATEGORIE */}
            <ProductCard stock={true}/>
            <ProductCard stock={true}/>
            <ProductCard stock={true}/>
            <ProductCard stock={true}/>
        </div>
    </div>
  )
}

export default SuggestionsContainer