import React, {useEffect} from "react";
import { Field, Form, Formik } from "formik";
import {Link, useNavigate} from "react-router-dom";
import { useState } from "react";
import contact from "../../assets/images/contact.svg";
import {URL_HOME, URL_LOGIN} from "../../constants/urls/urlFrontEnd";
import {URL_BACK_ADD_CONTACT} from "../../constants/urls/urlBackEnd";
import apiBackEnd from "../../api/backend/api.Backend";

const ContactView = () => {
  const navigate = useNavigate();
  const [name, hasName] = useState(false);
  const [surname, hasSurname] = useState(false);
  const [email, hasEmail] = useState(false);
  const [phone, hasPhone] = useState(false);
  const [messageLength, hasMessageLength ] = useState(false);

  return (
    <div className="flex  justify-center mt-6 my-6 ">
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
          <p>Par e-mail: contact@bish.fr</p><br/>
          <p>Par téléphone: 03 12 34 56 78</p>
        </div>

{/* -----------------------------Formulaire--------------------------------------  */}

        <div className="w-full flex flex-col justify-center content-center ">
          <h3 className="pt-12 text-center">Contactez-nous!</h3>
          <Formik
            initialValues={{
              name: "",
              surname: "",
              email: "",
              message: "",
              phone:""
            }}
            validate={(values) => {
              /^([a-zA-Z ]+)$/.test(values.name) ? hasName(false) : hasName(true);
              /^([a-zA-Z ]+)$/.test(values.surname) ? hasSurname(false) : hasSurname(true);
              /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)$/.test(values.email)? hasEmail(false) : hasEmail(true);
              /^[0-9]{10}$/.test(values.phone)? hasPhone(false) : hasPhone(true);
              values.message.length > 50 ? hasMessageLength(false) : hasMessageLength(true);
            }}
             
            onSubmit={(values,{ resetForm, setErrors, setSubmitting, handleRegister } ) => {
              let errors = {};
              if (name) errors.name = "Pas de chiffre dans votre prénom";
              if (surname) errors.surname = "Pas de chiffre dans votre nom";
              if (email) errors.email = "Votre email n'est pas valide";
              if (phone) errors.phone = "Vous devez entrer 10 chiffres";
              if (messageLength) errors.message = "Votre message doit contenir au minimum 50 caractères";

//  -----------------------------??????????????????????????????-------------------------------------- 

              if (
                Object.entries(errors).length === 0 &&
                errors.constructor === Object
              ) {
                apiBackEnd.post(URL_BACK_ADD_CONTACT + `/${values.name}/${values.surname}/${values.email}/${values.message}/${values.phone}`).then(r => {
                    if (r.status === 200){
                      resetForm();
                      console.log(r);
                    }
                  }).catch(error => {
                    setErrors(errors);
                    console.log(error);
                })
              } else {
                setErrors(errors);
              }
              setSubmitting(false);
            }}
//  -----------------------------??????????????????????????????-------------------------------------- 

          >
            {({ errors, values, handleChange, handleSubmit, isSubmitting }) => (
              <Form
                className="flex justify-center w-full"
                onSubmit={handleSubmit}
              >
                
                <div className="flex justify-center flex-col rounded-md pt-10 pb-10 w-3/4 h-full gap-y-2">
                  <div className="w-full flex flex-col gap-y-2 ">
                    <div className="flex flex-col justify-center h-64 gap-x-2 gap-y-2 sm:grid sm:grid-rows-4 sm:grid-cols-2">

{/* -----------------------------NOM--------------------------------------- */}

                      <Field
                        name="surname"
                        placeholder="Nom"
                        className={
                          "col-span-1 h-10 input " + `${errors.surname && "border-red-500"}`
                        }
                        onChange={handleChange}
                        required
                        value={values.surname}
                      />
                      {errors.surname && (
                        <p className="text-red-500 text-xs italic">
                          {errors.surname}
                        </p>
                      )}
{/* -----------------------------PRENOM--------------------------------------- */}

                      <Field
                        name="name"
                        placeholder="Prénom"
                        className={
                          "col-span-1 h-10 input " + `${errors.name && "border-red-500"}`
                        }
                        onChange={handleChange}
                        required
                        value={values.name}
                      />
                        {errors.name && (
                          <p className="text-red-500 text-xs italic">{errors.name}</p>
                        )}
{/* -----------------------------EMAIL--------------------------------------- */}

                      <Field
                        name="email"
                        placeholder="Adresse e-mail"
                        className={
                          "col-span-1 h-10 input " + `${errors.email && "border-red-500"}`
                        }
                        onChange={handleChange}
                        required
                        value={values.email}
                        autoComplete="off"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs italic">
                          {errors.email}
                        </p>
                      )} 
{/* -----------------------------TELEPHONE--------------------------------------- */}

                      <Field
                        name="phone"
                        placeholder="Numéro"
                        className={
                          "col-span-1 h-10 input " + `${errors.phone && "border-red-500"}`
                        }
                        onChange={handleChange}
                        value={values.phone}
                        autoComplete="off"
                        required
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs italic">
                          {errors.phone}
                        </p>
                      )} 

{/* -----------------------------MESSAGE--------------------------------------- */}

                    <Field
                      name="message"
                      placeholder="Message"
                      className={
                        "input col-span-2 w-full h-24 sm:h-28  " + `${errors.message && "border-red-500"}`
                      }
                      onChange={handleChange}
                      required
                      value={values.message}
                      autoComplete="off"
                    />
                     {errors.message && (
                      <p className="text-red-500 text-xs italic">
                        {errors.email}
                      </p>
                    )} 
                  </div>
                    </div>
                    
{/* -----------------------------SUBMIT--------------------------------------- */}
                  <div className="w-full h-12 flex flex-col justify-center pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
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
            )}
          </Formik>
        </div>
      </div>
    </div>  )
}

export default ContactView