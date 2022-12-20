import React from 'react'
import saveIMG from '../../../assets/images/save.png'
import deleteIMG from '../../../assets/images/delete.png'

const DetailCommande = (props) => {
    const detailCommande = props.detail.produitInCommande
    console.log(detailCommande)

    return (
      <div className='space-y-4'>
        {detailCommande.map(res =>
            <div className='flex flex-row h-40 items-center gap-x-4 justify-between shadow pr-4' key={res.id}>
                <img className='object-contain h-full w-32' src={window.location.origin + '/src/app/assets/images/products/' + res.image} alt={res.nomProduit}/>
                <div className='flex flex-col'>
                    <span className='font-bold'>Nom :</span>
                    <span>{res.name}</span>
                </div>
                <div className='flex flex-col'>
                    <span className='font-bold'>Taille :</span>
                    <span>{res.taille}</span>
                </div>
                <div className='flex flex-col'>
                    <span className='font-bold'>Quantité :</span>
                    <span>{res.quantite}</span>
                </div>
                <div className='flex flex-col'>
                    <span className='font-bold'>Prix :</span>
                    <span>{res.price}</span>
                </div>
                <div className='flex flex-col'>
                    <span className='font-bold'>Prix :</span>
                    <span>{res.price}</span>
                </div>
                <div className='flex flex-col'>
                    <span className='font-bold'>Prix :</span>
                    <span>{res.price}</span>
                </div>
                <span>Remise : {res.remise}</span>
                <span>Total : {res.total}</span>
                <button className='bg-green-500 p-2 bish-text-white font-medium'
                        onClick={() => props.deleteRow(props.element[0])}>
                    <img className='h-5 lg:h-8' src={saveIMG} alt="Supprimer"/>
                </button>
                <button className='bg-red-600 p-2 bish-text-white font-medium'>
                    <img className='h-5 lg:h-8' src={deleteIMG} alt="Supprimer"/>
                </button>
            </div>
        )}
      </div>
    )
}

export default DetailCommande