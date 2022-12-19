import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import arrow from '../../assets/images/arrow-left.png'
import filter from '../../assets/images/filter.png'
import Filtre from "./Filtre";
import apiBackEnd from "../../api/backend/api.Backend";
import { URL_BACK_PRODUCT_FILTER } from '../../constants/urls/urlBackEnd';
import loadingSVG from '../../assets/images/loading-spin.svg'

const ProductsContainer = props => {

    const [filterClick, setFilterClick] = useState(false);
    const [filterDisplay, setFilterDisplay] = useState('hidden');
    const [filterCloseDisplay, setFilterCloseDisplay] = useState('hidden');
    const [filterValue, setFilterValue] = useState([]);
    const [priceRange, setPriceRange] = useState([0,200]);
    const [produits, setProduits] = useState([]);
    const [size,setSize] = useState("none");
    const [isLoading, setIsLoading] = useState(false);

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

    const filterChoice = (orderBy, note) => {
        setFilterValue([orderBy, note])
    }

    const priceRangeFilter = (priceRange) => {
        setPriceRange(priceRange)
    }

    const handleSize = (size) =>{
        setSize(size)
    }

    useEffect(() => {
        const callApi= () =>{
            setIsLoading(true)
            apiBackEnd.post(URL_BACK_PRODUCT_FILTER + `${filterValue[0]}`+ `/${filterValue[1]}`+ `/${priceRange[0]}`+ `/${priceRange[1]}` + `/${props.categorie[0]}` + `/${size}` + `/${props.limit}` + `/${props.page*20}`).then(r => {
            setIsLoading(false)
            props.setCountPage(r.data[1].count[0][1])
            setProduits(r.data[0]);
        }).catch(error => {
            console.log(error)
        })} 
        callApi()
      },[filterValue, priceRange,props.categorie,props.page,size])


  return (
    <div className='space-y-6'>
        <div className={`${filterCloseDisplay} bish-bg-gray h-full w-full absolute top-0 left-0 z-30 opacity-0`} onClick={() => closeFilter()}/>
        <div className={`${filterDisplay} fixed top-0 right-0 z-40 h-full border bish-border-gray pr-20 bish-bg-white pl-5`}>
            <Filtre closeFilter={() => closeFilter()} filter={filterChoice} priceRangeFilter={priceRangeFilter} setSize={handleSize}/>
        </div>
        <div className='flex flex-row justify-between'>
            <div className='flex flex-row items-center'>
                <img className='h-5 cursor-pointer' src={arrow} alt="Retour" onClick={() => props.backArrow()}/>
                <h1 className='text-2xl ml-3'>{props.categorie[1] ? <span>Vêtement {props.categorie[1]}</span> : 'Nos produits'}</h1>
            </div>
            <button className='flex flex-row border bish-border-gray rounded-2xl px-4 py-2 items-center' onClick={() => toggleFilter()}>
                <img className='h-5' src={filter} alt="Filtrer et trier" />
                <span className=''>Filtrer et trier</span>
            </button>
        </div>
        {isLoading ? (<img className='m-auto py-24' src={loadingSVG} alt="Chargement"></img>)
        : 
        (
            <div className='grid grid-cols-2 md:grid-cols-5 gap-4'>
            {produits.map((r) => <ProductCard key={r.id} produit={r}/>)}
            </div>
        )}
        
    </div>
  )
}

export default ProductsContainer;
