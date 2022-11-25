import React, {useState} from 'react';
import {useEffect} from 'react';
import {URL_BACK_CATEGORIES} from "../../constants/urls/urlBackEnd";
import apiBackEnd from "../../api/backend/api.Backend";

const Categories = () => {
    const [categorie, setCategorie] = useState([])

    useEffect(() => {
        // Appel API pour charger les catégories
        apiBackEnd.get(URL_BACK_CATEGORIES).then(r => {
            setCategorie(r.data)
        }).catch(error => {
            console.log(error)
        })
    },[]);
    return(
        <div className="my-6 flex justify-center space-x-4 bish-text-gray ">
            {categorie.map(cat =>
            <div className="cursor-pointer group text-center">
                <img
                    className="rounded-full group-hover:border-2 bish-border-blue "
                    src={window.location.origin + '/src/app/assets/images/categories/' + cat.pathImage}
                    alt="Catégorie"
                />
                <p> {cat.name} </p>
            </div>
            )}
        </div>
    )
}

export default Categories
