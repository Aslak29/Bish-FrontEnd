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
import { Field, Form, Formik } from "formik";
import { URL_BACK_PRODUCTS, URL_BACK_CATEGORIES, URL_BACK_PROMOS, URL_BACK_DELETE_PRODUCT } from '../../constants/urls/urlBackEnd';

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
  // Reload du useEffect au changement
  const [relaodApiCall, setRelaodApiCall] = useState(false);

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
      // Set le contenu d'une row (à mettre dans l'ordre voulu)
      respArr[2].data.map((res) => setRows(current => [...current, [
        res.id,
        res.name,
        res.price.toFixed(2) + ' €',
        res.description,
        // TODO: note average
        '4.3/5',
        res.stockBySize.reduce((accumulator, currentValue) => accumulator + currentValue.stock, 0),
        res.name_categorie, 
        res.promotion.remise + ' %',
        res.created_at.date,
        <img className='object-contain h-10 m-auto hover:absolute hover:scale-[10.0] hover:z-50' src={window.location.origin + '/src/app/assets/images/products/' + res.pathImage} alt={res.name}/>,
        <input className='h-8 w-8 lg:h-10 lg:w-10 bish-text-blue' type="checkbox" defaultChecked={res.is_trend}/>,
        <input className='h-8 w-8 lg:h-10 lg:w-10 bish-text-blue' type="checkbox" defaultChecked={res.is_available}/>
      ]]))

      respArr[2].data.map((res) => {
        // Objet STOCK qui se créer dynamiquement pour utiliser dans les initialValues Formik UPDATE
        const stockWithSize = {}
        res.stockBySize.map(resStock => stockWithSize[resStock.taille.toLowerCase()] = resStock.stock)
        // Formulaire UPDATE
        setFormUpdate(current => [...current,
          <Formik
            initialValues={{
            name: res.name,
            price: res.price,
            description: res.description,
            stockWithSize,
            categorie: res.id_categorie,
            promotion: res.promotion.id,
            trend: res.is_trend,
            available: res.is_available
            }}
            onSubmit={(values) => updateRow(res.id, values)}
          >
            {props =>
              <Form className="grid grid-cols-2 sm:grid-cols-4 gap-4">        
                  {/* Nom */}
                  <div className="flex flex-col h-20">
                    <span>Nom</span>
                    <Field className='h-full' type="text" name="name"/>
                  </div>
                  {/* Description */}
                  <div className="flex flex-col col-span-2 row-span-2">
                    <span>Description</span>
                    <Field className='h-full' as="textarea" type="text" name="description" required/>
                  </div>
                  {/* Preview de l'image */}
                  <div className="preview row-span-4 h-96 shadow-lg">
                    <img className='object-contain h-full w-full' id="img-preview" alt='Prévisualisation' src={window.location.origin + '/src/app/assets/images/products/' + res.pathImage}/>
                  </div>
                  {/* Prix */}
                  <div className="flex flex-col h-20">
                    <span>Prix (en euros)</span>
                    <Field className='h-full' type="number" name="price"/>
                  </div>
                  {/* Stock */}
                  <div className="flex flex-row h-20">
                    {
                      res.stockBySize.map(resStock => 
                      <div className="flex flex-col w-1/5 h-full" key={resStock.taille}>
                        <span>{resStock.taille.toUpperCase()}</span>
                        <Field className='h-full' type="number" name={'stockWithSize.' + resStock.taille.toLowerCase()} required/>
                      </div>
                    )}
                  </div>
                  {/* Catégorie */}
                  <div className="flex flex-col h-20">
                    <span>Catégorie</span>
                    <Field className='h-full' name="categorie" as="select">
                      <option value='-'>-</option>
                      {respArr[0].data.map(resCateg => <option key={resCateg.id} value={resCateg.id}>{resCateg.name}</option>)}
                    </Field>
                  </div>
                  {/* Promotion */}
                  <div className="flex flex-col h-20">
                    <span>Promotion</span>
                    <Field className='h-full' name="promotion" as="select">
                      <option value='-'>-</option>
                      {respArr[1].data.map(resPromo => <option key={resPromo.id} value={resPromo.id}>{resPromo.remise} %</option>)}
                    </Field>
                  </div>
                  {/* Tendance et Visible */}
                  <div className="flex flex-row h-20 justify-around">
                    <div className="flex flex-col h-full justify-center align-items-center">
                      <span>Tendance</span>
                      <Field className='h-8 w-8 lg:h-10 lg:w-10 bish-text-blue m-auto' type="checkbox" name="trend"/>
                    </div>
                    <div className="flex flex-col h-full justify-center align-items-center">
                      <span>Visible</span>
                      <Field className='h-8 w-8 lg:h-10 lg:w-10 bish-text-blue m-auto' type="checkbox" name="available"/>
                    </div>      
                  </div>
                  <div></div>
                  {/* Image */}
                  <div className="flex flex-col h-20">
                    <span>Image</span>
                    <Field className='my-auto' accept="image/*" type="file" name="file" onChange={e => {showPreview(e); props.setFieldValue('infoFile', e.currentTarget.files[0])}}/>
                  </div>
                  {/* Button Modifier */}
                  <button type="submit" className="bish-bg-blue py-3 w-full bish-text-white col-span-4 mx-auto">Modifier</button>
              </Form>
            }     
          </Formik>
        ])
      })
      
      // Formulaire CREATE
      const stock = {
        xs: 0,
        s: 0,
        m: 0,
        l: 0,
        xl: 0,
      }
      setFormCreate(
        <Formik
          initialValues={{
          name: '',
          price: '',
          description: '',
          stock,
          categorie: '',
          promotion: '',
          trend: false,
          available: false
          }}
          onSubmit={(values) => console.log(values)}
        >
          {props =>
            <Form className="grid grid-cols-2 sm:grid-cols-4 gap-4">        
                {/* Nom */}
                <div className="flex flex-col h-20">
                  <span>Nom</span>
                  <Field className='h-full' type="text" name="name"/>
                </div>
                {/* Description */}
                <div className="flex flex-col col-span-2 row-span-2">
                  <span>Description</span>
                  <Field className='h-full' as="textarea" type="text" name="description" required/>
                </div>
                {/* Preview de l'image */}
                <div className="preview row-span-4 h-96 shadow-lg">
                  <img className='hidden object-contain h-full w-full' id="img-preview" alt='Prévisualisation'/>
                </div>
                {/* Prix */}
                <div className="flex flex-col h-20">
                  <span>Prix (en euros)</span>
                  <Field className='h-full' type="number" name="price"/>
                </div>
                {/* Stock */}
                <div className="flex flex-row h-20">
                  {
                   Object.entries(stock).map(([key, value]) => 
                    <div className="flex flex-col w-1/5 h-full" key={key}>
                      <span>{key.toUpperCase()}</span>
                      <Field className='h-full' type="number" name={'stock.' + key.toLowerCase()} required/>
                    </div>
                  )}
                </div>
                {/* Catégorie */}
                <div className="flex flex-col h-20">
                  <span>Catégorie</span>
                  <Field className='h-full' name="categorie" as="select">
                    <option value='-'>-</option>
                    {respArr[0].data.map(resCateg => <option key={resCateg.id} value={resCateg.id}>{resCateg.name}</option>)}
                  </Field>
                </div>
                {/* Promotion */}
                <div className="flex flex-col h-20">
                  <span>Promotion</span>
                  <Field className='h-full' name="promotion" as="select">
                    <option value='-'>-</option>
                    {respArr[1].data.map(resPromo => <option key={resPromo.id} value={resPromo.id}>{resPromo.remise} %</option>)}
                  </Field>
                </div>
                {/* Tendance et Visible */}
                <div className="flex flex-row h-20 justify-around">
                  <div className="flex flex-col h-full justify-center align-items-center">
                    <span>Tendance</span>
                    <Field className='h-8 w-8 lg:h-10 lg:w-10 bish-text-blue m-auto' type="checkbox" name="trend"/>
                  </div>
                  <div className="flex flex-col h-full justify-center align-items-center">
                    <span>Visible</span>
                    <Field className='h-8 w-8 lg:h-10 lg:w-10 bish-text-blue m-auto' type="checkbox" name="available"/>
                  </div>      
                </div>
                <div></div>
                {/* Image */}
                <div className="flex flex-col h-20">
                  <span>Image</span>
                  <Field className='my-auto' accept="image/*" type="file" name="file" onChange={e => {showPreview(e); props.setFieldValue('infoFile', e.currentTarget.files[0])}}/>
                </div>
                {/* Button Modifier */}
                <button type="submit" className="bish-bg-blue py-3 w-full bish-text-white col-span-4 mx-auto">Ajouter</button>
            </Form>
          }
        </Formik>
      )

      // Fin du chargement
      setIsLoading(false)
    })
  },[])

  // UPDATE élément dans la BDD
  const updateRow = (id, values) => {
    console.log(values);
  }
  
  // DELETE élément dans la BDD
  const deleteRow = id => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer le produit ${id} ?`)) {
      apiBackEnd.delete(URL_BACK_DELETE_PRODUCT + id).then(res => {
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
            theme: "light",
          })
        }
      }).catch(error => {
        if(error.response.data.errorCode === '006') {
          // Notification produit en cours de commande
          toast.warn(error.response.data.errorMessage, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
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

  // Preview de l'image dans input type file
  const showPreview = e => {
    if(e.target.files.length > 0){
      var src = URL.createObjectURL(e.target.files[0]);
      var preview = document.getElementById("img-preview");
      preview.src = src;
      preview.style.display = "block";
    }
  }

  return (
    <div className='w-full ml-12 sm:ml-64'>
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
