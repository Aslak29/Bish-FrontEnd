import React, {useEffect, useState} from 'react'
import search from "../../assets/images/search.svg"
import apiBackEnd from "@/app/api/backend/api.Backend";
import {URL_PRODUIT_BY_SEARCHBAR} from "@/app/constants/urls/urlBackEnd";
import {URL_PRODUCT_LINK} from "@/app/constants/urls/urlFrontEnd";
import {useNavigate} from "react-router-dom";

const SearchBar = props => {

    const [searchBarDisplay, setSearchBarDisplay] = useState("hidden ");
    const [searchBarClick, setSearchBarClick] = useState(false);
    const [valueSearchBar, setValueSearchBar] = useState(null);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const toggleSearchBar = () =>{
        if(!searchBarClick){
            setSearchBarDisplay("block ");
            props.searchBarToggle(true);
            setSearchBarClick(!searchBarClick);
        }else{
            setSearchBarDisplay("hidden");
            setSearchBarClick(!searchBarClick);
            props.searchBarToggle(false);

        }
    }

    useEffect(() => {
        apiBackEnd.post(URL_PRODUIT_BY_SEARCHBAR + valueSearchBar).then(res => {
            setProducts(Object.values(res.data))
        }).catch(error => {
            console.log(error)
        })
    },[valueSearchBar])

    function onChangeValue(event){
        setValueSearchBar(event.target.value)
        if (event.target.value === ""){
            setValueSearchBar(null)
        }
    }

    function handleSearchBar(idProduct){
        console.log("test : " + idProduct)
        navigate(URL_PRODUCT_LINK + idProduct)
        navigate(0)
    }

  return (

    <div className="h-8 my-auto mx-0 flex flex-col space-x-3 sm:space-x-6 lg:w-4/6 xl:w-auto">
          <form action="#" className={`${searchBarDisplay} lg:block`}>
            <input 
              className={`h-8 rounded-full border-transparent w-40 sm:w-64 md:w-96 lg:w-72 xl:w-96`}
              type="search" 
              name="searchbar" 
              id="searchbar"
              onChange={onChangeValue}
              placeholder="Rechercher..."/>
            <input type="submit" value="" className="hidden"/>
          </form>
            <button className="lg:hidden" onClick={toggleSearchBar}>
              <img
                  className="h-8 w-auto cursor-pointer"
                  src={search}
                  alt="Recherche"/> 
            </button>

        {
            valueSearchBar !== null &&

            products.map((product)  => {
             return (
                 <div className={'flex flex-raw items-center justify-between sm:w-72 shadow-xl h-44 bg-white cursor-pointer'} onClick={() => handleSearchBar(product.id)} key={product.id}>
                     <img className={'h-12'} src={window.location.origin + '/src/app/assets/images/products/' + product.pathImage} alt={product.name}/>
                     <span>{product.name}</span>
                     <span>{product.price} €</span>
                 </div>
             )
            }
            )
        }

        </div>
  )
}

export default SearchBar