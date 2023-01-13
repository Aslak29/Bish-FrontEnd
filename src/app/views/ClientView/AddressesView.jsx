import React from 'react'
import Addresses from '../../components/client/Addresses'

const AddressesView = () => {
    return (
      <div className='w-4/5 sm:w-8/12 mx-auto'>
        <h5 className='mb-5'>Mes adresses :</h5>
        <Addresses />
      </div>
    )
}

export default AddressesView