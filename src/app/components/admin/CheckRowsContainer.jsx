import React from 'react'
import apiBackEnd from './../../api/backend/api.Backend';
import { toast } from 'react-toastify';

const CheckRowsContainer = props => {

  const deleteMultipleRows = ids => {

    let canDeleteRows = true
    let idsNotToDelete = []

    if(props.allIdsToDelete) {
      ids.forEach(idCheck => {
        let invalidDeleteId = true
        props.allIdsToDelete.forEach(idToDelete => {
          if(idCheck === idToDelete) {
            invalidDeleteId = false
          }
        })
        if(invalidDeleteId) {
          idsNotToDelete.push(idCheck)
          canDeleteRows = false
        }
      })
    }

    if (!canDeleteRows) {
      const idPlural = idsNotToDelete.length > 1 ? 'Les ids' : "L'id"
      const msgPlural = idsNotToDelete.length > 1 ? ' ne peuvent pas être supprimés' : " ne peut pas être supprimé"
      idsNotToDelete.length <= 10 ?
      toast.warn(idPlural + idsNotToDelete.map(id => ' ' + id) + msgPlural, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light" })
      : toast.warn(idPlural + idsNotToDelete.slice(0, 10).map(id => ' ' + id) + ' +' + (idsNotToDelete.length - 10) + (idsNotToDelete.length === 11 ? ' autre' : ' autres') + msgPlural, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light" })
    } else {
      props.setIsLoading(true)
      apiBackEnd.post(`${props.deleteBackUrl}`, ids).then(res => {
        props.setReload(!props.reload)
      })
    }
      
  }

  return (
    <>
      {
        (props.rowsCheck.length > 0 && props.isLoading === false) &&
          <div className='flex flex-row border-t-2 bish-border-gray fixed bottom-0 right-0 mt-20 bish-bg-white w-full z-10 py-5'>
            <div className='w-12 sm:w-72'></div>
            <span className='my-auto mr-10'>{props.rowsCheck.length === 1 ? props.rowsCheck.length + ' élément selectionné' : props.rowsCheck.length + ' éléments selectionnés'}</span>
            {props.actions && props.actions}
            <button className='p-2 shadow border bish-border-gray mr-10' onClick={() => deleteMultipleRows(props.rowsCheck)}>Supprimer</button>
          </div>
      }
    </>
  )
}

export default CheckRowsContainer