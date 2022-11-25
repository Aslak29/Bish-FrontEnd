import React from 'react'
import PromoCard from '../../components/products/PromoCard';

const PromoContainer = () => {
  return (
    <div className='space-y-6'>
        <div>
        <span className='font-medium text-xl underline'>
            Nos promotions
        </span>
        </div>

        <div className='grid grid-rows-2 grid-cols-2 sm:grid-rows-1 sm:grid-cols-4 gap-6'>
            <PromoCard/>
            <PromoCard/>
            <PromoCard/>
            <PromoCard/>
        </div>
    </div>
  )
}

export default PromoContainer