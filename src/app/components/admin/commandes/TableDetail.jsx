import React,{useState}  from 'react'
import ModalCrud from '../ModalCrud'
import detailsIMG from '../../../assets/images/detailsIMG.png'
import DetailCommande from './DetailCommande'

const TableDetail = (props) => {

  // State modal Details
  const [modalIsOpen, setIsOpen] = useState(false);

  const [isDelete, setIsDelete] = useState(false);

  // Open modal CREATE
  function openModalDetail() {
    setIsOpen(true);
  }

  // Close modal CREATE
  function closeModalDetail() {
    setIsOpen(false);
    isDelete && props.setReload(!props.reload)
  }

  return (
    <>
      <button className='bish-bg-blue p-2 bish-text-white font-medium' title='Détails de la commande' onClick={()=>openModalDetail()}>
        <img className='h-5 lg:h-8' src={detailsIMG} alt="Details"/>
      </button>
      <ModalCrud modalIsOpen={modalIsOpen} openModal={openModalDetail} closeModal={closeModalDetail} form={<DetailCommande detail={props.detail} setIsDelete={setIsDelete}/>} />
    </>
  )
}

export default TableDetail