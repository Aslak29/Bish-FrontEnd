import React, { useEffect, useState } from 'react'
// import apiBackEnd from '../../api/backend/api.Backend';
import loadingSVG from '../../assets/images/loading-spin.svg'
import { ToastContainer, toast } from 'react-toastify';
import TableRow from './../../components/admin/TableRow';
import ModalCrud from '../../components/admin/ModalCrud';
import { search, sort } from '../../services/adminServices';
import sortIMG from '../../assets/images/trier.png'
import addIMG from '../../assets/images/add.png'
// import { URL_BACK_PRODUCTS, URL_BACK_CATEGORIES, URL_BACK_PROMOS, URL_BACK_DELETE_PRODUCT } from '../../constants/urls/urlBackEnd';
import FormUpdate from '../../components/admin/users/FormUpdate';
import FormCreate from '../../components/admin/users/FormCreate';

const AdminUsersView = () => {
  
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

    // useEffect(() => {
    //   // Permet d'afficher le SVG de chargement
    //   setIsLoading(true)
    //   // Récupération des données
     
    //   .then(respArr => {
    //     // Set le contenu d'une row (à mettre dans l'ordre voulu)
    //     respArr[2].data.map((res) => setRows(current => [...current, [
    //       res.id,
    //       res.name,
    //       res.surname,
    //       res.email,
    //       res.roles,
    //       res.telephone, 
    //       res.created_at.date,
    //     ]]))
  
    //     respArr[2].data.map((res) => {
    //       // Formulaire UPDATE
    //       setFormUpdate(current => [...current,
    //         // <FormUpdate produit={res} categories={respArr[0]} promotions={respArr[1]}/>
    //       ])
    //     })
        
    //     // Formulaire CREATE
    //     setFormCreate(
    //       // <FormCreate categories={respArr[0]} promotions={respArr[1]}/>
    //     )
  
    //     // Fin du chargement
    //     setIsLoading(false)
    //   })
    // },[])
    useState(()=>{ 
      setRows([[
        "id",
        "name",
        "surname",
        "email",
        "roles",
        "0000000",
        "12-12-2022",
       ],[
        "id",
        "name",
        "surname",
        "email",
        "roles",
        "0000000",
        "12-12-2022",
       ]]);
  },[])
 
  

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
                  <span className={labelHeader} title='Prenom'>Prenom</span>
                  <img className='h-4' src={sortIMG} alt="Trier par ID" />
                </div>
              </th>
              <th onClick={() => sort(2)}>
                <div className={headSort}>
                  <span className={labelHeader} title='Nom'>Nom</span>
                  <img className='h-4' src={sortIMG} alt="Trier par ID" />
                </div>
              </th>
              <th onClick={() => sort(3)}>
                <div className={headSort}>
                  <span className={labelHeader} title='Email'>Email</span>
                  <img className='h-4' src={sortIMG} alt="Trier par ID" />
                </div>
              </th>
              <th onClick={() => sort(4)}>
                <div className={headSort}>
                  <span className={labelHeader} title='Roles'>Roles</span>
                  <img className='h-4' src={sortIMG} alt="Trier par ID" />
                </div>
              </th>
              <th onClick={() => sort(5)}>
                <div className={headSort}>
                  <span className={labelHeader} title='Telephone'>Telephone</span>
                  <img className='h-4' src={sortIMG} alt="Trier par ID" />
                </div>
              </th>
              <th onClick={() => sort(6)}>
                <div className={headSort}>
                  <span className={labelHeader} title='Crée'>Crée le</span>
                  <img className='h-4' src={sortIMG} alt="Trier par ID" />
                </div>
              </th>
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

export default AdminUsersView