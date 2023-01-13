import React, {useEffect, useState} from 'react'
import TableRow from './../../components/admin/TableRow';
import apiBackEnd from "../../api/backend/api.Backend";
import {
    URL_BACK_CONTACT_UPDATE_ISFINISH,
    URL_BACK_CONTACT,
    URL_BACK_REMOVE_CONTACT,
    URL_BACK_MULTIPLE_REMOVE_CONTACT,
    URL_BACK_MULTIPLE_CONTACT_UPDATE_ISFINISH
} from "../../constants/urls/urlBackEnd";
import {toast, ToastContainer} from "react-toastify";
import loadingSVG from "../../assets/images/loading-spin.svg";
import {Helmet} from "react-helmet-async";
import CheckboxRow from './../../components/admin/CheckboxRow';
import CheckRowsContainer from './../../components/admin/CheckRowsContainer';
import TitleContainer from '../../components/admin/TitleContainer';
import TableHeadSort from './../../components/admin/TableHeadSort';
import TableHeadCheckbox from './../../components/TableHeadCheckbox';

const AdminContactView = () => {

    // Style
    const headSort = 'flex py-5 justify-center items-center space-x-2 cursor-pointer'
    const labelHeader = 'truncate hover:text-clip'

    // Contenu d'un ligne de la table (sans les keys, que les datas)
    const [rows, setRows] = useState([])

    // SVG isLoading si requête en cours
    const [isLoading, setIsLoading] = useState(false);
    // Reload table
    const [reload, setReload] = useState(false);

    const [rowsCheck, setRowsCheck] = useState([])
    const [allContactsId, setAllContactsId] = useState([])

    const actionsMultipleRows = 
    <>
      <button className='p-2 shadow border bish-border-gray mr-2' onClick={() => changeMultipleFinish(true)}>Message traité</button>
      <button className='p-2 shadow border bish-border-gray mr-10' onClick={() => changeMultipleFinish(false)}>Message pas traité</button>
    </>

    useEffect(() => {
        setRows([])
        setRowsCheck([])
        setAllContactsId([])
        // Permet d'afficher le SVG de chargement
        setIsLoading(true)
        // Récupération des données
        apiBackEnd.get(URL_BACK_CONTACT).then(respArr => {
            // Set le contenu d'une row (à mettre dans l'ordre voulu)
            respArr.data.map(res => setAllContactsId(current => [...current, res.id]))
            respArr.data.map((res, index) => setRows(current => [...current, [
                <CheckboxRow id={res.id} setRowsCheck={setRowsCheck} />,
                res.id,
                res.name,
                res.surname,
                res.email,
                res.phone,
                res.date.date,
                res.message,
                <input className='h-8 w-8 lg:h-10 lg:w-10 bish-text-blue' key={res.id} type="checkbox"
                       id={`checkIsFinish${res.id}`} onChange={() => changeIsFinish(res)}
                       checked={res.isFinish}
                />
            ]]))
            // Fin du chargement
            setIsLoading(false)
        })
    }, [reload])

    const changeIsFinish = (contact) => {

        let isFinish = document.getElementById('checkIsFinish' + contact.id).checked
        apiBackEnd.put(`${URL_BACK_CONTACT_UPDATE_ISFINISH}${contact.id}/${isFinish}`).then(res => {
            document.getElementById('checkIsFinish' + contact.id).checked = isFinish
            contact.isFinish = !contact.isFinish
            if (isFinish) {
                toast.success(`Contact ${res.data.id} est traité !`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                })
            } else {
                toast.success(`Contact ${res.data.id} doit être re-traité !`, {
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
        })

    }

    const changeMultipleFinish = p => {
        apiBackEnd.put(`${URL_BACK_MULTIPLE_CONTACT_UPDATE_ISFINISH}${p}`, rowsCheck).then(res => {
          setRowsCheck([])
          setReload(!reload)
        })
    }

    const deleteRow = id => {
        if (window.confirm(`Êtes-vous sûr de vouloir supprimer le contact ${id} ?`)) {
            apiBackEnd.delete(URL_BACK_REMOVE_CONTACT + id).then(res => {
                if (res.status === 200) {
                    // Supprimer l'elément delete de la table
                    setRows(rows.filter(res => res[1] !== id))
                    // Notification produit supprimé
                    toast.success(`Message ${id} supprimé !`, {
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
                    // Notification produit en cours de commande
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

    return (
        <div className='w-full ml-12 sm:ml-64'>
            <Helmet>
              <title>Bish - Admin Contact</title>
            </Helmet>
            {/* Notifications */}
            <ToastContainer/>
            {/* TITRE + BUTTON AJOUTER */}
            <TitleContainer name="CATEGORIES" addButton={false} />
            {/* LIGNES CHECK + ACTIONS */}
            <CheckRowsContainer actions={actionsMultipleRows} rowsCheck={rowsCheck} typeRequest="DELETE" deleteBackUrl={URL_BACK_MULTIPLE_REMOVE_CONTACT} setReload={setReload} reload={reload} setIsLoading={setIsLoading} isLoading={isLoading} />
            {/* Modal CREATE */}

            {isLoading ? (<img className='absolute top-1/3 left-1/2' src={loadingSVG} alt="Chargement"></img>)
                :
                (
                    <table className="table-fixed w-full pl-5 mt-20" id="searchTable">
                        {/* Nom de chaque colonne */}
                        <thead className='border-b-4 bish-border-gray sticky top-40 bish-bg-white shadow'>
                        <tr>
                            {/* Tous les titres dans le header de la table */}
                            <TableHeadCheckbox setRowsCheck={setRowsCheck} allIds={allContactsId} />
                            <TableHeadSort nbSortColumn="0" name="Id" />
                            <TableHeadSort nbSortColumn="1" name="Nom" />
                            <TableHeadSort nbSortColumn="2" name="Prénom" />
                            <TableHeadSort nbSortColumn="3" name="Email" />
                            <TableHeadSort nbSortColumn="4" name="Téléphone" />
                            <TableHeadSort nbSortColumn="5" name="Date" />
                            <TableHeadSort nbSortColumn="6" name="Message" />
                            <TableHeadSort nbSortColumn="7" name="Traité" />
                            {/* TH Actions à ne pas supprimer */}
                            <th className={labelHeader} colSpan='2' title='Actions'>Actions</th>
                        </tr>
                        </thead>
                        {/* Contenu de la table */}
                        <tbody>
                        {/* Retourne une ligne pour chaque élément */}
                        {rows && rows.map((res, index) => <TableRow key={index} element={res} deleteRow={deleteRow}
                                                                    disabledEdit={true}/>)}
                        </tbody>
                    </table>
                )
            }
        </div>
    )
}

export default AdminContactView