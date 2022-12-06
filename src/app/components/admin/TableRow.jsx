import React from 'react'
import editIMG from '../../assets/images/edit.png'
import deleteIMG from '../../assets/images/delete.png'
import ModalUpdate from './ModalUpdate';

const TableRow = props => {

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const deleteRow = id => {

  }

  return (
    <tr className='border-b bish-border-gray'>
      {props.element && props.element.map((res, index) => <td key={index} className='truncate hover:text-clip	text-center py-5' title={res}>{res}</td>)}
      <td colSpan='2' className='text-center space-x-5'>
        <button className='bg-orange-500 p-2 bish-text-white font-medium' onClick={() => openModal()}>
          <img className='h-5 lg:h-8' src={editIMG} alt="Modifier"/>
        </button>
        <button className='bg-red-600 p-2 bish-text-white font-medium' onClick={() => deleteRow()}>
          <img className='h-5 lg:h-8' src={deleteIMG} alt="Supprimer"/>
        </button>
      </td>
      <ModalUpdate modalIsOpen={modalIsOpen} openModal={openModal} closeModal={closeModal} formUpdate={props.formUpdate}/>
    </tr>
  )
}

export default TableRow