import React, { useEffect, useState } from 'react'
import axios from 'axios';
import apiBackEnd from '../../api/backend/api.Backend';
import sortIMG from '../../assets/images/trier.png'
import addIMG from '../../assets/images/add.png'
import loadingSVG from '../../assets/images/loading-spin.svg'
import TableRow from './../../components/admin/TableRow';
import ModalCrud from '../../components/admin/ModalCrud';
import { search, sort } from '../../services/adminServices';
import { Field, Form, Formik } from "formik";
import {  } from '../../constants/urls/urlBackEnd';

const AdminTemplate = () => {

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
    const [modalIsOpen, setIsOpen] = React.useState(false);

    useEffect(() => {
        // Permet d'afficher le SVG de chargement
        setIsLoading(true)
        // Récupération des données
        axios.all([
        // TODO: SI PLUSIEURS APPEL API: METTRE ICI
        apiBackEnd.get(),
        apiBackEnd.get(),
        apiBackEnd.get()
        ])
        .then(respArr => {
        // TODO: EXEMPLE: METTRE LES ELEMENT DANS L'ORDRE D'AFFICHAGE DANS UNE ROW
        // Set le contenu d'une row (à mettre dans l'ordre voulu)
        respArr[2].data.map((res) => setRows(current => [...current, [
            res.id,
            res.name,
            res.price.toFixed(2) + ' €',
            <img className='object-contain h-10 m-auto hover:absolute hover:scale-[10.0] hover:z-50' src={window.location.origin + '/src/app/assets/images/products/' + res.pathImage} alt={res.name}/>,
            <input className='h-8 w-8 lg:h-10 lg:w-10 bish-text-blue' type="checkbox" defaultChecked={res.is_trend}/>,
        ]]))

        respArr[2].data.map((res) => {
            // TODO: FORMULAIRE AFFICHE DANS LE MODAL UPDATE
            // Formulaire UPDATE
            setFormUpdate(current => [...current,
                <Formik
                    initialValues={{
                    // TODO: DEFINIR LES VALEURS INITIALES
                    name: res.id,
                    description: res.name
                    }}
                    onSubmit={(values) => updateRow(res.id, values)}
                >
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
                        {/* Button Modifier */}
                        <button type="submit" className="bish-bg-blue py-3 w-full bish-text-white col-span-4 mx-auto">Modifier</button>
                    </Form>
                </Formik>
            ])
        })
      
        // TODO: FORMULAIRE AFFICHE DANS LE MODAL CREATE
        // Formulaire CREATE
        setFormCreate(
            <Formik
                initialValues={{
                // TODO: DEFINIR LES VALEURS INITIALES
                name: '',
                description: '',
                }}
                onSubmit={(values) => console.log(values)}
            >
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
                        {/* Button Modifier */}
                        <button type="submit" className="bish-bg-blue py-3 w-full bish-text-white col-span-4 mx-auto">Ajouter</button>
                </Form>
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
      console.log(id)
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
    <div>
        <div className='w-full ml-12 sm:ml-64'>
            {/* TITRE + BUTTON AJOUTER */}
            <div className='flex flex-row shadow fixed top-0 right-0 mt-20 bish-bg-white w-full z-10'>
                <div className='w-12 sm:w-72'></div>
                <div className='flex flex-row justify-between space-x-5 h-20 w-full px-10'>
                    {/* TODO: NOM DE L'ENTITE */}
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
                    {/* TODO: EXEMPLE HEADER SI IL PEUT ETRE TRIER */}
                    <th onClick={() => sort(0)}>
                      <div className={headSort}>
                        <span className={labelHeader} title='Id'>Id</span>
                        <img className='h-4' src={sortIMG} alt="Trier par ID" />
                      </div>
                    </th>
                    <th onClick={() => sort(3)}>
                      <div className={headSort}>
                        <span className={labelHeader} title='Description'>Description</span>
                        <img className='h-4' src={sortIMG} alt="Trier par ID" />
                      </div>
                    </th>
                    {/* TODO: EXEMPLE HEADER SI IL PEUT PAS ETRE TRIER */}
                    <th className={labelHeader} title='Tendance'>Image</th>
                    <th className={labelHeader} title='Tendance'>Tendance</th>
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
    </div>
  )
}

export default AdminTemplate