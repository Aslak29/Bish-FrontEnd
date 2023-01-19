import React, { useEffect } from 'react'
import { useStep } from './CartOutletValidation';

const Resume = () => {

  const { setStep } = useStep();

  useEffect(() => {
    setStep(3)
  },[])

  return (
    <div>
      {/* Adresse de livraisonn */}
      {/* Adresse de facturation */}
      {/* Moyen de paiement */}
      {/* Listes de produits avec taille quantité prixremise */}
      {/* - le code promo */}
      {/* Total */}
      {/* Bouton payer */}
    </div>
  )
}

export default Resume