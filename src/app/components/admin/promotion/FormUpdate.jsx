import React, {useState} from "react"
import apiBackEnd from "../../../api/backend/api.Backend";
import {URL_BACK_UPDATE_PROMOTION} from "../../../constants/urls/urlBackEnd";
import {toast} from "react-toastify";
import {promotionUpdateInitialValues} from "../../../utils/AdminInitialValues";
import {ErrorMessage, Field, Form, Formik} from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FormUpdate = props => {

    const [startDate, setStartDate] = useState(new Date(props.promotion.start_date.split(" ")[0]));
    const [endDate, setEndDate] = useState(new Date(props.promotion.end_date.split(" ")[0]));

    const updateRow = (id, values) => {

        if (window.confirm("Êtes-vous sûr de vouloir modifier la promotion ?")) {
            apiBackEnd.post(`${URL_BACK_UPDATE_PROMOTION}${id}/${values.remise}/${startDate.toLocaleDateString("fr").replaceAll('/','-')}/${endDate.toLocaleDateString("fr").replaceAll('/','-')}`).then(res => {
                if (res.status === 200) {
                    props.updateTable(props.promotion, values, props.index, startDate.toLocaleDateString("fr").replaceAll('/','-'),endDate.toLocaleDateString("fr").replaceAll('/','-'))
                    // Notification succès d'une modification d'une promotion'
                    toast.success(`La promotion ${res.data.id} - a été modifié!`, {
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
                    console.log(error);
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
            )
        }
    }

    return (
        <Formik
            initialValues={promotionUpdateInitialValues(props.promotion,startDate,endDate)}
            onSubmit={(values) => updateRow(props.promotion.id, values)}
        >
            <Form className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {/* Remise */}
                <div className="flex flex-col h-20">
                    <span>Remise</span>
                    <Field type="number" name="remise" placeholder="Remise en %" required/>
                    <ErrorMessage name="name" component="small" className="text-red-400"/>
                </div>

                <div className="flex flex-col h-80">
                    <span>Date de début</span>
                    <DatePicker selected={startDate} name="startDate" onChange={(date) => setStartDate(date)} required />
                    <ErrorMessage name="name" component="small" className="text-red-400"/>
                </div>

                <div className="flex flex-col h-20">
                    <span>Date de fin</span>
                    <DatePicker selected={endDate} name="endDate" onChange={(date) => setEndDate(date)} required/>
                    <ErrorMessage name="name" component="small" className="text-red-400"/>
                </div>

                {/* Button Modifier */}
                <button type="submit"
                        className="bish-bg-blue py-3 w-full bish-text-white col-span-4 mx-auto">Modifier
                </button>
            </Form>
        </Formik>
    )
}
export default FormUpdate