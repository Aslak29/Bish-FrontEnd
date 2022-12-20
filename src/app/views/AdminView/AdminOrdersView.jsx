import React, { useEffect, useState } from 'react'
import {Helmet} from "react-helmet-async";
// import axios from 'axios';
import apiBackEnd from '../../api/backend/api.Backend';
import loadingSVG from '../../assets/images/loading-spin.svg'
// import { ToastContainer, toast } from 'react-toastify';
import TableRow from './../../components/admin/TableRow';
import TableHeadSort from '../../components/admin/TableHeadSort';
import {  URL_BACK_COMMANDES } from '../../constants/urls/urlBackEnd';
// import FormUpdate from '../../components/admin/product/FormUpdate';
// import TitleContainer from '../../components/admin/TitleContainer';
import TableDetail from '../../components/admin/commandes/TableDetail';


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

    useEffect(() => {
      // Permet d'afficher le SVG de chargement
      setIsLoading(true)
      // Récupération des données
      apiBackEnd.get(URL_BACK_COMMANDES)
      .then(res => {
        console.log(res);
        setRows([])
        setFormUpdate([])
        // Set le contenu d'une row (à mettre dans l'ordre voulu)
        res.data.map((res) => setRows(current => [...current, [
          res.id,
          res.user.user_name,
          res.user.user_surname,
          res.totalCommande +'€',   
          res.adresse.num_rue +' '+ res.adresse.complement_adresse +' '+ res.adresse.rue +' '+ res.adresse.ville +' '+ res.adresse.code_postal,
          res.etatCommande,
          res.date_facture,
          <TableDetail detail={res}/>
        ]]))
  
        res.data.map((res) => {
          // Formulaire UPDATE
          // setFormUpdate(current => [...current,
          //   <FormUpdate produit={res} categories={respArr[0]} promotions={respArr[1]} index={index} updateTable={updateTable}/>
          // ])
        })

        // Fin du chargement
        setIsLoading(false)
      })
    },[reload])



  return (
<div className='w-full ml-12 sm:ml-64'>
      <Helmet>
        <title>Bish - Admin Commandes</title>
      </Helmet>
      {/* Notifications */}
      {/* <ToastContainer /> */}
      {/* TABLE Commandes */}
      {isLoading ? (<img className='absolute top-1/3 left-1/2' src={loadingSVG} alt="Chargement"></img>)
        : 
        (
          <table className="table-fixed w-full pl-5 mt-20" id="searchTable">
            {/* Nom de chaque colonne */}
            <thead className='border-b-4 bish-border-gray sticky top-40 bish-bg-white shadow'>
              <tr>
                {/* Tous les titres dans le header de la table */}
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
              {rows && rows.map((res, index) => <TableRow key={index} element={res} formUpdate={formUpdate[index]}/>)}
            </tbody>
          </table>
        )
      }
    </div>
  )
}

export default AdminOrdersView