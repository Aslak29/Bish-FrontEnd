import React from 'react'
import Modal from 'react-modal';

const ModalCrud = props => {

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          maxHeight: '80%'
        },
    };
    
    Modal.defaultStyles.overlay.zIndex = '40'
    Modal.defaultStyles.overlay.backgroundColor = 'rgba(88, 80, 80, 0.5)'
    Modal.setAppElement(document.getElementById('root'));

    return (
        <Modal
            isOpen={props.modalIsOpen}
            onRequestClose={props.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
            {props.form}
        </Modal>
    )
}

export default ModalCrud