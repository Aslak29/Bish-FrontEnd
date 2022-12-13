import React from 'react'
import { Field, Form, Formik } from "formik";
import apiBackEnd from '../../../api/backend/api.Backend'
import { URL_BACK_UPDATE_USER } from '../../../constants/urls/urlBackEnd'
import { toast } from 'react-toastify';


const FormUpdate = props => {

  // UPDATE élément dans la BDD
  const updateRow = (id, values) => {
    if (window.confirm("Êtes-vous sûr de vouloir modifier le produit ?")) {
        apiBackEnd.post(`${URL_BACK_UPDATE_USER}${id}/${values.name}/${values.surname}/${values.email}/${values.password}/${values.passwordConfirm}/${values.roles}/${values.phone}`).then(res => {
          if (res.status === 200) {
            props.setReload(!props.reload);
            // Notification succès d'une modification de produit
            toast.success(`L'utilisateur ${res.data.id} - ${res.data.name} ${res.data.surname} a été modifié!`, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light" })
          }
        }).catch(error => {
            console.log(error);
            // Notification erreur
            toast.error('Une erreur est survenue', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light" });
          }
        )
    }
}

  return (
     
    <Formik
    initialValues={{
    name: props.user.name,
    surname: props.user.surname,
    email: props.user.email,
    password: '',
    passwordConfirm: '',
    roles: props.user.roles,
    phone: props.user.phone,
    
    }}

    
    onSubmit={(values) => updateRow(props.user.id,values)}
>
    {formikProps =>
        <Form className="grid grid-cols-2 sm:grid-cols-4 gap-4">        
            {/* Nom */}
            <div className="flex flex-col h-20">
              <span>Prenom</span>
              <Field className='h-full' type="text" name="name" required/>
            </div>
            {/* Description */}
            <div className="flex flex-col ">
              <span>Nom</span>
              <Field className='h-full' type="text" name="surname" required/>
            </div>
            {/* Preview de l'image */}
            <div className="preview row-span-4 h-96 shadow-lg">
                <span>Email</span>
            <Field className='h-full'  type="text" name="email" required/>
            </div>
            {/* Prix */}
            <div className="flex flex-col h-20">
              <span>Password</span>
              <Field className='h-full' type="text" name="password" required/>
            </div>
            <div className="flex flex-col h-20">
              <span>Confirm Password</span>
              <Field className='h-full' type="text" name="passwordConfirm" required/>
            </div>
            {/* Stock */}
            <div className="flex flex-row h-20">
                  <span>Roles</span>
                  <Field className='h-full' type="text" name="roles" required/>
            </div>
            {/* Catégorie */}
            <div className="flex flex-row h-20">
                  <span>Telephone</span>
                  <Field className='h-full' type="text" name="phone" required/>
            </div>
            {/* Button Modifier */}
            <button type="submit" className="bish-bg-blue py-3 w-full bish-text-white col-span-4 mx-auto">Modifier</button>
        </Form>
    }
</Formik>
  )
}

export default FormUpdate