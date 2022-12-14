import React, { useEffect, useState } from 'react'
import axios from 'axios';
import apiBackEnd from '../../api/backend/api.Backend';
import sortIMG from '../../assets/images/trier.png'
import addIMG from '../../assets/images/add.png'
import loadingSVG from '../../assets/images/loading-spin.svg'
import { ToastContainer, toast } from 'react-toastify';
import TableRow from './../../components/admin/TableRow';
import ModalCrud from '../../components/admin/ModalCrud';
import { search, sort } from '../../services/adminServices';
import { URL_BACK_PRODUCTS, URL_BACK_CATEGORIES, URL_BACK_PROMOS, URL_BACK_DELETE_PRODUCT, URL_BACK_UPDATE_TREND_PRODUCT, URL_BACK_UPDATE_AVAILABLE_PRODUCT } from '../../constants/urls/urlBackEnd';
import FormUpdate from '../../components/admin/product/FormUpdate';
import FormCreate from '../../components/admin/product/FormCreate';
import {Helmet} from 'react-helmet-async'

const AdminProductsView = () => {

  // Style
  const headSort = 'flex py-5 justify-center items-center space-x-2 cursor-pointer'
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
    axios.all([
      apiBackEnd.get(URL_BACK_CATEGORIES),
      apiBackEnd.get(URL_BACK_PROMOS),
      apiBackEnd.get(URL_BACK_PRODUCTS)
    ])
    .then(respArr => {
      setRows([])
      // Set le contenu d'une row (à mettre dans l'ordre voulu)
      respArr[2].data.map((res, index) => setRows(current => [...current, [
        res.id,
        res.name,
        res.price.toFixed(2) + ' €',
        res.description,
        res.noteAverage ? res.noteAverage.toFixed(1) + '/5' : '-',
        res.stockBySize.reduce((accumulator, currentValue) => accumulator + currentValue.stock, 0),
        res.name_categorie, 
        res.promotion.remise > 0 ? res.promotion.remise + ' %' : '-',
        res.created_at.date,
        <img className='object-contain h-10 m-auto hover:absolute hover:scale-[10.0] hover:z-50' src={window.location.origin + '/src/app/assets/images/products/' + res.pathImage} alt={res.name}/>,
        <input className='h-8 w-8 lg:h-10 lg:w-10 bish-text-blue' type="checkbox" defaultChecked={res.is_trend} id={`checkTrend${res.id}`} onClick={() => changeIsTrend(res, respArr[0], respArr[1], index)}/>,
        <input className='h-8 w-8 lg:h-10 lg:w-10 bish-text-blue' type="checkbox" defaultChecked={res.is_available} id={`checkAvailable${res.id}`} onClick={() => changeIsAvailable(res, respArr[0], respArr[1], index)}/>
      ]]))

      respArr[2].data.map((res, index) => {
        // Formulaire UPDATE
        setFormUpdate(current => [...current,
          <FormUpdate produit={res} categories={respArr[0]} promotions={respArr[1]} index={index} updateTable={updateTable}/>
        ])
      })
      
      // Formulaire CREATE
      setFormCreate(
        <FormCreate categories={respArr[0]} promotions={respArr[1]} reload={reload} setReload={setReload} close={closeModal}/>
      )

      // Fin du chargement
      setIsLoading(false)
    })
  },[reload])

  // Update le formulaire et la row update
  const updateTable = (produit, produitAfter, categs, promos, index, pathImageDefault) => {
    produit.name = produitAfter.name
    produit.description = produitAfter.description
    produit.pathImage = produitAfter.infoFile !== undefined ? produitAfter.infoFile.name : pathImageDefault
    produit.id_categorie = produitAfter.categorie
    produit.name_categorie = categs.data.find(element => element.id == produitAfter.categorie).name
    produit.is_trend = produitAfter.trend
    produit.is_available = produitAfter.available
    produit.price = produitAfter.price
    produit.promotion.id = produitAfter.promotion
    produit.promotion.remise = promos.data.find(element => element.id == produitAfter.promotion).remise
    produit.stockBySize[0].stock = produitAfter.stock.xs
    produit.stockBySize[1].stock = produitAfter.stock.s
    produit.stockBySize[2].stock = produitAfter.stock.m
    produit.stockBySize[3].stock = produitAfter.stock.l
    produit.stockBySize[4].stock = produitAfter.stock.xl
    // Modifier le modal update de la row concernée
    setFormUpdate(current => [
      ...current.slice(0, index),
      <FormUpdate produit={produit} categories={categs} promotions={promos} index={index} updateTable={updateTable}/>,
      ...current.slice(index+1)
    ])
    console.log(index);
    // Modifier la row concernée par l'update
    setRows(current => [
      ...current.slice(0, index),
      [
        produit.id,
        produit.name,
        produit.price.toFixed(2) + ' €',
        produit.description,
        produit.noteAverage ? produit.noteAverage.toFixed(1) + '/5' : '-',
        produit.stockBySize.reduce((accumulator, currentValue) => accumulator + currentValue.stock, 0),
        produit.name_categorie, 
        produit.promotion.remise > 0 ? produit.promotion.remise + ' %' : '-',
        produit.created_at.date,
        <img className='object-contain h-10 m-auto hover:absolute hover:scale-[10.0] hover:z-50' src={window.location.origin + '/src/app/assets/images/products/' + produit.pathImage} alt={produit.name}/>,
        <input className='h-8 w-8 lg:h-10 lg:w-10 bish-text-blue' type="checkbox" defaultChecked={produit.is_trend} id={`checkTrend${produit.id}`} onClick={() => changeIsTrend(produit, categs, promos, index)}/>,
        <input className='h-8 w-8 lg:h-10 lg:w-10 bish-text-blue' type="checkbox" defaultChecked={produit.is_available} id={`checkAvailable${produit.id}`} onClick={() => changeIsAvailable(produit, categs, promos, index)}/>
      ],
      ...current.slice(index+1)
    ])
  }

  // Change tendance dans la BDD
  const changeIsTrend = (produit, categs, promos, index) => {
    let isTrend = document.getElementById('checkTrend' + produit.id).checked
    apiBackEnd.post(`${URL_BACK_UPDATE_TREND_PRODUCT}${produit.id}/${isTrend}/`).then(res => {
      produit.is_trend = !produit.is_trend
      // Modifier la checkbox "tendance" du FormUpdate
      setFormUpdate(current => [
        ...current.slice(0, index),
        <FormUpdate produit={produit} categories={categs} promotions={promos} index={index} updateTable={updateTable}/>,
        ...current.slice(index+1)
      ])
      if (isTrend) {
        toast.success(`Produit ${res.data.id} est en tendance !`, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light" })
      } else {
        toast.success(`Produit ${res.data.id} n'est plus en tendance !`, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light" })
      }
    })
  }

  // Change available dans la BDD
  const changeIsAvailable = (produit, categs, promos, index) => {
    let isAvailable = document.getElementById('checkAvailable' + produit.id).checked
    apiBackEnd.post(`${URL_BACK_UPDATE_AVAILABLE_PRODUCT}${produit.id}/${isAvailable}/`).then(res => {
      produit.is_available = !produit.is_available
      // Modifier la checkbox "visible" du FormUpdate
      setFormUpdate(current => [
        ...current.slice(0, index),
        <FormUpdate produit={produit} categories={categs} promotions={promos} index={index} updateTable={updateTable}/>,
        ...current.slice(index+1)
      ])
      if (isAvailable) {
        toast.success(`Produit ${res.data.id} est visible!`, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light" })
      } else {
        toast.success(`Produit ${res.data.id} n'est plus visible !`, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light" })
      }
    })
  }

  // DELETE élément dans la BDD
  const deleteRow = id => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer le produit ${id} ?`)) {
      apiBackEnd.delete(URL_BACK_DELETE_PRODUCT + id).then(res => {
        if (res.status === 200) {
          // Supprimer l'elément delete de la table
          setRows(rows.filter(res => res[0] !== id))
          // Notification produit supprimé
          toast.success(`Produit ${id} supprimé!`, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light" })
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
        <title>Bish - Admin Produits</title>
      </Helmet>
      {/* Notifications */}
      <ToastContainer />
      {/* TITRE + BUTTON AJOUTER */}
      <div className='flex flex-row shadow fixed top-0 right-0 mt-20 bish-bg-white w-full z-10'>
        <div className='w-12 sm:w-72'></div>
        <div className='flex flex-row justify-between space-x-5 h-20 w-full px-10'>
          <span className='text-center my-auto text-2xl font-medium'>PRODUITS</span>
          <input className='w-1/3 h-10 my-auto' type="text" id="searchInput" onKeyUp={() => search()} placeholder="Rechercher.."/>
          <button className='my-auto bg-green-600 p-2 bish-text-white font-medium' onClick={() => openModal()}>
            <img className='h-5 lg:h-8' src={addIMG} alt="Ajouter" />
          </button>
        </div>
      </div>
      {/* Modal CREATE */}
      <ModalCrud modalIsOpen={modalIsOpen} openModal={openModal} closeModal={closeModal} form={formCreate}/>
      {/* TABLE PRODUITS */}
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
                    <img className='h-4' src={sortIMG} alt="Trier par ID" />
                  </div>
                </th>
                <th onClick={() => sort(1)}>
                  <div className={headSort}>
                    <span className={labelHeader} title='Nom'>Nom</span>
                    <img className='h-4' src={sortIMG} alt="Trier par ID" />
                  </div>
                </th>
                <th onClick={() => sort(2)}>
                  <div className={headSort}>
                    <span className={labelHeader} title='Prix'>Prix</span>
                    <img className='h-4' src={sortIMG} alt="Trier par ID" />
                  </div>
                </th>
                <th onClick={() => sort(3)}>
                  <div className={headSort}>
                    <span className={labelHeader} title='Description'>Description</span>
                    <img className='h-4' src={sortIMG} alt="Trier par ID" />
                  </div>
                </th>
                <th onClick={() => sort(4)}>
                  <div className={headSort}>
                    <span className={labelHeader} title='Note'>Note</span>
                    <img className='h-4' src={sortIMG} alt="Trier par ID" />
                  </div>
                </th>
                <th onClick={() => sort(5)}>
                  <div className={headSort}>
                    <span className={labelHeader} title='Stock'>Stock</span>
                    <img className='h-4' src={sortIMG} alt="Trier par ID" />
                  </div>
                </th>
                <th onClick={() => sort(6)}>
                  <div className={headSort}>
                    <span className={labelHeader} title='Catégorie'>Catégorie</span>
                    <img className='h-4' src={sortIMG} alt="Trier par ID" />
                  </div>
                </th>
                <th onClick={() => sort(7)}>
                  <div className={headSort}>
                    <span className={labelHeader} title='Promotion'>Promotion</span>
                    <img className='h-4' src={sortIMG} alt="Trier par ID" />
                  </div>
                </th>
                <th onClick={() => sort(8)}>
                  <div className={headSort}>
                    <span className={labelHeader} title='Date'>Date</span>
                    <img className='h-4' src={sortIMG} alt="Trier par ID" />
                  </div>
                </th>
                <th className={labelHeader} title='Tendance'>Image</th>
                <th className={labelHeader} title='Tendance'>Tendance</th>
                <th className={labelHeader} title='Visible'>Visible</th>
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

export default AdminProductsView
