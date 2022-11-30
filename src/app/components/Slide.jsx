import React, { useState, useEffect} from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import imageTest from '../assets/images/imageTest.jpeg';
import apiBackend from "../api/backend/api.Backend";
import {URL_BACK_BLOG_LAST_ARTICLE, URL_BACK_CATEGORIES_TREND, URL_BACK_PRODUCT_BEST_PROMO, URL_BACK_PRODUCT_TREND} from "../constants/urls/urlBackEnd";

const Slide = () => {
    const [categories,setCategories]= useState('');
    const [promotions,setPromotions]= useState('');
    const [trend,setTrend]= useState('');
    const [blog,setBlog] = useState('');

    // J'importe mes données
    useEffect(()=>{
        // La catégorie tendance
        apiBackend.get(URL_BACK_CATEGORIES_TREND).then((response =>{
            const imgCategorieTrend = response.data[0].pathImage;
            setCategories(imgCategorieTrend);
        }))
        
    // Le produit avec la meilleure promo
        apiBackend.get(URL_BACK_PRODUCT_BEST_PROMO).then((response =>{
            const imgProductPromo = response.data[0].path_image;
            setPromotions(imgProductPromo);
            console.log("meilleure promo");
        }))

        // Les deux produits tendances
        apiBackend.post(URL_BACK_PRODUCT_TREND).then((response =>{
            setTrend(response.data);
            console.log("2 produits tendances aléatoires");
            console.log(response.data);
        }))

        // Le dernier article de blog
        apiBackend.get(URL_BACK_BLOG_LAST_ARTICLE).then((response => {
            const imgLastArticleBlog = response.data[0].path_image;
            setBlog(imgLastArticleBlog);
            console.log("Dernier article du blog");
            console.log(response.data);
        }))

    }, []);
    console.log(promotions);
        return (
            
            // showThumbs={false} permet de cacher les vignettes du carousel
            <Carousel autoPlay interval="5000" transitionTime="2000" showStatus={false} stopOnHover={true} showThumbs={false} className='w-full '>
                
                {/* Slide 1 = catégorie tendance */}
                <div className='absolute flex flex-row justify-center items-center w-full '>
                
                    <p className='absolute left-4 top-1/4 sm:font-thin'>Catégorie tendance du moment</p>
                    <img src={window.location.origin + "/src/app/assets/images/categories/fullsize/" +  `${categories}`} alt="slide" className=' w-full'/>
                    <button className="absolute  right-10 border-2 border-black h-fit flex content-start p-2 font-semibold">Je découvre</button>
                </div>

                {/* Slide 2 = meilleure promo*/}
                <div className='flex flex-row justify-center items-center'>
                    <p className='absolute left-4 top-1/4'>Meilleure promo du moment</p>
                    <img src={window.location.origin + "/src/app/assets/images/promotions" +  `${promotions}`} alt="" className='w-full'/>
                    <button className="absolute  right-10 border-2 border-black h-fit flex content-start p-2 font-semibold">Je découvre</button>
                </div>                
                
                
                {/* Slide 3 = les 2 produits tendances aléatoires*/}

                <div className='flex flex-row justify-center items-center'>
                    <p className='absolute left-4 top-1/4'>C'est tendance!</p>
                    <img src={window.location.origin + "/src/app/assets/images/promotions" +  `${trend[0].pathImage}`} alt="" className='w-full'/>
                    <button className="absolute  right-10 border-2 border-black h-fit flex content-start p-2 font-semibold">Je découvre</button>
                </div>



                {/* Slide 4 = Le dernier article de blog */}

                <div className='flex flex-row justify-center items-center'>
                    <p className='absolute left-4 top-1/4'>Nouvel article de blog</p>
                    <img src={window.location.origin + "/src/app/assets/images/blog" +  `${trend}`} alt="" className='w-full'/>
                    <button className="absolute  right-10 border-2 border-black h-fit flex content-start p-2 font-semibold">Je découvre</button>
                </div>
            </Carousel>
        );
    }

export default Slide;