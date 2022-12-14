import React, {useEffect, useState} from 'react';
import {search, sort} from "../../services/adminServices";
import addIMG from "../../assets/images/add.png";
import sortIMG from "../../assets/images/trier.png";
import TableRow from "../../components/admin/TableRow";
import apiBackEnd from "../../api/backend/api.Backend";
import {URL_BACK_CATEGORIES, URL_BACK_CATEGORIES_DELETE} from "../../constants/urls/urlBackEnd";
import ModalCrud from "../../components/admin/ModalCrud";
import loadingSVG from "../../assets/images/loading-spin.svg";
import {toast, ToastContainer} from "react-toastify";
import FormCreate from "../../components/admin/category/FormCreate";
import FormUpdate from "../../components/admin/category/FormUpdate";
import {Helmet} from "react-helmet-async";

const AdminCategoriesView = () => {

    const headSort = 'flex py-5 justify-center items-center space-x-2 cursor-pointer';
    const labelHeader = 'truncate hover:text-clip';

    // Contenu d'un ligne de la table (sans les keys, que les datas)
    const [rows, setRows] = useState([])
    // Formulaire UPDATE
    const [formUpdate, setFormUpdate] = useState([])
    // Formulaire CREATE
    const [formCreate, setFormCreate] = useState()
    // SVG isLoading si requête en cours
    const [isLoading, setIsLoading] = useState(false);
    // State modal CREATE
    const [modalIsOpen, setIsOpen] = useState(false);

    const [reload, setReload] = useState(false);

    {/*formUpdate={formUpdate[index]} deleteRow={deleteRow}*/
    }


    useEffect(() => {

        setIsLoading(true)

        apiBackEnd.get(URL_BACK_CATEGORIES).then(res => {
            console.log(res);
            setRows([]);
            res.data.map((res) => setRows(current => [...current, [
                res.id,
                res.name,
                <img className='object-contain h-10 m-auto hover:absolute hover:scale-[10.0] hover:z-50'
                     src={window.location.origin + '/src/app/assets/images/categories/' + res.pathImage}
                     alt={res.name}/>,
                <input className='h-8 w-8 lg:h-10 lg:w-10 bish-text-blue' type="checkbox" defaultChecked={res.isTrend}/>
            ]]))

            res.data.map((res) => {
                setFormUpdate(current => [...current,
                    <FormUpdate categories={res}/>
                ])
            })

            setFormCreate(
                <FormCreate categories={res.data} reload={reload} setReload={setReload} close={closeModal}/>
            )
        }).catch(error => console.log(error))
        setIsLoading(false)
    }, [reload])

    const deleteRow = id => {
        if (window.confirm(`Êtes-vous sûr de vouloir supprimer la catégorie ${id} ?`)) {
            apiBackEnd.delete(URL_BACK_CATEGORIES_DELETE + id).then(res => {
                if (res.status === 200) {
                    // Supprimer l'elément supprimer de la table
                    setRows(rows.filter(res => res[0] !== id))
                    // Notification produit supprimé
                    toast.success(`Produit ${id} supprimé!`, {
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
                if (error.response.data.errorCode === '014') {
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
                <title>Bish - Admin Catégories</title>
            </Helmet>
            <ToastContainer/>

            <div className='flex flex-row shadow fixed top-0 right-0 mt-20 bish-bg-white w-full z-10'>
                <div className='w-12 sm:w-72'></div>
                <div className='flex flex-row justify-between space-x-5 h-20 w-full px-10'>
                    <span className='text-center my-auto text-2xl font-medium'>Catégories</span>
                    <input className='w-1/3 h-10 my-auto' type="text" id="searchInput" onKeyUp={() => search()}
                           placeholder="Rechercher.."/>
                    <button className='my-auto bg-green-600 p-2 bish-text-white font-medium'
                            onClick={() => openModal()}>
                        <img className='h-5 lg:h-8' src={addIMG} alt="Ajouter"/>
                    </button>
                </div>
            </div>

            <ModalCrud modalIsOpen={modalIsOpen} openModal={openModal} closeModal={closeModal} form={formCreate}/>
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
                            <th className={labelHeader} title='Tendance'>Image</th>
                            <th className={labelHeader} title='Tendance'>Tendance</th>
                            {/* TH Actions à ne pas supprimer */}
                            <th className={labelHeader} colSpan='2' title='Actions'>Actions</th>
                        </tr>
                        </thead>
                        {/* Contenu de la table */}
                        <tbody>
                        {/* Retourne une ligne pour chaque élément */}
                        {rows && rows.map((res, index) =>
                            <TableRow key={index} element={res} formUpdate={formUpdate[index]} deleteRow={deleteRow}/>
                        )}
                        </tbody>
                    </table>
                )
            }
        </div>
    )
}

export default AdminCategoriesView