import React from 'react'
import { Field, Form, Formik, ErrorMessage } from "formik";
import apiBackEnd from '../../../api/backend/api.Backend'
import { URL_BACK_UPDATE_USER } from '../../../constants/urls/urlBackEnd'
import { toast } from 'react-toastify';
import { userUpdateSchema } from '../../../utils/AdminValidationSchema';
import { userUpdateInitialValues } from '../../../utils/AdminInitialValues';


const FormUpdate = props => {

  // UPDATE élément dans la BDD
  const updateRow = (id, values) => {
    if (window.confirm("Êtes-vous sûr de vouloir modifier l'utilisateur ?")) {
        apiBackEnd.put(`${URL_BACK_UPDATE_USER}${id}/${values.name}/${values.surname}/${values.email}/${values.password ? values.password : "-"}/${values.passwordConfirm ? values.passwordConfirm : "-"}/${values.roles}/${values.phone ? values.phone : "-"}`).then(res => {
          if (res.status === 200) {
            props.setReload(!props.reload);
            // Notification succès d'une modification de produit
            toast.success(`Utilisateur ${res.data.id} - ${res.data.name} ${res.data.surname} modifié !`, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light" })
          }
        }).catch(error => {
            // Notification erreur
            toast.error('Une erreur est survenue', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light" });
          }
        )
    }
}
const roles = ['ROLE_ADMIN', 'ROLE_USER']

  return (
     
    <Formik
    initialValues={userUpdateInitialValues(props.user)}
    validationSchema={userUpdateSchema}

    onSubmit={(values) => updateRow(props.user.id,values)}
>
    {formikProps =>
        <Form className="grid grid-cols-2 sm:grid-cols-4 gap-4">        
            {/* Prénom */}
            <div className="flex flex-col h-20">
              <span>Prenom</span>
              <Field className='h-full' type="text" name="name" required/>
              <ErrorMessage name="name" component="small" className='text-red-400'/>
            </div>
            {/* Nom */}
            <div className="flex flex-col ">
              <span>Nom</span>
              <Field className='h-full' type="text" name="surname" required/>
              <ErrorMessage name="surname" component="small" className='text-red-400'/>
            </div>
            {/* Email */}
            <div className="flex flex-col">
                <span>Email</span>
            <Field className='h-full'  type="text" name="email" required/>
            <ErrorMessage name="email" component="small" className='text-red-400'/>
            </div>
            {/* Password */}
            <div className="flex flex-col">
              <span>Password</span>
              <Field className='h-full' type="text" name="password"/>
              <ErrorMessage name="password" component="small" className='text-red-400'/>
            </div>
            {/* Confirmation Password */}
            <div className="flex flex-col">
              <span>Confirm Password</span>
              <Field className='h-full' type="text" name="passwordConfirm"/>
              <ErrorMessage name="passwordConfirm" component="small" className='text-red-400'/>
            </div>
            {/* Rôles */}
            <div className="flex flex-col">
                  <span>Roles</span>
                  <Field className='h-full' name="roles" as="select">
                    {roles.map(resRole => <option key={resRole} value={resRole}>{resRole}</option>)}
                  </Field>
            </div>
            {/* Telephone */}
            <div className="flex flex-col">
                  <span>Telephone</span>
                  <Field className='h-full' type="text" name="phone"/>
                  <ErrorMessage name="phone" component="small" className='text-red-400'/>
            </div>
            {/* Button Modifier */}
            <button type="submit" className="bish-bg-blue py-3 w-full bish-text-white col-span-4 mx-auto">Modifier</button>
        </Form>
    }
</Formik>
  )
}

export default FormUpdate