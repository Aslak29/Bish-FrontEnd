import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import TableRow from './../../components/admin/TableRow';
import TableHeadSort from '../../components/admin/TableHeadSort';
import apiBackEnd from '../../api/backend/api.Backend';
import loadingSVG from '../../assets/images/loading-spin.svg'
import { URL_BACK_BLOG, URL_BACK_DELETE_BLOG, URL_BACK_MULTIPLE_DELETE_BLOG} from '../../constants/urls/urlBackEnd';
import FormUpdate from '../../components/admin/blog/FormUpdate';
import FormCreate from '../../components/admin/blog/FormCreate';
import {Helmet} from 'react-helmet-async'
import TitleContainer from '../../components/admin/TitleContainer';
import CheckRowsContainer from '../../components/admin/checkRowsContainer';
//import s3 from "../../bucket_S3/aws"
import CheckboxRow from './../../components/admin/CheckboxRow';
import TableHeadCheckbox from './../../components/TableHeadCheckbox';

const AdminBlogView = () => {

    // Style
    const labelHeader = 'truncate hover:text-clip'

    // Contenu d'un ligne de la table (sans les keys, que les datas)
    const [rows, setRows] = useState([])
    // Formulaire UPDATE
    const [formUpdate, setFormUpdate] = useState([])
    // Formulaire CREATE
    const [formCreate, setFormCreate] = useState()
    // SVG isLoading si requête en cours
    const [isLoading, setIsLoading] = useState(false);
    // State modal CREATE
    const [modalIsOpen, setIsOpen] = React.useState(false);
    // Reload table
    const [reload, setReload] = useState(false);

    const [rowsCheck, setRowsCheck] = useState([])
    const [allBlogsIds, setAllBlogsIds] = useState([])

    useEffect(() => {
        // Permet d'afficher le SVG de chargement
        setIsLoading(true)
        // Récupération des données
        
        // TODO: SI PLUSIEURS APPEL API: METTRE ICI
        apiBackEnd.get(URL_BACK_BLOG).then(response => {
          setRows([])
          setFormUpdate([])
          setRowsCheck([])
          setAllBlogsIds([])
          // TODO: EXEMPLE: METTRE LES ELEMENT DANS L'ORDRE D'AFFICHAGE DANS UNE ROW
          // Set le contenu d'une row (à mettre dans l'ordre voulu)
          response.data.map(res => setAllBlogsIds(current => [...current, res.id]))
          response.data.map((res) => setRows(current => [...current, [
              <CheckboxRow id={res.id} setRowsCheck={setRowsCheck} />,
              res.id,
              res.title,
              // res.description,
              <p dangerouslySetInnerHTML={{__html: res.description.substring(0, 40) + "..."}} alt="essai"></p>,
              <img className='object-contain h-10 m-auto hover:absolute hover:scale-[10.0] hover:z-50' src={window.location.origin + '/src/app/assets/images/blog/' + res.pathImage} /*src={s3.getSignedUrl('getObject', {Bucket: 'awsbish', Key: 'assets/images/blog/'+ res.pathImage})}*/ alt={res.title}/>,
              // <input className='h-8 w-8 lg:h-10 lg:w-10 bish-text-blue' type="checkbox" defaultChecked={res.is_trend}/>,
          ]]))
          response.data.map((res, index) => {
            // Formulaire UPDATE
            setFormUpdate(current => [...current,
              <FormUpdate blog={res} index={index} 
              updateTable={updateTable}
              />
            ])
          })

          // Formulaire CREATE
          setFormCreate(
            <FormCreate blog={response} 
            reload={reload} setReload={setReload} 
            close={closeModal}/>
          )
  

      // Fin du chargement
      setIsLoading(false)
    })
    },[reload])

    const updateTable = (blog, blogAfter, index, pathImageDefault) => {
      blog.title = blogAfter.title
      blog.description = blogAfter.description
      blog.pathImage = blogAfter.infoFile !== undefined ? blogAfter.infoFile.name : pathImageDefault
      // Modifier le modal update de la row concernée
      setFormUpdate(current => [
        ...current.slice(0, index),
        <FormUpdate blog={blog}  index={index} updateTable={updateTable}/>,
        ...current.slice(index+1)
      ])
      // Modifier la row concernée par l'update
      setRows(current => [
        ...current.slice(0, index),
        [
          <CheckboxRow id={blog.id} setRowsCheck={setRowsCheck} />,
          blog.id,
          blog.title,
          blog.description,
          <img className='object-contain h-10 m-auto hover:absolute hover:scale-[10.0] hover:z-50' src={window.location.origin + '/src/app/assets/images/blog/' + blog.pathImage} /*src={s3.getSignedUrl('getObject', {Bucket: 'awsbish', Key: 'assets/images/blog/'+ blog.pathImage})}*/ alt={blog.title}/>,
        ],
        ...current.slice(index+1)
      ])
    }
  // DELETE élément dans la BDD
  const deleteRow = id => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer le produit ${id} ?`)) {
      apiBackEnd.delete(URL_BACK_DELETE_BLOG + id).then(res => {
        if (res.status === 200) {
          // Supprimer l'elément delete de la table
          setRows(rows.filter(res => res[1] !== id))
          // Notification produit supprimé
          toast.success(`Article ${id} supprimé !`, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light" })
        }
      }).catch(error => {
        if(error.response.data.errorCode === '006') {
          // Notification produit en cours de commande
          toast.warn(error.response.data.errorMessage, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light" });
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
          <title>Bish - Admin Blog</title>
        </Helmet>
        {/* Notifications */}
        <ToastContainer />
        {/* TITRE + BUTTON AJOUTER */}
        <TitleContainer form={formCreate} name="BLOG" modalIsOpen={modalIsOpen} openModal={openModal} closeModal={closeModal} addButton={true} search={true}/>
        {/* LIGNES CHECK + ACTIONS */}
        <CheckRowsContainer rowsCheck={rowsCheck} typeRequest="DELETE" deleteBackUrl={URL_BACK_MULTIPLE_DELETE_BLOG} setReload={setReload} reload={reload} setIsLoading={setIsLoading} isLoading={isLoading} />
        {/* TABLE  */}
        {isLoading ? (<img className='absolute top-1/3 left-1/2' src={loadingSVG} alt="Chargement"></img>)
          : 
          (
            <table className="table-fixed w-full pl-5 mt-20" id="searchTable">
              {/* Nom de chaque colonne */}
              <thead className='border-b-4 bish-border-gray sticky top-40 bish-bg-white shadow'>
                <tr>
                  {/* Tous les titres dans le header de la table */}
                  <TableHeadCheckbox setRowsCheck={setRowsCheck} allIds={allBlogsIds} />
                  <TableHeadSort nbSortColumn="0" name="Id" />
                  <TableHeadSort nbSortColumn="1" name="Titre" />
                  <TableHeadSort nbSortColumn="2" name="Description" />
                  <th className={labelHeader} title='Tendance'>Image</th>
                  {/* TH Actions à ne pas supprimer */}
                  <th className={labelHeader} colSpan='2' title='Actions'>Actions</th>
                </tr>
              </thead>
              {/* Contenu de la table */}
              <tbody>
                {/* Retourne une ligne pour chaque élément */}
                {rows && rows.map((res, index) => <TableRow key={index} element={res} formUpdate={formUpdate[index]} deleteRow={deleteRow}/>)}
              </tbody>
            </table>
          )
        }
      </div>
    )
}

export default AdminBlogView