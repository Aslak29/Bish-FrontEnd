import React, { useEffect } from 'react'
import { useStep } from './CartOutletValidation';

const Paiement = () => {

  const { setStep } = useStep();

  useEffect(() => {
    setStep(2)
  },[])

  return (
    <div>Paiement</div>
  )
}

export default Paiement