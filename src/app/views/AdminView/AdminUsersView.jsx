import React, { useEffect, useState } from 'react'
import apiBackEnd from '../../api/backend/api.Backend';
import loadingSVG from '../../assets/images/loading-spin.svg'
import { ToastContainer, toast } from 'react-toastify';
import TableRow from './../../components/admin/TableRow';
import TableHeadSort from '../../components/admin/TableHeadSort';
import { URL_BACK_USERS, URL_BACK_DELETE_USER } from '../../constants/urls/urlBackEnd';
import FormUpdate from '../../components/admin/users/FormUpdate';
import FormCreate from '../../components/admin/users/FormCreate';
import {Helmet} from "react-helmet-async";
import TitleContainer from '../../components/admin/TitleContainer';

const AdminUsersView = () => {
  
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
    const [modalIsOpen, setIsOpen] = useState(false);
      // Reload table
    const [reload, setReload] = useState(false);

     useEffect(() => {
       // Permet d'afficher le SVG de chargement
      setIsLoading(true)
      // Récupération des données
      apiBackEnd.get(URL_BACK_USERS)

       .then(res => {
        setRows([])
        setFormUpdate([])
         // Set le contenu d'une row (à mettre dans l'ordre voulu)
         res.data.map((res) => setRows(current => [...current, [
          res.id,
          res.name,
          res.surname,
          res.email,
          res.roles,
          res.phone ? res.phone.replace(/(.{2})(?=.)/g,"$1-") : "-",
          res.created_at,
          res.disable.toString(),
         ]]))
  
        res.data.map((res) => {
           // Formulaire UPDATE
           setFormUpdate(current => [...current,
             <FormUpdate user={res} setReload={setReload} reload={reload}/>
           ])
         })
        
        // Formulaire CREATE
         setFormCreate(
            <FormCreate setReload={setReload} close={closeModal} reload={reload}/>
         )
  
         // Fin du chargement
         setIsLoading(false)
       })
     },[reload])  

       
  // DELETE élément dans la BDD
  const deleteRow = id => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur ${id} ?`)) {
      apiBackEnd.post(URL_BACK_DELETE_USER + id).then(res => {
        if (res.status === 200) {
        setReload(!reload)
          // Notification produit supprimé
          toast.success(`Utilisateur ${res.data.id} - ${res.data.name} ${res.data.surname} supprimé !`,
              {
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
          if (error.response.data["errorCode"] === "015") {
              toast.warn(`L'utilisateur à une commande en préparation !`,
                  {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light"
                  })
          }else if (error.response.data["errorCode"] === "014") {
              toast.warn(`L'utilisateur à une commande en cours !`,
                  {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light"
                  })
          }else {
              toast.error('Une erreur est survenue',
                  {
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
        <title>Bish - Admin Users</title>
      </Helmet>
    {/* Notifications */}
    <ToastContainer />
    {/* TITRE + BUTTON AJOUTER */}
     <TitleContainer form={formCreate} name="UTILISATEURS" modalIsOpen={modalIsOpen} openModal={openModal} closeModal={closeModal} addButton={true} />
    {/* TABLE Utilisateur */}
    {isLoading ? (<img className='absolute top-1/3 left-1/2' src={loadingSVG} alt="Chargement"></img>)
      : 
      (
        <table className="table-fixed w-full pl-5 mt-20" id="searchTable">
          {/* Nom de chaque colonne */}
          <thead className='border-b-4 bish-border-gray sticky top-40 bish-bg-white shadow'>
            <tr>
              {/* Tous les titres dans le header de la table */}
              <TableHeadSort nbSortColumn="0" name="Id" />
                <TableHeadSort nbSortColumn="1" name="Prénom" />
                <TableHeadSort nbSortColumn="2" name="Nom" />
                <TableHeadSort nbSortColumn="3" name="Email" />
                <TableHeadSort nbSortColumn="4" name="Role" />
                <TableHeadSort nbSortColumn="5" name="Téléphone" />
                <TableHeadSort nbSortColumn="6" name="Crée le" />
                <th/>
              {/* TH Actions à ne pas supprimer */}
              <th className={labelHeader} colSpan='2' title='Actions'>Actions</th>
            </tr>
          </thead>
          {/* Contenu de la table */}
          <tbody>
            {/* Retourne une ligne pour chaque élément */}
            {rows && rows.map((res, index) =>
                <TableRow 
                key={index}
                element={res}
                formUpdate={formUpdate[index]}
                deleteRow={deleteRow}
                disabledEdit={res[7] === 'true' && true}
                disableRemove={res[7] === 'true' && true}
                   />
            )}
          </tbody>
        </table>
      )
    }
  </div>
  )
}

export default AdminUsersView