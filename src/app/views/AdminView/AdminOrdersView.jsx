import React, { useEffect, useState } from 'react'
import {Helmet} from "react-helmet-async";
// import axios from 'axios';
// import apiBackEnd from '../../api/backend/api.Backend';
import loadingSVG from '../../assets/images/loading-spin.svg'
// import { ToastContainer, toast } from 'react-toastify';
import TableRow from './../../components/admin/TableRow';
import TableHeadSort from '../../components/admin/TableHeadSort';
// import { URL_BACK_PRODUCTS, URL_BACK_CATEGORIES, URL_BACK_PROMOS, URL_BACK_DELETE_PRODUCT, URL_BACK_UPDATE_TREND_PRODUCT, URL_BACK_UPDATE_AVAILABLE_PRODUCT } from '../../constants/urls/urlBackEnd';
// import FormUpdate from '../../components/admin/product/FormUpdate';
// import TitleContainer from '../../components/admin/TitleContainer';

const AdminOrdersView = () => {
   // Style
    const labelHeader = 'truncate hover:text-clip'
    // State modal CREATE
    const [modalIsOpen, setIsOpen] = useState(false);
    // Contenu d'un ligne de la table (sans les keys, que les datas)
    const [rows, setRows] = useState([])
    // Formulaire UPDATE
    const [formUpdate, setFormUpdate] = useState([])
    // SVG isLoading si requête en cours
    const [isLoading, setIsLoading] = useState(false);
    // Reload table
    const [reload, setReload] = useState(false);

  return (
<div className='w-full ml-12 sm:ml-64'>
      <Helmet>
        <title>Bish - Admin Produits</title>
      </Helmet>
      {/* Notifications */}
      {/* TABLE PRODUITS */}
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
                <TableHeadSort nbSortColumn="5" name="Statut" />
                <TableHeadSort nbSortColumn="6" name="Date" />
                <th className={labelHeader} title='Détails'>Détails</th>
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

export default AdminOrdersView