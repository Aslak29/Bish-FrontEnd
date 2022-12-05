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
    
    Modal.setAppElement('#root');

    return (
        <Modal
            isOpen={props.modalIsOpen}
            onRequestClose={props.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <form className='grid grid-cols-3 gap-4'>
                <input type="text" />
                <input type="text" />

                <input type="text" />

                <input type="text" />

                <input type="text" />

                <input type="text" />

            </form>
        </Modal>
    )
}

export default ModalUpdate