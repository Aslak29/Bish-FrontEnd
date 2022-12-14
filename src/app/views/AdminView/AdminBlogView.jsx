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
import { URL_BACK_BLOG } from '../../constants/urls/urlBackEnd';

const AdminBlogView = () => {

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
        // setIsLoading(true)
        // Récupération des données
        axios.all([
        // TODO: SI PLUSIEURS APPEL API: METTRE ICI
        apiBackEnd.get(URL_BACK_BLOG),
        ])
        .then(respArr => {
          console.log(respArr[2]);
        // TODO: EXEMPLE: METTRE LES ELEMENT DANS L'ORDRE D'AFFICHAGE DANS UNE ROW
        // Set le contenu d'une row (à mettre dans l'ordre voulu)
        // respArr[2].data.map((res) => setRows(current => [...current, [
        //     res.id,
        //     res.name,
        //     res.price.toFixed(2) + ' €',
        //     <img className='object-contain h-10 m-auto hover:absolute hover:scale-[10.0] hover:z-50' src={window.location.origin + '/src/app/assets/images/products/' + res.pathImage} alt={res.name}/>,
        //     <input className='h-8 w-8 lg:h-10 lg:w-10 bish-text-blue' type="checkbox" defaultChecked={res.is_trend}/>,
        // ]]))

        // respArr[2].data.map((res) => {
        //     // TODO: FORMULAIRE AFFICHE DANS LE MODAL UPDATE
        //     // Formulaire UPDATE
        //     setFormUpdate(current => [...current,
        //         <Formik
        //             initialValues={{
        //             // TODO: DEFINIR LES VALEURS INITIALES
        //             name: res.id,
        //             description: res.name
        //             }}
        //             onSubmit={(values) => updateRow(res.id, values)}
        //         >
        //             <Form className="grid grid-cols-2 sm:grid-cols-4 gap-4">        
        //                 {/* Nom */}
        //                 <div className="flex flex-col h-20">
        //                     <span>Nom</span>
        //                     <Field className='h-full' type="text" name="name"/>
        //                 </div>
        //                 {/* Description */}
        //                 <div className="flex flex-col col-span-2 row-span-2">
        //                     <span>Description</span>
        //                     <Field className='h-full' as="textarea" type="text" name="description" required/>
        //                 </div>
        //                 {/* Button Modifier */}
        //                 <button type="submit" className="bish-bg-blue py-3 w-full bish-text-white col-span-4 mx-auto">Modifier</button>
        //             </Form>
        //         </Formik>
        //     ])
        // })
      
        // TODO: FORMULAIRE AFFICHE DANS LE MODAL CREATE
        // Formulaire CREATE
        // setFormCreate(
        //     <Formik
        //         initialValues={{
        //         // TODO: DEFINIR LES VALEURS INITIALES
        //         name: '',
        //         description: '',
        //         }}
        //         onSubmit={(values) => console.log(values)}
        //     >
        //         <Form className="grid grid-cols-2 sm:grid-cols-4 gap-4">        
        //                 {/* Nom */}
        //                 <div className="flex flex-col h-20">
        //                     <span>Nom</span>
        //                     <Field className='h-full' type="text" name="name"/>
        //                 </div>
        //                 {/* Description */}
        //                 <div className="flex flex-col col-span-2 row-span-2">
        //                     <span>Description</span>
        //                     <Field className='h-full' as="textarea" type="text" name="description" required/>
        //                 </div>
        //                 {/* Button Modifier */}
        //                 <button type="submit" className="bish-bg-blue py-3 w-full bish-text-white col-span-4 mx-auto">Ajouter</button>
        //         </Form>
        //     </Formik>
        // )

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
    <div>AdminBlogView</div>
  )
}

export default AdminBlogView
