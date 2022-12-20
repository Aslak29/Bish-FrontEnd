import React,{useState}  from 'react'
import ModalCrud from '../ModalCrud'
import detailsIMG from '../../../assets/images/detailsIMG.png'
import DetailCommande from './DetailCommande'

const TableDetail = (props) => {
     // State modal Details
  const [modalIsOpen, setIsOpen] = useState(false);

          // Open modal CREATE
          function openModal() {
            setIsOpen(true);
          }
        
          // Close modal CREATE
          function closeModal() {
            setIsOpen(false);
          }

  return (
    <button className='bish-bg-blue p-2 bish-text-white font-medium' title={"Impossible de modifier des demandes de contact"} onClick={()=>openModal()}>
    <img className='h-5 lg:h-8' src={detailsIMG} alt="Details"/>
    <ModalCrud modalIsOpen={modalIsOpen} openModal={openModal} closeModal={closeModal} form={<DetailCommande detail={props.detail}/>} />
    </button>
  )
}

export default TableDetail