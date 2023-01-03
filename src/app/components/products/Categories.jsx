import React, {useState} from 'react';
import {useEffect} from 'react';
import {URL_BACK_CATEGORIES} from "../../constants/urls/urlBackEnd";
import apiBackEnd from "../../api/backend/api.Backend";

const Categories = props => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        // Appel API pour charger les catégories
        apiBackEnd.get(URL_BACK_CATEGORIES).then(r => {
            setCategories(r.data)
        }).catch(error => {
            console.log(error)
        })
    },[]);


    return(
        <div className="gap-4 bish-text-gray w-full flex gap-6 snap-mandatory overflow-x-auto">
            {categories.map(cat => cat.countProduit > 0 &&
            <div className="cursor-pointer group text-center shrink-0" onClick={() => props.setCategorie(cat.id,cat.name)} key={cat.id}  >
                <img
                    className="rounded-full group-hover:border-4 bish-border-blue shadow-xl max-h-28"
                    src={window.location.origin + '/src/app/assets/images/categories/' + cat.pathImage}
                    alt="Catégorie"
                />
                <p className="text-sm md:text-lg font-medium"> {cat.name} </p>
            </div>
            )}
        </div>
    )
}

export default Categories
