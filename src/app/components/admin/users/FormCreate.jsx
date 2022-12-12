import React from 'react'
import { Field, Form, Formik } from "formik"
// import apiBackEnd from '../../../api/backend/api.Backend'
// import { URL_BACK_CREATE_PRODUCT } from '../../../constants/urls/urlBackEnd'

function FormCreate() {
  return (
    <Formik
    initialValues={{
    name: '',
    surname: '',
    email: '',
    password:'',
    confirmpassword:'',
    roles: '',
    telephone: '',
    created_at: '',
    
    }}
    onSubmit={(values) => createRow(values)}
>
    {formikProps =>
        <Form className="grid grid-cols-2 sm:grid-cols-4 gap-4">        
            {/* Nom */}
            <div className="flex flex-col h-20">
              <span>Prenom</span>
              <Field className='h-full' type="text" name="name" required/>
            </div>
            {/* Description */}
            <div className="flex flex-col col-span-2 row-span-2">
              <span>Nom</span>
              <Field className='h-full' as="textarea" type="text" name="surname" required/>
            </div>
            {/* Preview de l'image */}
            <div className="preview row-span-4 h-96 shadow-lg">
                <span>Email</span>
            <Field className='h-full' as="textarea" type="text" name="email" required/>
            </div>
            {/* Prix */}
            <div className="flex flex-col h-20">
              <span>Password</span>
              <Field className='h-full' type="number" name="password" required/>
            </div>
            {/* Stock */}
            <div className="flex flex-row h-20">
                  <span>Roles</span>
                  <Field className='h-full' type="number" name="roles" required/>
            </div>
            {/* Catégorie */}
            <div className="flex flex-row h-20">
                  <span>Telephone</span>
                  <Field className='h-full' type="number" name="telephone" required/>
            </div>
            {/* Promotion */}
            <div className="flex flex-row h-20">
                  <span>Crée le</span>
                  <Field className='h-full' type="number" name="created_at" required/>
            </div>
            {/* Button Modifier */}
            <button type="submit" className="bish-bg-blue py-3 w-full bish-text-white col-span-4 mx-auto">Ajouter</button>
        </Form>
    }
</Formik>
  )
}

export default FormCreate