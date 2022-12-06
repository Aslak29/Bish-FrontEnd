import React, { useState, useEffect} from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import imageTest from '../assets/images/imageTest.jpeg';
import {FastAverageColor} from "fast-average-color";
import apiBackend from "../api/backend/api.Backend";
import {URL_BACK_BLOG_LAST_ARTICLE, URL_BACK_CATEGORIES_TREND, URL_BACK_PRODUCT_BEST_PROMO, URL_BACK_PRODUCT_TREND} from "../constants/urls/urlBackEnd";
import {URL_PRODUCT_LINK, URL_BLOG, URL_PRODUCTS,} from "../constants/urls/urlFrontEnd";
import { NavLink, Link } from 'react-router-dom';

const Slide = () => {
    const [categorie,setCategorie]= useState([]);

    // const [categories,setCategories]= useState('');
    const [promotions,setPromotions]= useState('');
    const [idPromo,setIdPromo]= useState([]);
    const [trend,setTrend]= useState([]);
    const [blog,setBlog] = useState('');
    const [idBlog,setIdBlog] = useState('');
    const [colors, setColors] =useState([]);
    const [colorLeft, setColorLeft] =useState();
    const [colorRight, setColorRight] =useState();


    // const path = null;
        // -------------------------------J'importe mes données-------------------------------
    useEffect(()=>{

        // -------------------------------La catégorie tendance-------------------------------
        apiBackend.get(URL_BACK_CATEGORIES_TREND).then((response =>{
            setCategorie(response.data[0]);
        }))
        
        // -------------------------------Le produit avec la meilleure promo-------------------------------
        apiBackend.get(URL_BACK_PRODUCT_BEST_PROMO).then((response =>{
            const imgProductPromo = response.data[0].path_image;
            const idPromo = response.data[0].id;
            setPromotions(imgProductPromo);
            setIdPromo(idPromo);
        }))

        // -------------------------------Les deux produits tendances-------------------------------
        apiBackend.post(URL_BACK_PRODUCT_TREND).then((response =>{
            setTrend(response.data);
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
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        }))
        
        // -------------------------------Le dernier article de blog-------------------------------
        apiBackend.get(URL_BACK_BLOG_LAST_ARTICLE).then((response => {
            const imgLastArticleBlog = response.data[0].path_image;
            const idBlog= response.data[0].id;
            setBlog(imgLastArticleBlog);
            setIdBlog(idBlog);

        }))
        
        
    }, []);

        return (
            
            // showThumbs={false} permet de cacher les vignettes du carousel
            <Carousel autoPlay interval="7000" transitionTime="2000" showStatus={false} stopOnHover={true} showThumbs={false} className='w-full'>

{/* Slide 3 = les 2 produits tendances aléatoires*/}

                <div    className='flex flex-col sm:flex-row justify-center sm:justify-around items-center w-full h-[54rem] gap-y-5 sm:gap-y-0 sm:gap-x-5' 
                        style={{background: `linear-gradient(90deg, ${colorLeft}, ${colorRight})` }}>
                        <p className='slide-title w-full fixed top-0 text-center font-bold text-2xl'>Découvrez nos deux produits tendances du moment!</p>
                        {Object.entries(trend).map(([key,value])=>{
                            return(
                                <div key={key}>
                                    <div className='slide-img flex flex-col w-full'>
                                        <img src={window.location.origin + "/src/app/assets/images/trends" +  `${value.pathImage}`} 
                                    alt="Tendance" 
                                    className='object-cover h-[20rem] sm:h-full'/>
                                    </div>
                                    <button className="btn-slide-bish w-auto px-4 mt-5">
                                        <Link to={`${URL_PRODUCT_LINK}${value.id}`}>Je découvre</Link>
                                    </button>
                                </div>
                                
                                )})}                        
                    </div>
{/* Slide 1 = catégorie tendance */}
                <div className='slide-default-bg flex flex-col justify-center w-full h-[54rem]'>
                    <p className='slide-title w-full fixed top-0 text-center font-bold text-2xl'>Catégorie tendance du moment</p>
                    <img src={window.location.origin + "/src/app/assets/images/categories/fullsize/" +  `${categorie.pathImage}`} alt="slide" className='h-full object-cover'/>
                    <button className="btn-slide-bish absolute right-10 w-auto px-4">
                        <Link to={`${URL_PRODUCTS}`} state={{categorie: categorie.id, name: categorie.name}}>Je découvre</Link>                    
                    </button>
                </div>

{/* Slide 2 = meilleure promo*/}
                <div className='slide-default-bg flex flex-col justify-center h-[54rem]'>
                    <p className='slide-title w-full fixed top-0 text-center font-bold text-2xl'>En promo! </p>
                        <img src={window.location.origin + "/src/app/assets/images/promotions" +  `${promotions}`} alt="" className='h-full object-cover'/>
                    <button className="btn-slide-bish absolute right-10 w-auto px-4">
                        <Link to={`${URL_PRODUCT_LINK}${idPromo}`}>Je découvre</Link>                    
                    </button>
                </div>                
                
{/* Slide 4 = Le dernier article de blog */}

                <div className='slide-default-bg flex flex-col justify-center h-[54rem] '>
                    <p className='slide-title w-full fixed top-0 text-center font-bold text-2xl'>Découvrez notre nouvel article de blog</p>
                        <img src={window.location.origin + "/src/app/assets/images/blog" +  `${blog}`} alt="" className='h-full object-cover'/>
                    <button className="btn-slide-bish absolute right-10 w-auto px-4">
                        <Link to={`${URL_BLOG}/article/${idBlog}`}>Je découvre</Link>                    
                    </button>
                </div>

            </Carousel>
            
        );
    }

export default Slide;