import React, { useEffect } from 'react'
import { useStep } from './CartOutletValidation';

const Confirmation = () => {

  const { setStep } = useStep();

  useEffect(() => {
    setStep(4)
  },[])

  return (
    <div>Confirmation</div>
  )
}

export default Confirmation