import React from 'react'
import sortIMG from '../../assets/images/trier.png'
import addIMG from '../../assets/images/add.png'
import loadingSVG from '../../assets/images/loading-spin.svg'
import TableRow from './../../components/admin/TableRow';
import { useEffect } from 'react';
import { useState } from 'react';
import { URL_BACK_PRODUCTS, URL_BACK_CATEGORIES } from '../../constants/urls/urlBackEnd';
import apiBackEnd from '../../api/backend/api.Backend';
import { Field, Form, Formik } from "formik";

const AdminProductsView = () => {

  // Style
  const headSort = 'flex py-5 justify-center items-center space-x-2 cursor-pointer'
  const labelHeader = 'truncate hover:text-clip'

  const [categorie, setCategorie] = useState()
  const [rows, setRows] = useState([])
  const [formUpdate, setFormUpdate] = useState([])

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true)
    apiBackEnd.get(URL_BACK_CATEGORIES).then(res => {
      setCategorie(res.data)
    })
  },[])

  useEffect(() => {
    if (categorie) {
      apiBackEnd.get(URL_BACK_PRODUCTS).then(res=> {
        setIsLoading(false)
        // Set le contenu d'un table row (à mettre dans l'ordre voulu)
        res.data.map((res) => setRows(current => [...current, [res.id, res.name, res.price.toFixed(2) + ' €', res.description, '4.3/5',
          res.stockBySize.reduce((accumulator, currentValue) => accumulator + currentValue.stock, 0),
          res.name_categorie, 
          res.promotion.remise + ' %', res.created_at.date,
          <input className='h-8 w-8 lg:h-10 lg:w-10 bish-text-blue' type="checkbox" defaultChecked={res.is_trend}/>,
          <input className='h-8 w-8 lg:h-10 lg:w-10 bish-text-blue' type="checkbox" defaultChecked={res.is_available}/>
        ]]))
        // Formulaire UPDATE dans le modal
        res.data.map((res) =>
          setFormUpdate(current => [...current,
            <Formik
              initialValues={{
              name: res.name,
              price: res.price,
              description: res.description,
              xs: res.stockBySize[0].stock,
              note: "",
              stock: "",
              categorie: res.id_categorie,
              promotion: "",
              date: "",
              }}
              onSubmit={() => console.log('submit')}
            >
              <Form className="grid grid-cols-2 sm:grid-cols-4 gap-4">        
                  {/* Nom */}
                  <div className="flex flex-col">
                    <span>Nom</span>
                    <Field type="text" name="name"/>
                  </div>
                  {/* Prix */}
                  <div className="flex flex-col">
                    <span>Prix (en euros)</span>
                    <Field type="number" name="price"/>
                  </div>
                  {/* Description */}
                  <div className="flex flex-col col-span-2">
                    <span>Description</span>
                    <Field as="textarea" type="text" name="description" required/>
                  </div>
                  {/* Stock */}
                  <div className='flex flex-row'>
                    {res.stockBySize.map(resStock => {
                      return (
                        <div className="flex flex-col w-1/5" key={resStock.taille}>
                          <span>{resStock.taille.toUpperCase()}</span>
                          <Field type="number" name={resStock.taille} required/>
                        </div>
                      )
                    })}

                  </div>
                  {/* Catégorie */}
                  <div className="flex flex-col">
                    <span>Catégorie</span>
                    <Field name="categorie" as="select">
                      <option value='-'>-</option>
                      {categorie.map(resCateg => <option key={resCateg.id} value={resCateg.id}>{resCateg.name}</option>)}
                    </Field>
                  </div>
                  <button type="submit" className="bish-bg-blue py-3 w-full bish-text-white">Modifier</button>
              </Form> 
            </Formik>
          ])
        )
      })
    }
  },[categorie])

  const updateRow = id => {

  }
  


  // Recherche dans la table
  const search = () => {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue, f;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("searchTable");
    tr = table.getElementsByTagName("tr");
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      for (f = 0; f < tr[i].getElementsByTagName("td").length-1; f++) {
        td = tr[i].getElementsByTagName("td")[f];
        if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
            break;
          } else {
            tr[i].style.display = "none";
          }
        }
      }
    }
  }

  // Trier le tableau au clic sur un header
  const sort = n => {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("searchTable");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 1; i < (rows.length - 1); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        /* Check if the two rows should switch place,
        based on the direction, asc or desc: */
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        // Each time a switch is done, increase this count by 1:
        switchcount ++;
      } else {
        /* If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again. */
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }

  return (
    <div className='w-full ml-12 sm:ml-64'>
      {/* TITRE + BUTTON AJOUTER */}
      <div className='flex flex-row shadow fixed top-0 right-0 mt-20 bish-bg-white w-full z-10'>
        <div className='w-12 sm:w-72'></div>
        <div className='flex flex-row justify-between space-x-5 h-20 w-full px-10'>
          <span className='text-center my-auto text-2xl font-medium'>PRODUITS</span>
          <input className='w-1/3 h-10 my-auto' type="text" id="searchInput" onKeyUp={() => search()} placeholder="Rechercher.."/>
          <button className='my-auto bg-green-600 p-2 bish-text-white font-medium'>
            <img className='h-5 lg:h-8' src={addIMG} alt="Ajouter" />
          </button>
        </div>
      </div>
      {/* TABLE PRODUITS */}
      {isLoading ? (<img className='absolute top-1/3 left-1/2' src={loadingSVG} alt="Chargement"></img>)
        : 
        (
          <table className="table-fixed w-full pl-5 mt-20" id="searchTable">
            <thead className='border-b-4 bish-border-gray sticky top-40 bish-bg-white'>
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
                <th className={labelHeader} title='Tendance'>Tendance</th>
                <th className={labelHeader} title='Visible'>Visible</th>
                {/* TH Actions à ne pas supprimer */}
                <th className={labelHeader} colSpan='2' title='Actions'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows && rows.map((res, index) => <TableRow key={index} element={res} formUpdate={formUpdate[res[0]-1]}/>)}
            </tbody>
          </table>
        )
      }
    </div>
  )
}

export default AdminProductsView