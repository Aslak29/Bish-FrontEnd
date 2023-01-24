import React, {useState} from "react"
import apiBackEnd from "../../../api/backend/api.Backend";
import {URL_BACK_CODE_PROMOS_UPDATE} from "../../../constants/urls/urlBackEnd";
import {toast} from "react-toastify";
import {codePromotionUpdateInitialValues} from "../../../utils/AdminInitialValues";
import {ErrorMessage, Field, Form, Formik} from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { codepromoSchema } from "../../../utils/AdminValidationSchema";

const FormUpdate  = props => {
    console.log(props.codePromo.startDateEN);
    const [startDate, setStartDate] = useState(new Date(props.codePromo.startDateEN));
    const [endDate, setEndDate] = useState(new Date(props.codePromo.endDateEN));

    const updateRow = (id, values) => {
        if (window.confirm("Êtes-vous sûr de vouloir modifier le code promo ?")) {
            const objet = {
                id: id,
                name: values.name,
                remise: values.remise,
                montantMin: values.montantMin,
                startDate: values.startDate,
                endDate: values.endDate,
                type: values.type
            }
            apiBackEnd.put(URL_BACK_CODE_PROMOS_UPDATE,objet).then(res => {
                if (res.status === 200) {
                    const year = startDate.getFullYear();
                    const day = startDate.getDate();
                    const month = startDate.getMonth()+1;
                    props.updateTable(props.codePromo, values, props.index, startDate.toLocaleDateString("fr").replaceAll('/','-'),endDate.toLocaleDateString("fr").replaceAll('/','-'), startDate.toLocaleTimeString("fr"), endDate.toLocaleTimeString("fr"), year + '-' + month + '-' + day, endDate)
                    // Notification succès d'une modification d'une promotion'
                    toast.success(`Code promo modifiée !`, {
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
                    if(error.response.data["errorCode"] === "035"){
                        toast.warn(error.response.data["errorMessage"], {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light"
                        });
                    } else {
                        // Notification erreur
                        toast.error('Une erreur est survenue', {
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
                }
            )
        }
    }

    const options = ['',5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95];

    return (
        <Formik
            initialValues={codePromotionUpdateInitialValues(props.codePromo,startDate,endDate)}
            validationSchema={codepromoSchema}
            onSubmit={(values) => updateRow(props.codePromo.id, values)}
        >
            {formikProps =>
                <Form className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {/* Remise */}
                    <div className="flex flex-col h-20">
                        <span>Nom</span>
                        <Field type="text" name="name" placeholder="Nom" required/>
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
                        <Field type="number" name="remise" id="remise" list="remises"/>
                        <datalist id="remises">
                            {options.map((option) => (
                            <option key={option} value={option}>{option}</option>
                            ))}
                        </datalist>
                        <ErrorMessage name="remise" component="small" className="text-red-400"/>
                    </div>

                    <div className="flex flex-col h-20">
                        <span>Montant Minimum</span>
                        <Field type="number" name="montantMin" placeholder="Montant min"/>
                        <ErrorMessage name="montantMin" component="small" className="text-red-400"/>
                    </div>


                    <div className="flex flex-col h-20">
                        <span>Date de début</span>
                        <DatePicker dateFormat="dd-MM-yyyy HH:mm" selected={startDate} name="startDate" onChange={(date) => {setStartDate(date); formikProps.setFieldValue('startDate', date)} } showTimeSelect/>
                        <ErrorMessage name="startDate" component="small" className="text-red-400"/>
                    </div>

                    <div className="flex flex-col h-20">
                        <span>Date de fin</span>
                        <DatePicker dateFormat="dd-MM-yyyy HH:mm" selected={endDate} name="endDate" onChange={(date) => {setEndDate(date); formikProps.setFieldValue('endDate', date)}} showTimeSelect/>
                        <ErrorMessage name="endDate" component="small" className="text-red-400"/>
                    </div>
                                    
                    {/* Button Modifier */}
                    <button type="submit"
                            className="bish-bg-blue py-3 w-full bish-text-white col-span-3 mx-auto">Modifier
                    </button>
                </Form>
            }
        </Formik>
    )
}

export default FormUpdate