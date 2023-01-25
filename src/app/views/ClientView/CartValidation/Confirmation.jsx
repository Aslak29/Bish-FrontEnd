import React, { useEffect } from 'react'
import { useStep } from './CartOutletValidation';
import {useLocation} from "react-router-dom";

const Confirmation = () => {

  const { setStep } = useStep();
  const { state } = useLocation();

  useEffect(() => {
    setStep(4)
  },[])

  return (
    <div className={"m-auto my-12 text-xl container-404 flex flex-col space-y-14 place-items-center bg-white border-solid border-2 rounded-3xl bish-border-gray sm:mt-20 w-3/4"}>
      <span>🎉 Merci de votre achat 🎉</span>
      <span> Votre commande n°{state.idCommande} a bien été prise en compte </span>

    </div>
  )
}

export default Confirmation