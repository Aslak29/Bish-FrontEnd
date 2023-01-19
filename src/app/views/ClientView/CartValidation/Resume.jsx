import React, { useEffect } from 'react'
import { useStep } from './CartOutletValidation';

const Resume = () => {

  const { setStep } = useStep();

  useEffect(() => {
    setStep(3)
  },[])

  return (
    <div>Resume</div>
  )
}

export default Resume