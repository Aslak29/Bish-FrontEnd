import React from "react";
import { Field, Form, Formik, ErrorMessage } from "formik"
import contact from "../../assets/images/contact.svg";
import {URL_BACK_ADD_CONTACT} from "../../constants/urls/urlBackEnd";
import apiBackEnd from "../../api/backend/api.Backend";
import {Helmet} from "react-helmet-async";
import { contactSchema } from "../../utils/ClientValidationSchema";
import { ToastContainer, toast } from 'react-toastify'
import { selectUser } from "../../redux-store/authenticationSlice";
import { useSelector } from 'react-redux';
import { contactInitialValues } from './../../utils/ClientInitialValues';

const ContactView = () => {

  const user = useSelector(selectUser)

  return (
    <div className="flex  justify-center mt-6 my-6 w-full">
      <Helmet>
        <title>Bish - Contact</title>
        <meta name="description" content="Notre service contact pour nous contacter rapidement !" data-react-helmet="true"/>
      </Helmet>
      <ToastContainer/>
      <div className="flex content-center justify-center flex-row border-2 border-black rounded-3xl w-4/5 h-auto">

        {/* -----------------------------Image--------------------------------------  */}

        <div className="hidden lg:flex flex-col justify-center items-center bish-bg-blue-opacity border-t rounded-l-3xl w-full gap-y-2">
          <p>Utilisez notre formulaire de contact</p>
          <img
            className="hidden lg:block w-3/4 border-b-2	bish-border-blue "
            src={contact}
            alt="Contact"
          /><br/>
          <p>Ou contactez nous directement:</p><br/>
          <p>Par e-mail: bishincubateur@gmail.com</p><br/>
          <p>Par téléphone: 03 12 34 56 78</p>
        </div>

        {/* -----------------------------Formulaire--------------------------------------  */}

        <div className="w-full flex flex-col justify-center content-center ">
          <h3 className="pt-12 text-center">Contactez-nous!</h3>
          <Formik
            initialValues={contactInitialValues(user ? user : null)}
            validationSchema={contactSchema}
            onSubmit={(values, { resetForm }) => {
                const resObj = {
                  name: values.name,
                  surname: values.surname,
                  email: values.email,
                  message: values.message,
                  phone: values.phone,
                  userId: user ? user.id : null
                }
                apiBackEnd.post(URL_BACK_ADD_CONTACT , resObj).then(r => {
                    if (r.status === 200){
                      resetForm()
                      toast.success("Le message a bien été envoyé !", { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light" })
                    }
                  }).catch(error => {
                    console.log(error)
                    toast.warn('Une erreur est survenue', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light" });
                })
              } 
            }
          >
            <Form className="flex justify-center w-full">
              
              <div className="flex justify-center flex-col rounded-md pt-10 pb-10 w-3/4 h-full gap-y-2">
                <div className="w-full flex flex-col gap-y-2 ">
                  <div className="flex flex-col justify-center h-96 sm:h-72 gap-x-2 gap-y-8 sm:gap-y-20 sm:grid sm:grid-rows-4 sm:grid-cols-2">

                    {/* -----------------------------NOM--------------------------------------- */}
                    <div>
                      <div className={`input-div group h-min `}>
                        <Field name="surname" className="input peer h-10 pl-2"/>
                        <span className="label">Nom</span>
                      </div>
                      <ErrorMessage name="surname" component="small" className="text-red-400"/>
                    </div>
                    {/* -----------------------------PRENOM--------------------------------------- */}
                    <div>
                      <div className={`input-div group h-min`}>
                        <Field name="name" className="input peer h-10 pl-2"/>
                        <span className="label">Prénom</span>
                      </div>
                      <ErrorMessage name="name" component="small" className="text-red-400"/>
                    </div>
                    {/* -----------------------------EMAIL--------------------------------------- */}            
                    <div>
                      <div className={`input-div group h-min`}>
                        <Field name="email" className="input peer h-10 pl-2" autoComplete="off"/>
                        <span className="label">Adresse e-mail</span>
                      </div>
                      <ErrorMessage name="email" component="small" className="text-red-400"/>
                    </div>
                    {/* -----------------------------TELEPHONE--------------------------------------- */}
                    <div>
                      <div className={`input-div group h-min`}>
                        <Field name="phone" className="input peer h-10 pl-2" autoComplete="off"/>
                        <span className="label">Numéro</span>
                      </div>
                      <ErrorMessage name="phone" component="small" className="text-red-400"/>
                    </div>
                    {/* -----------------------------MESSAGE--------------------------------------- */}
                    <div className="col-span-2 h-24 sm:h-28">
                      <div className={`input-div group h-full`}>
                        <Field
                          as="textarea"
                          name="message"
                          className="input peer h-full pl-2"
                          autoComplete="off"
                        />
                        <span className="label group-focus-within:-translate-y-9 peer-valid:-translate-y-9">Message</span>
                      </div>
                      <ErrorMessage name="message" component="small" className="text-red-400"/>
                    </div>
                  </div>
                </div>
                  
                {/* -----------------------------SUBMIT--------------------------------------- */}
                <div className="w-full h-16 flex flex-col justify-center mt-8">
                  <button
                    type="submit"
                    className="col-span-2 bish-bg-blue rounded-3xl w-full bish-text-white shadow-lg h-10"
                  >
                    Envoyer
                  </button>
                </div><br/>
                <div className="lg:hidden">
                  <p >Vous pouvez également nous contacter directement:</p>
                  <p className="font-light">Par e-mail: contact@bish.fr</p>
                  <p className="font-light">Par téléphone: 03 12 34 56 78</p>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>  )
}

export default ContactView