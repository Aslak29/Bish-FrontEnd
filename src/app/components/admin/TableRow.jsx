import React from 'react'
import editIMG from '../../assets/images/edit.png'
import deleteIMG from '../../assets/images/delete.png'
import ModalCrud from './ModalCrud';

const TableRow = props => {

  // State modal UPDATE
  const [modalIsOpen, setIsOpen] = React.useState(false);

  // Open modal UPDATE
  function openModal() {
    setIsOpen(true);
  }

  // Close modal UPDATE
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <tr className='border-b bish-border-gray'>
      {props.element && props.element.map((res, index) => <td key={index} className='truncate hover:text-clip	text-center py-5' title={res}>{res}</td>)}
      <td colSpan='2' className='text-center space-x-5'>
        <button className='bg-orange-500 p-2 bish-text-white font-medium' onClick={() => openModal()}>
          <img className='h-5 lg:h-8' src={editIMG} alt="Modifier"/>
        </button>
        <button className='bg-red-600 p-2 bish-text-white font-medium' onClick={() => props.deleteRow(props.element[0])}>
          <img className='h-5 lg:h-8' src={deleteIMG} alt="Supprimer"/>
        </button>
      </td>
      <ModalCrud modalIsOpen={modalIsOpen} openModal={openModal} closeModal={closeModal} form={props.formUpdate}/>
    </tr>
  )
}

export default TableRow