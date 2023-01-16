import React from 'react'

const RecentOrders = () => {
  return (
    <div className='p-5'>
      <h5 className='mb-2'>Commande Récente :</h5>
      <table className='w-full text-center table-fixed'>
        <thead className='bish-bg-blue bish-text-white'>
          <tr>
            <th>Nom du Produit</th>
            <th>Stock du Produit</th>
            <th>Paiement</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody  className='bish-bg-product-detail'>
          <tr className='border-b-2'>
            <td className='truncate'>T-Shirt Homme</td>
            <td className='truncate'>85464</td>
            <td className='truncate'>Due</td>
            <td className='truncate'>En Cours de Livraison</td>
          </tr>
          <tr className='border-b-2'>
            <td>T-Shirt Homme</td>
            <td>85464</td>
            <td>Due</td>
            <td>En Cours de Livraison</td>
          </tr>
          <tr className='border-b-2'>
            <td>T-Shirt Homme</td>
            <td>85464</td>
            <td>Due</td>
            <td>En Cours de Livraison</td>
          </tr>
        </tbody>
      </table>

    </div>
  )
}

export default RecentOrders