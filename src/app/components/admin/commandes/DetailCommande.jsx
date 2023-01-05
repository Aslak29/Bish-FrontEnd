import React, { useState } from 'react'

const DetailCommande = (props) => {

    const [detailCommande] = useState(props.detail.produitInCommande)

    return (
      <div className='space-y-4'>
        {detailCommande.map(res =>
            <div className='shadow pr-4 flex flex-row items-center gap-x-9 justify-between h-40' key={res.id}>
                    <img className='object-contain h-full w-32'
                         src={window.location.origin + '/src/app/assets/images/products/' + res.image}
                         alt={res.nomProduit}
                    />
                    <div className='flex flex-col h-16 justify-between'>
                        <span className='font-bold'>Nom :</span>
                        <span className='mb-2'>{res.name}</span>
                    </div>
                    <div className='flex flex-col h-16 justify-between'>
                        <span className='font-bold'>Taille :</span>
                        <span className='mb-2'>{res.taille.toUpperCase()}</span>
                    </div>
                    <div className='flex flex-col h-16 justify-between'>
                        <span className='font-bold'>Quantité :</span>
                        <span className='mb-2'>{res.quantite}</span>
                    </div>
                    <div className='flex flex-col h-16 justify-between'>
                        <span className='font-bold'>Prix :</span>
                        <span className='mb-2'>{res.price} €</span>
                    </div>
                    <div className='flex flex-col h-16 justify-between'>
                        <span className='font-bold'>Remise :</span>
                        <span className='mb-2'>{res.remise} %</span>
                    </div>
                    <div className='flex flex-col h-16 justify-between'>
                        <span className='font-bold'>Total :</span>
                        <span className='mb-2'>{res.total} €</span>
                    </div>
            </div>  
        )}
      </div>
    )
}

export default DetailCommande;
