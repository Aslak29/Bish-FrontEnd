import React from 'react'
import { Field, Form, Formik, ErrorMessage } from "formik"
import apiBackEnd from '../../../api/backend/api.Backend'
import { URL_BACK_CREATE_USER } from '../../../constants/urls/urlBackEnd'
import { toast } from 'react-toastify';
import { userSchema } from '../../../utils/AdminValidationSchema';
import { userCreateInitialValues } from '../../../utils/AdminInitialValues';

const FormCreate = props => {

      // CREATE élément dans la BDD
      const createRow = (values) => {
        if (window.confirm("Êtes-vous sûr de vouloir ajouter un utilisateur ?")) {
        apiBackEnd.post(`${URL_BACK_CREATE_USER}${values.name}/${values.surname}/${values.email}/${values.password}/${values.passwordConfirm}/${values.roles}/${values.phone}`).then(res => {
            props.setReload(!props.reload);
            props.close();
            toast.success(`L'Utilisateur ${res.data.id} - ${res.data.name} ${res.data.surname} a été ajouté!`, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light" })
        })
        }
    }
      const roles = ["ROLE_ADMIN", "ROLE_USER"]

  return (
    
    <Formik
    initialValues={userCreateInitialValues}
    validationSchema={userSchema}
    
    onSubmit={(values) => createRow(values)}
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
            <div className="flex flex-col h-20">
              <span>Password</span>
              <Field className='h-full' type="text" name="password" required/>
              <ErrorMessage name="password" component="small" className='text-red-400'/>
            </div>
            {/* Confirmation Password */}
            <div className="flex flex-col h-20">
              <span>Confirm Password</span>
              <Field className='h-full' type="text" name="passwordConfirm" required/>
              <ErrorMessage name="passwordConfirm" component="small" className='text-red-400'/>
            </div>
            {/* Rôles */}
            <div className="flex flex-col h-20">
                  <span>Roles</span>
                  <Field className='h-full' type="text" name="roles" as="select" required>
                  {roles.map(resRole => <option key={resRole} value={resRole}>{resRole}</option>)}
                  </Field>
            </div>
            {/* Telephone */}
            <div className="flex flex-col h-20">
                  <span>Telephone</span>
                  <Field className='h-full' type="text" name="phone" required/>
                  <ErrorMessage name="phone" component="small" className='text-red-400'/>
            </div>
            {/* Button Validé */}
            <button type="submit" className="bish-bg-blue py-3 w-full bish-text-white col-span-4 mx-auto">Ajouter</button>
        </Form>
    }
</Formik>
  )
}

export default FormCreate