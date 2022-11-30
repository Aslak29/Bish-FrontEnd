import React, { useState, useEffect} from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import imageTest from '../assets/images/imageTest.jpeg';
import apiBackend from "../api/backend/api.Backend";
import {URL_BACK_BLOG, URL_BACK_CATEGORIES_TREND, URL_BACK_PRODUCT, URL_BACK_PRODUCT_TREND} from "../constants/urls/urlBackEnd";

const Slide = () => {
    const [blog,setBlog] = useState([]);
    const [categories,setCategories]= useState([]);
    const [promotions,setPromotions]= useState([]);
    const [productIsTrend,setProductIsTrend]= useState([]);

// J'importe les données des catégories qui sont tendances
    useEffect(()=>{
        apiBackend.get(URL_BACK_CATEGORIES_TREND).then((response =>{
            setCategories(response.data);
            // console.log(response.data);
        }))
    }, []);
    // J'importe mes données des produits en promo
    useEffect(()=>{
        apiBackend.get(URL_BACK_PRODUCT).then((response =>{
            setPromotions(response.data);
            // console.log(response.data);
        }))
    }, []);

    // J'importe mes données des produits qui sont tendances

    useEffect(()=>{
        apiBackend.post(URL_BACK_PRODUCT_TREND).then((response =>{
            setProductIsTrend(response.data);
            console.log(response.data);
        }))
    }, []);

        // J'importe mes données des articles de blog

    useEffect(() => {
        apiBackend.get(URL_BACK_BLOG).then((response => {
            console.log(response);
            setBlog(response.data);
            console.log(response.data);
        }))
    },[])

        return (
            // showThumbs={false} permet de cacher les vignettes du carousel
            <Carousel autoPlay interval="5000" transitionTime="2000" showStatus={false} stopOnHover={true} showThumbs={false} className='w-full '>
                <div className='absolute flex flex-row justify-center items-center w-full '>
                    <p className='absolute left-4 top-1/4 sm:font-thin'>Nouvelle collection</p>
                    <img src={imageTest} alt="slide" className=' w-full'/>
                    <button className="absolute  right-10 border-2 border-black h-fit flex content-start p-2 font-semibold">Je découvre</button>
                </div>
                <div className='flex flex-row justify-center items-center'>
                    <p className='absolute left-4 top-1/4'>Nouveau produit</p>
                    <img src={imageTest} alt="" className='w-full'/>
                    <button className="absolute  right-10 border-2 border-black h-fit flex content-start p-2 font-semibold">Je découvre</button>
                </div>                
                <div className='flex flex-row justify-center items-center'>
                    <p className='absolute left-4 top-1/4'>Nouvel article de blog</p>
                    <img src={imageTest} alt="" className='w-full'/>
                    <button className="absolute  right-10 border-2 border-black h-fit flex content-start p-2 font-semibold">Je découvre</button>
                </div>
            </Carousel>
        );
    }

export default Slide;