import React, { useEffect, useState } from 'react'
import {Helmet} from "react-helmet-async";
import apiBackEnd from '../../api/backend/api.Backend';
import loadingSVG from '../../assets/images/loading-spin.svg'
import { ToastContainer, toast } from 'react-toastify';
import TableRow from './../../components/admin/TableRow';
import TableHeadSort from '../../components/admin/TableHeadSort';
import {  URL_BACK_COMMANDES, URL_BACK_CANCEL_ORDER, URL_BACK_MULTIPLE_CANCEL_ORDER } from '../../constants/urls/urlBackEnd';
import FormUpdate from '../../components/admin/commandes/FormUpdate';
import TitleContainer from '../../components/admin/TitleContainer';
import TableDetail from '../../components/admin/commandes/TableDetail';
import CheckboxRow from './../../components/admin/CheckboxRow';
import CheckRowsContainer from './../../components/admin/CheckRowsContainer';
import TableHeadCheckbox from './../../components/TableHeadCheckbox';

const AdminOrdersView = () => {
   // Style
    const labelHeader = 'truncate hover:text-clip'
    // Contenu d'un ligne de la table (sans les keys, que les datas)
    const [rows, setRows] = useState([])
    // Formulaire UPDATE
    const [formUpdate, setFormUpdate] = useState([])
    // SVG isLoading si requête en cours
    const [isLoading, setIsLoading] = useState(false);
    // Reload table
    const [reload, setReload] = useState(false);

    const [rowsCheck, setRowsCheck] = useState([])
    const [allOrdersIds, setAllOrdersIds] = useState([])
    const [allOrdersIdsToDelete, setAllOrdersIdsToDelete] = useState([])

    useEffect(() => {
      // Permet d'afficher le SVG de chargement
      setIsLoading(true)
      // Récupération des données
      apiBackEnd.get(URL_BACK_COMMANDES)
      .then(res => {
        setRows([])
        setFormUpdate([])
        setRowsCheck([])
        setAllOrdersIds([])
        setAllOrdersIdsToDelete([])
        res.data.map(res => {
          setAllOrdersIds(current => [...current, res.id]);
          res.etatCommande === "En préparation" && setAllOrdersIdsToDelete(current => [...current, res.id]);
        })
        // Set le contenu d'une row (à mettre dans l'ordre voulu)
        res.data.map((res) => setRows(current => [...current, [
          <CheckboxRow id={res.id} setRowsCheck={setRowsCheck} />,
          res.id,
          res.user.user_name,
          res.user.user_surname,
          res.totalCommande +'€',   
          (res.adresse.num_rue ? res.adresse.num_rue : '') +' '+
          (res.adresse.complement_adresse ? res.adresse.complement_adresse : '') +' '+
          (res.adresse.rue ? res.adresse.rue : '') +' '+
          res.adresse.ville +' '+ res.adresse.code_postal,
          res.etatCommande,
          res.date_facture,
          <TableDetail detail={res} reload={reload} setReload={setReload}/>
        ]]))
  
        res.data.map((res) => {
          // Formulaire UPDATE
            setFormUpdate(current => [...current,
                <FormUpdate commande={res} reload={reload} setReload={setReload}/>
            ])
        })

        // Fin du chargement
        setIsLoading(false)
      })
    },[reload])

    const cancelOrder = id => {
      if (window.confirm("Êtes-vous sûr de vouloir annuler la commande ?")) {
          apiBackEnd.put(`${URL_BACK_CANCEL_ORDER}${id}`).then(res => {
            if (res.status === 200) {
              setReload(!reload)
              // Notification succès d'une modification de produit
              toast.success(`Commande ${res.data.id} annulée !`,
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
              if (error.response.data["errorCode"] === "016") {
                  toast.warn(error.response.data["errorMessage"],
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
              }else if (error.response.data["errorCode"] === "017") {
                  toast.warn(error.response.data["errorMessage"],
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
            }
          )
      }
  }

  return (
<div className='w-full ml-12 sm:ml-64'>
      <Helmet>
        <title>Bish - Admin Commandes</title>
      </Helmet>
      {/* Notifications */}
      <ToastContainer />
      {/* TITRE + BUTTON AJOUTER */}
      <TitleContainer name="COMMANDES" addButton={false} search={true} />
      {/* LIGNES CHECK + ACTIONS */}
      <CheckRowsContainer rowsCheck={rowsCheck} allIdsToDelete={allOrdersIdsToDelete} typeRequest="PUT" deleteBackUrl={URL_BACK_MULTIPLE_CANCEL_ORDER} setReload={setReload} reload={reload} setIsLoading={setIsLoading} isLoading={isLoading} />
      {/* TABLE Commandes */}
      {isLoading ? (<img className='absolute top-1/3 left-1/2' src={loadingSVG} alt="Chargement"></img>)
        : 
        (
          <table className="table-fixed w-full pl-5 mt-20" id="searchTable">
            {/* Nom de chaque colonne */}
            <thead className='border-b-4 bish-border-gray sticky top-40 bish-bg-white shadow z-[1]'>
              <tr>
                {/* Tous les titres dans le header de la table */}
                <TableHeadCheckbox setRowsCheck={setRowsCheck} allIds={allOrdersIds} />
                <TableHeadSort nbSortColumn="0" name="Id" />
                <TableHeadSort nbSortColumn="1" name="Nom" />
                <TableHeadSort nbSortColumn="2" name="Prénom" />
                <TableHeadSort nbSortColumn="3" name="Prix Total" />
                <TableHeadSort nbSortColumn="4" name="Adresse" />
                <TableHeadSort nbSortColumn="5" name="Etat" />
                <TableHeadSort nbSortColumn="6" name="Date" />
                <th className={labelHeader} title='Détails'>Détails</th>
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
                      disabledEdit={
                        res[6] === "En cours de livraison" || res[6] === "Annulée" || res[6] === "Livrée" && true
                        }
                      disableRemove={
                        res[6] === "En cours de livraison" || res[6] === "Annulée" || res[6] === "Livrée" && true
                        }
                      deleteRow={cancelOrder}
                  />
              )}
            </tbody>
          </table>
        )
      }
    </div>
  )
}

export default AdminOrdersView;
