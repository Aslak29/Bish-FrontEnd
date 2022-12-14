import React, {useEffect, useState} from 'react'
import TableRow from './../../components/admin/TableRow';
import apiBackEnd from "../../api/backend/api.Backend";
import {URL_BACK_CONTACT, URL_BACK_REMOVE_CONTACT} from "../../constants/urls/urlBackEnd";
import {toast, ToastContainer} from "react-toastify";
import {search, sort} from "../../services/adminServices";
import loadingSVG from "../../assets/images/loading-spin.svg";
import sortIMG from "../../assets/images/trier.png";


const AdminContactView = () => {

    // Style
    const headSort = 'flex py-5 justify-center items-center space-x-2 cursor-pointer'
    const labelHeader = 'truncate hover:text-clip'

    // Contenu d'un ligne de la table (sans les keys, que les datas)
    const [rows, setRows] = useState([])

    // SVG isLoading si requête en cours
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        // Permet d'afficher le SVG de chargement
        setIsLoading(true)
        // Récupération des données
        apiBackEnd.get(URL_BACK_CONTACT).then(respArr => {
            console.log(respArr)

            // Set le contenu d'une row (à mettre dans l'ordre voulu)
            respArr.data.map((res, index) => setRows(current => [...current, [
                res.id,
                res.name,
                res.surname,
                res.email,
                res.phone,
                res.date.date,
                res.message
            ]]))


            // Fin du chargement
            setIsLoading(false)
        })
    }, [])
    const deleteRow = id => {
        if (window.confirm(`Êtes-vous sûr de vouloir supprimer le contact ${id} ?`)) {
            apiBackEnd.delete(URL_BACK_REMOVE_CONTACT + id).then(res => {
                if (res.status === 200) {
                    console.log(res)
                    // Supprimer l'elément delete de la table
                    setRows(rows.filter(res => res[0] !== id))
                    // Notification produit supprimé
                    toast.success(`Contact ${id} supprimé!`, {
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
            {/* Notifications */}
            <ToastContainer/>
            {/* TITRE + BUTTON AJOUTER */}
            <div className='flex flex-row shadow fixed top-0 right-0 mt-20 bish-bg-white w-full z-10'>
                <div className='w-12 sm:w-72'></div>
                <div className='flex flex-row justify-between space-x-5 h-20 w-full px-10'>
                    <span className='text-center my-auto text-2xl font-medium'>CONTACTS</span>
                    <input className='w-1/3 h-10 my-auto' type="text" id="searchInput" onKeyUp={() => search()}
                           placeholder="Rechercher.."/>
                </div>
            </div>
            {/* Modal CREATE */}

            {isLoading ? (<img className='absolute top-1/3 left-1/2' src={loadingSVG} alt="Chargement"></img>)
                :
                (
                    <table className="table-fixed w-full pl-5 mt-20" id="searchTable">
                        {/* Nom de chaque colonne */}
                        <thead className='border-b-4 bish-border-gray sticky top-40 bish-bg-white shadow'>
                        <tr>
                            {/* Tous les titres dans le header de la table */}
                            <th onClick={() => sort(0)}>
                                <div className={headSort}>
                                    <span className={labelHeader} title='Id'>Id</span>
                                    <img className='h-4' src={sortIMG} alt="Trier par ID"/>
                                </div>
                            </th>
                            <th onClick={() => sort(1)}>
                                <div className={headSort}>
                                    <span className={labelHeader} title='Nom'>Nom</span>
                                    <img className='h-4' src={sortIMG} alt="Trier par ID"/>
                                </div>
                            </th>
                            <th onClick={() => sort(2)}>
                                <div className={headSort}>
                                    <span className={labelHeader} title='Prenom'>Prenom</span>
                                    <img className='h-4' src={sortIMG} alt="Trier par ID"/>
                                </div>
                            </th>
                            <th onClick={() => sort(3)}>
                                <div className={headSort}>
                                    <span className={labelHeader} title='Email'>Email</span>
                                    <img className='h-4' src={sortIMG} alt="Trier par ID"/>
                                </div>
                            </th>
                            <th onClick={() => sort(4)}>
                                <div className={headSort}>
                                    <span className={labelHeader} title='Téléphone'>Téléphone</span>
                                    <img className='h-4' src={sortIMG} alt="Trier par ID"/>
                                </div>
                            </th>
                            <th onClick={() => sort(5)}>
                                <div className={headSort}>
                                    <span className={labelHeader} title='Date'>Date</span>
                                    <img className='h-4' src={sortIMG} alt="Trier par ID"/>
                                </div>
                            </th>
                            <th onClick={() => sort(6)}>
                                <div className={headSort}>
                                    <span className={labelHeader} title='Message'>Message</span>
                                    <img className='h-4' src={sortIMG} alt="Trier par ID"/>
                                </div>
                            </th>
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