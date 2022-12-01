import React, {useEffect, useState} from 'react'
import PromoCard from '../../components/products/PromoCard';
import { promotions } from "../../api/backend/product"


const PromoContainer = () => {

    const [promotion, setPromotion] = useState([])

    useEffect(() => {
        promotions().then((res) => {
            if (res.status === 200){
                setPromotion(res.data)
            }
        })},[])


  return (
    <div className='space-y-6'>
        <div>
        <span className='font-medium text-xl underline'>
            Nos promotions
        </span>
        </div>

        <div className='grid grid-rows-2 grid-cols-2 md:grid-rows-1 md:grid-cols-4 gap-6'>
            {promotion.map((r) => <PromoCard key={r.id} {...r}/>)}
        </div>
    </div>
  )
}

export default PromoContainer