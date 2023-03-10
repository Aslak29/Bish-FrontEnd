import React, {useEffect, useState} from 'react'
import apiBackEnd from "../../api/backend/api.Backend";
import {URL_BACK_DELETE_PROMOTION, URL_BACK_PROMOS} from "../../constants/urls/urlBackEnd";
import {toast, ToastContainer} from "react-toastify";
import {Helmet} from "react-helmet-async";
import loadingSVG from "../../assets/images/loading-spin.svg";
import TableRow from "../../components/admin/TableRow";
import TitleContainer from "../../components/admin/TitleContainer";
import TableHeadSort from "../../components/admin/TableHeadSort";
import FormCreate from "../../components/admin/promotion/FormCreate";
import FormUpdate from "../../components/admin/promotion/FormUpdate";
import CheckboxRow from './../../components/admin/CheckboxRow';
import CheckRowsContainer from './../../components/admin/CheckRowsContainer';
import { URL_BACK_MULTIPLE_DELETE_PROMOTION } from './../../constants/urls/urlBackEnd';
import TableHeadCheckbox from './../../components/TableHeadCheckbox';

const AdminPromotionsView = () => {

    // Style
    const headSort = 'flex py-5 justify-center items-center space-x-2 cursor-pointer'
    const labelHeader = 'truncate hover:text-clip'

    // Contenu d'un ligne de la table (sans les keys, que les datas)
    const [rows, setRows] = useState([])

    const [modalIsOpen, setIsOpen] = useState(false);

    // Formulaire UPDATE
    const [formUpdate, setFormUpdate] = useState([])

    // SVG isLoading si requête en cours
    const [isLoading, setIsLoading] = useState(false);

    // Formulaire CREATE
    const [formCreate, setFormCreate] = useState()

    // Reload table
    const [reload, setReload] = useState(false);

    const [rowsCheck, setRowsCheck] = useState([])
    const [allPromosId, setAllPromosId] = useState([])
    
    useEffect(() => {
        setRows([])
        setFormUpdate([])
        setRowsCheck([])
        setAllPromosId([])
        // Permet d'afficher le SVG de chargement
        setIsLoading(true)
        // Récupération des données
        apiBackEnd.get(URL_BACK_PROMOS).then(respArr => {
            // Set le contenu d'une row (à mettre dans l'ordre voulu)
            respArr.data.map(res => setAllPromosId(current => [...current, res.id]))
            respArr.data.map((res, index) => setRows(current => [...current, [
                <CheckboxRow id={res.id} setRowsCheck={setRowsCheck} />,
                res.id,
                res.name,
                res.remise,
                new Date(res.start_date).toLocaleDateString().replaceAll('/','-')+' '+ new Date(res.start_date).toLocaleTimeString(),
                new Date(res.end_date).toLocaleDateString().replaceAll('/','-') +' '+ new Date(res.end_date).toLocaleTimeString(),
            ]]))

            respArr.data.map((res, index) => {
                // Formulaire UPDATE
                setFormUpdate(current => [...current,
                    <FormUpdate promotion={res} index={index} updateTable={updateTable}/>
                ])
            })

            // Formulaire CREATE
            setFormCreate(
                <FormCreate reload={reload} setReload={setReload} close={closeModal}/>
            )
            // Fin du chargement
            setIsLoading(false)
        })
    }, [reload])

    const updateTable = (promotion,values, index, startDate, startEnd, startTime, endTime, startFullDate, endFullDate)=> {

        promotion.name = values.name
        promotion.remise = values.remise
        promotion.start_date = startFullDate + ' ' + startTime
        promotion.end_date = startEnd + ' ' + endTime

        // Modifier la row concernée par l'update
        setFormUpdate(current=> [
            ...current.slice(0, index),
            <FormUpdate promotion={promotion} index={index} updateTable={updateTable}/>,
            ...current.slice(index+1)
        ])
        setRows(current => [
            ...current.slice(0, index),
            [
                <CheckboxRow id={promotion.id} setRowsCheck={setRowsCheck} />,
                promotion.id,
                promotion.name,
                promotion.remise,
                startDate + ' ' + startTime,
                startEnd + ' ' + endTime,
               ],
            ...current.slice(index+1)
        ])
    }

    const deleteRow = id => {
        if (window.confirm(`Êtes-vous sûr de vouloir supprimer la promotion ${id} ?`)) {
            apiBackEnd.delete(URL_BACK_DELETE_PROMOTION + id).then(res => {
                if (res.status === 200) {
                    // Supprimer l'elément delete de la table
                    setRows(rows.filter(res => res[1] !== id))
                    // Notification promotion supprimé
                    toast.success(`Promotion ${id} supprimé !`, {
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
                if (error.response.data.errorCode === '006') {
                    // Notification promotion en cours de commande
                    toast.warn(error.response.data.errorMessage, {
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
            })
        }
    }

    // Open modal CREATE
    function openModal() {
        setIsOpen(true);
    }

    // Close modal CREATE
    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div className='w-full ml-12 sm:ml-64'>
            <Helmet>
                <title>Bish - Admin Promotion</title>
            </Helmet>
            {/* Notifications */}
            <ToastContainer/>
            {/* TITRE + BUTTON AJOUTER */}
            <TitleContainer form={formCreate} name="PROMOTION" modalIsOpen={modalIsOpen} openModal={openModal}
                            closeModal={closeModal} addButton={true}/>
            {/* LIGNES CHECK + ACTIONS */}
            <CheckRowsContainer rowsCheck={rowsCheck} deleteBackUrl={URL_BACK_MULTIPLE_DELETE_PROMOTION} setReload={setReload} reload={reload} setIsLoading={setIsLoading} isLoading={isLoading} />
            {/* Modal CREATE */}

            {isLoading ? (<img className='absolute top-1/3 left-1/2' src={loadingSVG} alt="Chargement"></img>)
                :
                (
                    <table className="table-fixed w-full pl-5 mt-20" id="searchTable">
                        {/* Nom de chaque colonne */}
                        <thead className='border-b-4 bish-border-gray sticky top-40 bish-bg-white shadow'>
                        <tr>
                            {/* Tous les titres dans le header de la table */}
                            <TableHeadCheckbox setRowsCheck={setRowsCheck} allIds={allPromosId} />
                            <TableHeadSort nbSortColumn="0" name="Id"/>
                            <TableHeadSort nbSortColumn="1" name="Nom"/>
                            <TableHeadSort nbSortColumn="2" name="Remise"/>
                            <TableHeadSort nbSortColumn="3" name="Date de début"/>
                            <TableHeadSort nbSortColumn="4" name="Date de fin"/>
                            {/* TH Actions à ne pas supprimer */}
                            <th className={labelHeader} colSpan='2' title='Actions'>Actions</th>
                        </tr>
                        </thead>
                        {/* Contenu de la table */}
                        <tbody>
                        {/* Retourne une ligne pour chaque élément */}
                        {rows && rows.map((res, index) => <TableRow key={index} element={res} deleteRow={deleteRow}
                                                                    formUpdate={formUpdate[index]}
                                                                    disabledEdit={false}/>)}
                        </tbody>
                    </table>
                )
            }
        </div>
    )
}

export default AdminPromotionsView