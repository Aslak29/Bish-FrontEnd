import React, {useState} from "react"
import apiBackEnd from "../../../api/backend/api.Backend";
import {URL_BACK_CREATE_PROMOTION} from "../../../constants/urls/urlBackEnd";
import {toast} from "react-toastify";
import {ErrorMessage, Field, Form, Formik} from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {promotionCreateInitialValues} from "../../../utils/AdminInitialValues";
import {promotionCreateSchema} from "../../../utils/AdminValidationSchema";

const FormCreate = props => {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState();
    const createRow = (values) => {
        if (window.confirm("Êtes-vous sûr de vouloir ajouter la promotion ?")) {
            apiBackEnd.post(`${URL_BACK_CREATE_PROMOTION}${values.remise}/${startDate.toLocaleDateString("fr").replaceAll('/','-')}/${endDate.toLocaleDateString("fr").replaceAll('/','-')}`).then(res => {
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
    return (
        <Formik
            initialValues={promotionCreateInitialValues()}
            onSubmit={(values) => createRow(values)}
        >
            <Form className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {/* Remise */}
                <div className="flex flex-col h-20">
                    <span>Remise</span>
                    <Field type="number" name="remise" placeholder="Remise en %"/>
                    <ErrorMessage name="name" component="small" className="text-red-400"/>
                </div>

                <div className="flex flex-col h-80">
                    <span>Date de début</span>
                    <DatePicker selected={startDate}  name="startDate" onChange={(date) => setStartDate(date)} showTimeSelect/>
                    <ErrorMessage name="name" component="small" className="text-red-400"/>
                </div>

                <div className="flex flex-col h-20">
                    <span>Date de fin</span>
                    <DatePicker selected={endDate} name="endDate" onChange={(date) => setEndDate(date)} showTimeSelect/>
                    <ErrorMessage name="name" component="small" className="text-red-400"/>
                </div>

                {/* Button Modifier */}
                <button type="submit"
                        className="bish-bg-blue py-3 w-full bish-text-white col-span-4 mx-auto">Ajouter
                </button>
            </Form>
        </Formik>
    )
}
export default FormCreate