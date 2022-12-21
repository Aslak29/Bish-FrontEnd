import React, { useState } from 'react'
import search from "../../assets/images/search.svg"

const SearchBar = props => {
    const [searchBarDisplay, setSearchBarDisplay] = useState("hidden ");
    const [searchBarClick, setSearchBarClick] = useState(false);
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
  return (
    <div className="h-8 my-auto mx-0 flex flex-row space-x-3 sm:space-x-6 lg:w-4/6 xl:w-auto">
          <form action="#" className={`${searchBarDisplay} lg:block`}>
            <input 
              className={`h-8 rounded-full border-transparent w-40 sm:w-64 md:w-96 lg:w-72 xl:w-96`}
              type="search" 
              name="searchbar" 
              id="searchbar" 
              placeholder="Rechercher..."/>
            <input type="submit" value="" className="hidden"/>
          </form>
            <button className="lg:hidden" onClick={toggleSearchBar}>
              <img
                  className="h-8 w-auto cursor-pointer"
                  src={search}
                  alt="Recherche"/> 
            </button>
        </div>
  )
}

export default SearchBar