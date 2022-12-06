import React, { useState, useEffect} from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import imageTest from '../assets/images/imageTest.jpeg';
import {FastAverageColor} from "fast-average-color";
import apiBackend from "../api/backend/api.Backend";
import {URL_BACK_BLOG_LAST_ARTICLE, URL_BACK_CATEGORIES_TREND, URL_BACK_PRODUCT_BEST_PROMO, URL_BACK_PRODUCT_TREND} from "../constants/urls/urlBackEnd";

const Slide = () => {
    const [categories,setCategories]= useState('');
    const [promotions,setPromotions]= useState('');
    const [trend,setTrend]= useState([]);
    const [blog,setBlog] = useState('');
    const [colors, setColors] =useState([]);
    const [colorLeft, setColorLeft] =useState();
    const [colorRight, setColorRight] =useState();


    // const path = null;
        // -------------------------------J'importe mes données-------------------------------
    useEffect(()=>{
        // -------------------------------La catégorie tendance-------------------------------
        apiBackend.get(URL_BACK_CATEGORIES_TREND).then((response =>{
            const imgCategorieTrend = response.data[0].pathImage;
            setCategories(imgCategorieTrend);
        }))
        
        // -------------------------------Le produit avec la meilleure promo-------------------------------
        apiBackend.get(URL_BACK_PRODUCT_BEST_PROMO).then((response =>{
            const imgProductPromo = response.data[0].path_image;
            setPromotions(imgProductPromo);
            console.log(imgProductPromo);
        }))

        // -------------------------------Les deux produits tendances-------------------------------
        apiBackend.post(URL_BACK_PRODUCT_TREND).then((response =>{
            setTrend(response.data);
            console.log(response.data);
            const fac = new FastAverageColor();
            const container = document.querySelector('.slide-img');
            for(let i=0; i<response.data.length ; i++){
                fac.getColorAsync("../../src/app/assets/images/trends"+response.data[i].pathImage)
                    .then(color => {
                        container.style.backgroundColor = color.rgba;
                        container.style.color = color.isDark ? '#fff' : '#000';
                        if(i==0){
                            setColorLeft(color.hex);
                        }
                        if(i==1){
                            setColorRight(color.hex);
                        }
                        console.log(color);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        }))
        
        // -------------------------------Le dernier article de blog-------------------------------
        apiBackend.get(URL_BACK_BLOG_LAST_ARTICLE).then((response => {
            const imgLastArticleBlog = response.data[0].path_image;
            setBlog(imgLastArticleBlog);

        }))
        
        
    }, []);
    console.log(trend);

        return (
            
            // showThumbs={false} permet de cacher les vignettes du carousel
            <Carousel autoPlay interval="7000" transitionTime="2000" showStatus={false} stopOnHover={true} showThumbs={false} className='w-full'>

{/* Slide 3 = les 2 produits tendances aléatoires*/}

                <div    className='flex flex-row justify-around items-center w-full h-[54rem] gap-x-5' 
                        style={{background: `linear-gradient(90deg, ${colorLeft}, ${colorRight})` }}>
                        <p className='slide-title w-full fixed top-0 text-center font-bold text-2xl'>Produits tendances du moment!</p>
                        {Object.entries(trend).map(([key,value])=>{
                            return(
                                <div>
                                    <div className='slide-img flex flex-col w-full'>
                                        <img src={window.location.origin + "/src/app/assets/images/trends" +  `${value.pathImage}`} 
                                    alt="Tendance" 
                                    className='object-cover h-full'/>
                                    </div>
                                    <button className="btn-slide-bish w-auto h-auto px-4">
                                        Je découvre
                                    </button>
                                </div>
                                
                                )})}                        
                    </div>
{/* Slide 1 = catégorie tendance */}
                <div className='slide-default-bg flex flex-col justify-center w-full h-[54rem]'>
                    <p className='slide-title w-full fixed top-0 text-center font-bold text-2xl'>Catégorie tendance du moment</p>
                    <img src={window.location.origin + "/src/app/assets/images/categories/fullsize/" +  `${categories}`} alt="slide" className='h-full object-cover'/>
                    <button className="btn-slide-bish absolute right-10 w-auto px-4">Je découvre</button>
                </div>

{/* Slide 2 = meilleure promo*/}
                <div className='slide-default-bg flex flex-col justify-center h-[54rem]'>
                    <p className='slide-title w-full fixed top-0 text-center font-bold text-2xl'>Meilleure promo du moment</p>
                        <img src={window.location.origin + "/src/app/assets/images/promotions" +  `${promotions}`} alt="" className='h-full object-cover'/>
                    <button className="btn-slide-bish absolute right-10 w-auto px-4">Je découvre</button>
                </div>                
                
{/* Slide 4 = Le dernier article de blog */}

                <div className='slide-default-bg flex flex-col justify-center h-[54rem] '>
                    <p className='slide-title w-full fixed top-0 text-center font-bold text-2xl'>Nouvel article de blog</p>
                        <img src={window.location.origin + "/src/app/assets/images/blog" +  `${blog}`} alt="" className='h-full object-cover'/>
                    <button className="btn-slide-bish absolute right-10 w-auto px-4">Je découvre</button>
                </div>

            </Carousel>
            
        );
    }

export default Slide;