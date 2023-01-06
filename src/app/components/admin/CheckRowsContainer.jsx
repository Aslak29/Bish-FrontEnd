import React, { useState } from 'react'
import apiBackEnd from './../../api/backend/api.Backend';
import loadingSVG from '../../assets/images/loading-spin.svg'
import { useEffect } from 'react';

const CheckRowsContainer = props => {

  const deleteMultipleRows = ids => {
      props.setIsLoading(true)
      apiBackEnd.post(`${props.deleteBackUrl}`, ids).then(res => {
        props.setReload(!props.reload)
    })
  }

  return (
    <>
      {
        (props.rowsCheck.length > 0 && props.isLoading === false) &&
          <div className='flex flex-row border-t-2 bish-border-gray fixed bottom-0 right-0 mt-20 bish-bg-white w-full z-10 py-5'>
            <div className='w-12 sm:w-72'></div>
            <span className='my-auto mr-10'>{props.rowsCheck.length} produits selectionnés</span>
            <button className='p-2 shadow border bish-border-gray mr-10' onClick={() => deleteMultipleRows(props.rowsCheck)}>Supprimer</button>
          </div>
      }
    </>      
  )
}

export default CheckRowsContainer