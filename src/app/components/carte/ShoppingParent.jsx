import React from 'react'
import ShoppingChild from './ShoppingChild'

const ShoppingParent = () => {
  return (
    <div className='flex flex-col place-items-center'>
        <h4 className='mb-5 mt-5 bish-text-blue underline'>Panier</h4>
        <div className='w-1/2 rounded-xl'>
        <ShoppingChild />
        <ShoppingChild lastItem={true} />
        <div className='flex row justify-around w-2/12 bish-bg-gray-shop p-2 rounded bish-text-blue mt-5'>
            <span>Total :</span>
            <span>45 €</span>
        </div>
        </div>
    
    </div>
  )
}

export default ShoppingParent