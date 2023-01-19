import React, {useState} from "react"
import apiBackEnd from "../../../api/backend/api.Backend";
import {URL_BACK_CREATE_PROMOTION} from "../../../constants/urls/urlBackEnd";
import {toast} from "react-toastify";
import {ErrorMessage, Field, Form, Formik} from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {codePromotionCreateInitialValues} from "../../../utils/AdminInitialValues";
import {promotionSchema} from "../../../utils/AdminValidationSchema";

const FormCreate  = props => {
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const createRow = (values) => {
        if (window.confirm("Êtes-vous sûr de vouloir ajouter la promotion ?")) {
            apiBackEnd.post(`${URL_BACK_CREATE_PROMOTION}${values.name}/${values.remise}/${startDate.toLocaleDateString("fr").replaceAll('/','-') + startDate.toLocaleTimeString("fr")}/${endDate.toLocaleDateString("fr").replaceAll('/','-') + endDate.toLocaleTimeString("fr")}`).then(res => {
                if (res.status === 200) {
                    props.setReload(!props.reload)
                    props.close()
                    // Notification succès d'un ajout de produit
                    toast.success(`La promotion a été ajoutée !`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light"
                    })
                }
            }).catch(error => {
                    // Notification erreur
                    toast.warn('Une erreur est survenue', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light"
                    });
                }
            )
        }
    }

    const options = ['',5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95];

    return (
        <Formik
            initialValues={codePromotionCreateInitialValues}
            validationSchema={promotionSchema}
            onSubmit={(values) => createRow(values)}
        >
            {formikProps =>
                <Form className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {/* Remise */}
                    <div className="flex flex-col h-20">
                        <span>Nom</span>
                        <Field type="text" name="name" placeholder="Nom"/>
                        <ErrorMessage name="name" component="small" className="text-red-400"/>
                    </div>
                    <div className="flex flex-col h-20">
                        <span>Type</span>
                        <Field as="select" name="type" id="type">
                        <option value="">-</option>
                        <option value="pourcent">%</option>
                        <option value="euro">€</option>
                        </Field>
                        <ErrorMessage name="type" component="small" className="text-red-400"/>
                    </div>

                    <div className="flex flex-col h-20">
                        <span>Remise</span>
                        <Field type="text" name="remise" id="remise" list="remises"/>
                        <datalist id="remises">
                            {options.map((option) => (
                            <option key={option} value={option}>{option}</option>
                            ))}
                        </datalist>
                        <ErrorMessage name="remise" component="small" className="text-red-400"/>
                    </div>

                    <div className="flex flex-col h-20">
                        <span>Montant Minimum</span>
                        <Field type="text" name="montantmin" placeholder="Montant min"/>
                        <ErrorMessage name="montantmin" component="small" className="text-red-400"/>
                    </div>

                    <div className="flex flex-col h-20">
                        <span>Date de début</span>
                        <DatePicker selected={startDate}  name="startDate" onChange={(date) => {setStartDate(date); formikProps.setFieldValue('startDate', date)} } showTimeSelect/>
                        <ErrorMessage name="startDate" component="small" className="text-red-400"/>
                    </div>

                    <div className="flex flex-col h-20">
                        <span>Date de fin</span>
                        <DatePicker selected={endDate} name="endDate" onChange={(date) => {setEndDate(date); formikProps.setFieldValue('endDate', date)}} showTimeSelect/>
                        <ErrorMessage name="endDate" component="small" className="text-red-400"/>
                    </div>

                    {/* Button Modifier */}
                    <button type="submit"
                            className="bish-bg-blue py-3 w-full bish-text-white col-span-3 mx-auto">Ajouter
                    </button>
                </Form>
            }
        </Formik>
    )
}

export default FormCreate