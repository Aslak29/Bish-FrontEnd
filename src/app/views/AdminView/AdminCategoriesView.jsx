import React, {useEffect, useState} from 'react';
import TableRow from "../../components/admin/TableRow";
import apiBackEnd from "../../api/backend/api.Backend";
import {
    URL_BACK_CATEGORIES,
    URL_BACK_CATEGORIES_DELETE, URL_BACK_CATEGORIES_UPDATE_TREND,
} from "../../constants/urls/urlBackEnd";
import loadingSVG from "../../assets/images/loading-spin.svg";
import {toast, ToastContainer} from "react-toastify";
import FormCreate from "../../components/admin/category/FormCreate";
import FormUpdate from "../../components/admin/category/FormUpdate";
import {Helmet} from "react-helmet-async";
import TableHeadSort from "../../components/admin/TableHeadSort";
import TitleContainer from "../../components/admin/TitleContainer";
import s3 from "../../bucket_S3/aws";
// import s3 from "../../bucket_S3/aws";

const AdminCategoriesView = () => {

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

    useEffect(() => {

        setIsLoading(true)

        apiBackEnd.get(URL_BACK_CATEGORIES).then(res => {
            setRows([]);
            setFormUpdate([])
            res.data.map((res, index) => setRows(current => [...current, [
                res.id,
                res.name,
                <img className='object-contain h-10 m-auto hover:absolute hover:scale-[10.0] hover:z-50'
                     src={s3.getSignedUrl('getObject', {Bucket: 'awsbish', Key: 'assets/images/products/'+ res.pathImage})} //src={s3.getSignedUrl('getObject', {Bucket: 'awsbish', Key: 'assets/images/products/'+ res.pathImage})}
                     alt={res.name}/>,
                <input className='h-8 w-8 lg:h-10 lg:w-10 bish-text-blue' type="checkbox"
                       id={`checkTrend${res.id}`} onChange={() => changeIsTrend(res, index)}
                       checked={res.isTrend}
                />
            ]]))

            res.data.map((res, index) => {
                setFormUpdate(current => [...current,
                    <FormUpdate categories={res} index={index} updateTable={updateTable}/>
                ])
            })

            setFormCreate(
                <FormCreate categories={res.data} reload={reload} setReload={setReload} close={closeModal}/>
            )
        }).catch(error => console.log(error))
        setIsLoading(false)
    }, [reload])


    const changeIsTrend = (categories, index) => {
        let isTrend = document.getElementById('checkTrend' + categories.id).checked
        apiBackEnd.post(`${URL_BACK_CATEGORIES_UPDATE_TREND}${categories.id}/${isTrend}/`).then(res => {
            document.getElementById('checkTrend' + categories.id).checked = isTrend
            categories.isTrend = !categories.isTrend
            // Modifier la checkbox "tendance" du FormUpdate
            setFormUpdate(current => [
                ...current.slice(0, index),
                <FormUpdate categories={categories} index={index} updateTable={updateTable}/>,
                ...current.slice(index + 1)
            ])
            if (isTrend) {
                toast.success(`Catégorie ${res.data.id} est en tendance !`, {
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
                toast.success(`Catégorie ${res.data.id} n'est plus en tendance !`, {
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


    const updateTable = (categories, categoriesAfter, index, pathImageDefault) => {
        categories.name = categoriesAfter.name
        categories.isTrend = categoriesAfter.trend
        categories.pathImage = categoriesAfter.infoFile !== undefined ? categoriesAfter.infoFile.name : pathImageDefault
        // Modifier le modal update de la row concernée
        setFormUpdate(current => [
            ...current.slice(0, index),
            <FormUpdate categories={categories} index={index} updateTable={updateTable}/>,
            ...current.slice(index + 1)
        ])
        // Modifier la row concernée par l'update
        setRows(current => [
            ...current.slice(0, index),
            [
                categories.id,
                categories.name,
                <img className='object-contain h-10 m-auto hover:absolute hover:scale-[10.0] hover:z-50'
                     src={window.location.origin + '/src/app/assets/images/categories/' + categories.pathImage} //src={s3.getSignedUrl('getObject', {Bucket: 'awsbish', Key: 'assets/images/products/'+ categories.pathImage})}
                     alt={categories.name}/>,
                <input className='h-8 w-8 lg:h-10 lg:w-10 bish-text-blue' type="checkbox"
                       id={`checkTrend${categories.id}`} onChange={() => changeIsTrend(categories, index)}
                       checked={categories.isTrend}/>
            ],
            ...current.slice(index + 1)
        ])
    }

    const deleteRow = id => {
        if (window.confirm(`Êtes-vous sûr de vouloir supprimer la catégorie ${id} ?`)) {
            apiBackEnd.delete(URL_BACK_CATEGORIES_DELETE + id).then(res => {
                if (res.status === 200) {
                    // Supprimer l'elément supprimer de la table
                    setRows(rows.filter(res => res[0] !== id))
                    // Notification produit supprimé
                    toast.success(`Catégorie ${id} supprimé!`, {
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

            <TitleContainer form={formCreate} name="CATÉGORIES" modalIsOpen={modalIsOpen} openModal={openModal}
                            closeModal={closeModal} addButton={true}/>

            {isLoading ? (<img className='absolute top-1/3 left-1/2' src={loadingSVG} alt="Chargement"></img>)
                :
                (
                    <table className="table-fixed w-full pl-5 mt-20" id="searchTable">
                        {/* Nom de chaque colonne */}
                        <thead className='border-b-4 bish-border-gray sticky top-40 bish-bg-white shadow'>
                        <tr>
                            {/* Tous les titres dans le header de la table */}
                            <TableHeadSort nbSortColumn="0" name="Id"/>
                            <TableHeadSort nbSortColumn="1" name="Nom"/>
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