import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import arrow from '../../assets/images/arrow-left.png'
import filter from '../../assets/images/filter.png'
import Filtre from "./Filtre";

const ProductsContainer = () => {

    const [filterClick, setFilterClick] = useState(false);
    const [filterDisplay, setFilterDisplay] = useState('hidden');
    const [filterCloseDisplay, setFilterCloseDisplay] = useState('hidden');

    const [filterValue, setFilterValue] = useState([]);


    const toggleFilter = () => {
        if (!filterClick) {
            setFilterClick(true)
            setFilterDisplay('block')
            setFilterCloseDisplay('block')
        } else {
            setFilterClick(false)
            setFilterDisplay('hidden')
            setFilterCloseDisplay('hidden')
        }
    }

    const closeFilter = () => {
        if (filterClick) {
            toggleFilter()
        }
    }

    const temp = {
        id: 1,
        name: "Blouson noir",
        price: 29
    }

    const filterChoice = (orderBy, note) => {
        setFilterValue([orderBy, note])
    }

    useEffect(() => {
        // TODO: ACTUALISER LISTE PRODUITS AVEC API
      },[filterValue])

  return (
    <div className='space-y-6'>
        <div className={`${filterCloseDisplay} bish-bg-gray h-full w-full absolute top-0 left-0 z-30 opacity-0`} onClick={() => closeFilter()}/>
        <div className={`${filterDisplay} fixed top-0 right-0 z-40 h-full border bish-border-gray pr-20 bish-bg-white pl-5`}>
            <Filtre closeFilter={() => closeFilter()} filter={filterChoice}/>
        </div>
        <div className='flex flex-row justify-between'>
            <div className='flex flex-row items-center'>
                <img className='h-5' src={arrow} alt="Retour" />
                <h1 className='text-2xl ml-3'>Vêtement Homme</h1>
            </div>
            <button className='flex flex-row border bish-border-gray rounded-2xl px-4 py-2 items-center' onClick={() => toggleFilter()}>
                <img className='h-5' src={filter} alt="Filtrer et trier" />
                <span className=''>Filtrer et trier</span>
            </button>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-5 gap-4'>
            <ProductCard produit={temp}/>
            <ProductCard produit={temp}/>
            <ProductCard produit={temp}/>
            <ProductCard produit={temp}/>
            <ProductCard produit={temp}/>
            <ProductCard produit={temp}/>
            <ProductCard produit={temp}/>
            <ProductCard produit={temp}/>
            <ProductCard produit={temp}/>
            <ProductCard produit={temp}/>
        </div>
    </div>
  )
}

export default ProductsContainer