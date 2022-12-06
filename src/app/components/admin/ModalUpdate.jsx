import React from 'react'
import Modal from 'react-modal';

const ModalUpdate = props => {

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
    };

    const inputStyle = ''
    
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
            {props.formUpdate}
        </Modal>
    )
}

export default ModalUpdate