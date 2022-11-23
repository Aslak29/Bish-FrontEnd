import React from 'react'
import QuestionFaq from './../../components/QuestionFaq';
import {Helmet} from "react-helmet";

const FAQView = () => {

  const questions = [
    {
      question: "Quels modes d'expédition existe-t-il ?",
      answer: "DHL se charge de la livraison"
    },
    {
      question: "Livrez-vous également à l'étranger ?",
      answer: "La livraison de nos colis s'effectue en France métropolitaine, y compris la Corse et Monaco, à l’exclusion des DOM-TOM. La conclusion du contrat s'effectue en français et vous recevrez tous les documents en français."
    },
    {
      question: "Dans quel délai puis-je retourner ma commande ?",
      answer: "Vous pouvez retourner chaque article que vous avez acheté dans la boutique en ligne Street One dans les 42 jours suivant sa réception, en faisant valoir votre droit de révocation légal."
    },
    {
      question: "Les transactions sont-elles sécurisées ?",
      answer: "Toutes nos transaction sont protégés par le processeur de paiement Stripe Payments Europe, Ltd"
    },
    {
      question: "Puis-je modifier ma commande ?",
      answer: "Veuillez noter que nous ne pouvons apporter des modifications à votre commande que si cette dernière n'a pas encore été expédiée. Si vous souhaitez modifier quoi que ce soit dans votre commande, veuillez nous contacter dans les 6 heures après avoir passé votre commande. Si la commande a été expédiée, nous ne pouvons plus apporter de modifications à votre commande."
    },
    {
      question: "Comment puis-je suivre mon colis ?",
      answer: "Vous pouvez suivre votre colis dans votre espace client, section Suivi de commande"
    },
    {
      question: "J'ai oublié mon mot de passe, comment me connecter à mon compte ?",
      answer: "Lorsque vous cliquez sur le lien mot de passe oublié, veuillez renseigner votre adresse email qui a servi à la création de votre compte. Nous vous enverrons instantanément un lien pour réinitialiser votre mot de passe."
    },
    {
      question: "Que dois-je faire si je ne suis pas chez moi au moment de la livraison ?",
      answer: "Un avis de passage sera déposé dans votre boîte aux lettres. Cet avis indique l’heure et le jour de passage ainsi que le bureau de poste dans lequel vous pouvez retirer le colis. Vous devrez alors vous présenter au bureau de poste indiqué, muni de la fiche de passage déposée par le facteur et d’une pièce d’identité pour le retirer. Vous disposez alors d’un délai de 10 jours ouvrables (au-delà, le colis nous sera retourné)."
    },
    {
      question: "Que dois-je faire si je ne reçois pas ma commande ?",
      answer: "Si vous n’avez toujours pas reçu votre colis après 5 jours ouvrables et qu’aucun avis de passage ne vous a été déposé, pensez à vérifier la situation de votre colis sur le site de la poste. Vous pouvez également nous contacter via notre page de contact."
    }

  ]
  return (
    <div className='w-11/12 sm:w-3/4 m-auto space-y-6 my-6'>
      <h1 className='text-center mb-10'>Foire aux questions</h1>
      {questions.map((res, i) => <QuestionFaq key={i} question={res.question} answer={res.answer}/>)}
    </div>
  )
}

export default FAQView