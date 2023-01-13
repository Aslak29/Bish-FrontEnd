import React from 'react'
import Modal from 'react-modal';
import { Field, Form, Formik, ErrorMessage } from "formik"
import { addressInitialValues } from '../../utils/ClientInitialValues'

const ModalAdresses = props => {

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

    Modal.defaultStyles.overlay.backgroundColor = 'rgba(88, 80, 80, 0.5)'
    Modal.setAppElement(document.getElementById('root'));

    const createAddress = values => {
      console.log(values)
    }

    const updateAddress = values => {
      console.log(values)
    }

    return (
        <Modal isOpen={props.modalIsOpen} onRequestClose={props.closeModal} style={customStyles} contentLabel="Example Modal" >
            <Formik
                initialValues={addressInitialValues}
                // validationSchema={productCreateSchema}
                onSubmit={values => props.type === 'create' ? createAddress(values) : props.type === 'update' && updateAddress(values)}
            >
                <Form className='p-5 space-y-2'>
                    <h5 className='mb-5'>Ajouter une adresse :</h5>
                    {/* Nom */}
                    <div className="flex flex-col">
                      <span>Nom</span>
                      <Field type="text" name="name"/>
                      <ErrorMessage name="name" component="small" className="text-red-400"/>
                    </div>
                    {/* Ville */}
                    <div className="flex flex-col">
                      <span>Ville</span>
                      <Field type="text" name="city"/>
                      <ErrorMessage name="city" component="small" className="text-red-400"/>
                    </div>
                    {/* Code postal */}
                    <div className="flex flex-col">
                      <span>Code postal</span>
                      <Field type="text" name="cp"/>
                      <ErrorMessage name="cp" component="small" className="text-red-400"/>
                    </div>
                    {/* Numéro de rue */}
                    <div className="flex flex-col">
                      <span>Numéro</span>
                      <Field type="text" name="num"/>
                      <ErrorMessage name="num" component="small" className="text-red-400"/>
                    </div>
                    {/* Rue */}
                    <div className="flex flex-col">
                      <span>Rue</span>
                      <Field type="text" name="rue"/>
                      <ErrorMessage name="rue" component="small" className="text-red-400"/>
                    </div>
                    {/* Complément d'adresse */}
                    <div className="flex flex-col">
                      <span>Complément d'adresse</span>
                      <Field type="text" name="complement"/>
                      <ErrorMessage name="complement" component="small" className="text-red-400"/>
                    </div>
                    {/* Button Ajouter */}
                    <button type="submit" className="bish-bg-blue py-3 w-full bish-text-white">Ajouter</button>
                </Form>
            </Formik>
        </Modal>
    )
}

export default ModalAdresses