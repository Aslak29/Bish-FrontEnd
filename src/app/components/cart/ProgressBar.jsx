import React from 'react'
import { Link } from 'react-router-dom'
import { URL_CART_LIVRAISON, URL_CART_PAIEMENT, URL_CART_RESUME } from '../../constants/urls/urlFrontEnd';

const ProgressBar = props => {

    const step = props.step

    const stepStyle = 'flex flex-col place-items-center w-14'
    
    const roundStepStyle = 'rounded-full border bish-border-gray w-10 h-10 bish-text-gray font-medium text-lg text-center leading-10'
    const roundStepStyleActive = 'rounded-full bish-bg-blue w-10 h-10 bish-text-white font-medium text-lg text-center leading-10'
    const roundStepStyleComplete = 'rounded-full border bish-border-blue w-10 h-10 bish-text-blue font-medium text-lg text-center leading-10'

    const barStyle = 'w-32 h-1 bish-bg-product-detail -translate-y-3 flex-1'
    const barStyleComplete = 'w-32 h-1 bish-bg-blue -translate-y-3 flex-1'

    return (
        <div className='flex flex-row place-items-center px-10'>
            <div className={stepStyle}>
                <div className={step === 1 ? roundStepStyleActive : step > 1 ? roundStepStyleComplete : roundStepStyle}>1</div>
                {
                    step > 1 && step < 4 ?
                    <Link to={URL_CART_LIVRAISON} className='bish-text-blue'>Livraison</Link>
                    :
                    <span className={step >= 1 ? 'bish-text-blue' : 'bish-text-gray'}>Livraison</span>
                }
            </div>
            <div className={step > 1 ? barStyleComplete : barStyle} />
            <div className={stepStyle}>
                <div className={step === 2 ? roundStepStyleActive : step > 2 ? roundStepStyleComplete : roundStepStyle}>2</div>
                {
                    step > 2 && step < 4 ?
                    <Link to={URL_CART_PAIEMENT} className='bish-text-blue'>Paiement</Link>
                    :
                    <span className={step >= 2 ? 'bish-text-blue' : 'bish-text-gray'}>Paiement</span>
                }
            </div>
            <div className={step > 2 ? barStyleComplete : barStyle} />
            <div className={stepStyle}>
                <div className={step === 3 ? roundStepStyleActive : step > 3 ? roundStepStyleComplete : roundStepStyle}>3</div>
                {
                    step > 3 && step < 4 ?
                    <Link to={URL_CART_RESUME} className='bish-text-blue'>Résumé</Link>
                    :
                    <span className={step >= 3 ? 'bish-text-blue' : 'bish-text-gray'}>Résumé</span>
                }
            </div>
            <div className={step > 3 ? barStyleComplete : barStyle} />
            <div className={stepStyle}>
                <div className={step === 4 ? roundStepStyleActive : step > 4 ? roundStepStyleComplete : roundStepStyle}>4</div>
                <span className={step >= 4 ? 'bish-text-blue' : 'bish-text-gray'}>Confirmation</span>
            </div>
        </div>
    )
}

export default ProgressBar