import React, { useState, useEffect} from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import {FastAverageColor} from "fast-average-color";
import apiBackend from "../../api/backend/api.Backend";
import {URL_BACK_BLOG_LAST_ARTICLE, URL_BACK_CATEGORIES_TREND, URL_BACK_PRODUCT_BEST_PROMO, URL_BACK_PRODUCT_TREND} from "../../constants/urls/urlBackEnd";
import {URL_PRODUCT_LINK, URL_BLOG, URL_PRODUCTS,} from "../../constants/urls/urlFrontEnd";
import {Link} from 'react-router-dom';
import TrendProductsSlide from './TrendProductsSlide';
import TrendCategorySlide from './TrendCategorySlide';
import BestPromo from './BestPromo';
import LastBlog from './LastBlog';

const Slide = () => {
    const [categorie,setCategorie]= useState([])
    const [promotions,setPromotions]= useState('')
    const [idPromo,setIdPromo]= useState([])
    const [trend,setTrend]= useState([])
    const [blog,setBlog] = useState('')
    const [idBlog,setIdBlog] = useState('')
    const [colorLeft, setColorLeft] =useState()
    const [colorRight, setColorRight] =useState()


        // -------------------------------J'importe mes données-------------------------------
    useEffect(()=>{

        // -------------------------------Le dernier article de blog-------------------------------
        apiBackend.get(URL_BACK_BLOG_LAST_ARTICLE).then((response => {
            if(response.data[0]) {
                const imgLastArticleBlog = response.data[0].path_image;
                const idBlog= response.data[0].id;
                setBlog(imgLastArticleBlog);
                setIdBlog(idBlog);
            } else {
                setIdBlog(null)
            }
        }))

        // -------------------------------Le produit avec la meilleure promo-------------------------------
        apiBackend.get(URL_BACK_PRODUCT_BEST_PROMO).then((response =>{
            if(response.data[0]) {
                const imgProductPromo = response.data[0].path_image;
                const idPromo = response.data[0].id;
                setPromotions(imgProductPromo);
                setIdPromo(idPromo);
            } else {
                setIdPromo(null)
            }
        }))

        // -------------------------------La catégorie tendance-------------------------------
        apiBackend.get(URL_BACK_CATEGORIES_TREND).then((response =>{
            setCategorie(response.data[0]);
        }))

        // -------------------------------Les deux produits tendances-------------------------------
        apiBackend.post(URL_BACK_PRODUCT_TREND).then((response =>{
            setTrend(response.data);
            if(response.data.length >= 2) {
                const fac = new FastAverageColor();
                const container = document.querySelector('.slide-img');
                for(let i=0; i<response.data.length ; i++){
                    fac.getColorAsync("../../src/app/assets/images/products/"+response.data[i].pathImage)
                        .then(color => {
                            container.style.backgroundColor = color.rgba;
                            container.style.color = color.isDark ? '#fff' : '#000';
                            if(i===0){
                                setColorLeft(color.hex);
                            }
                            if(i===1){
                                setColorRight(color.hex);
                            }
                        })
                        .catch(e => {
                            console.log(e);
                        });
                }
            }
        }))

    }, []);



    return (
        <>
            {/* showThumbs={false} permet de cacher les vignettes du carousel */}

            {
                (trend.length >=2 && categorie && idBlog && idPromo) ?
                <Carousel autoPlay interval="7000" transitionTime="2000" showStatus={false} stopOnHover={true} showThumbs={false} infiniteLoop={true} className='w-full'>
                    <TrendProductsSlide trend={trend} colorLeft={colorLeft} colorRight={colorRight} />
                    <TrendCategorySlide categorie={categorie} />
                    <BestPromo promotions={promotions} idPromo={idPromo} />
                    <LastBlog blog={blog} idBlog={idBlog} />
                </Carousel>
                : 
                // TREND CONDITIONS
                (trend.length < 2 && categorie && idBlog && idPromo) ?
                <Carousel autoPlay interval="7000" transitionTime="2000" showStatus={false} stopOnHover={true} showThumbs={false} infiniteLoop={true} className='w-full'>
                    <TrendCategorySlide categorie={categorie} />
                    <BestPromo promotions={promotions} idPromo={idPromo} />
                    <LastBlog blog={blog} idBlog={idBlog} />
                </Carousel>
                : 
                (trend.length < 2 && !categorie && idBlog && idPromo) ?
                <Carousel autoPlay interval="7000" transitionTime="2000" showStatus={false} stopOnHover={true} showThumbs={false} infiniteLoop={true} className='w-full'>
                    <BestPromo promotions={promotions} idPromo={idPromo} />
                    <LastBlog blog={blog} idBlog={idBlog} />
                </Carousel>
                :
                (trend.length < 2 && categorie && !idBlog && idPromo) ?
                <Carousel autoPlay interval="7000" transitionTime="2000" showStatus={false} stopOnHover={true} showThumbs={false} infiniteLoop={true} className='w-full'>
                    <TrendCategorySlide categorie={categorie} />
                    <BestPromo promotions={promotions} idPromo={idPromo} />
                </Carousel>
                :
                (trend.length < 2 && categorie && idBlog && !idPromo) ?
                <Carousel autoPlay interval="7000" transitionTime="2000" showStatus={false} stopOnHover={true} showThumbs={false} infiniteLoop={true} className='w-full'>
                    <TrendCategorySlide categorie={categorie} />
                    <LastBlog blog={blog} idBlog={idBlog} />
                </Carousel>
                :
                (trend.length < 2 && !categorie && !idBlog && idPromo) ?
                <Carousel autoPlay interval="7000" transitionTime="2000" showStatus={false} stopOnHover={true} showThumbs={false} infiniteLoop={true} className='w-full'>
                    <BestPromo promotions={promotions} idPromo={idPromo} />
                </Carousel>
                :
                (trend.length < 2 && categorie && !idBlog && !idPromo) ?
                <Carousel autoPlay interval="7000" transitionTime="2000" showStatus={false} stopOnHover={true} showThumbs={false} infiniteLoop={true} className='w-full'>
                    <TrendCategorySlide categorie={categorie} />
                </Carousel>
                :
                (trend.length < 2 && !categorie && idBlog && !idPromo) ?
                <Carousel autoPlay interval="7000" transitionTime="2000" showStatus={false} stopOnHover={true} showThumbs={false} infiniteLoop={true} className='w-full'>
                    <LastBlog blog={blog} idBlog={idBlog} />
                </Carousel>
                :
                // CATEGORY CONDITIONS
                (trend.length >= 2 && !categorie && idBlog && idPromo) ?
                <Carousel autoPlay interval="7000" transitionTime="2000" showStatus={false} stopOnHover={true} showThumbs={false} infiniteLoop={true} className='w-full'>
                    <TrendProductsSlide trend={trend} colorLeft={colorLeft} colorRight={colorRight} />
                    <BestPromo promotions={promotions} idPromo={idPromo} />
                    <LastBlog blog={blog} idBlog={idBlog} />
                </Carousel>
                : 
                (trend.length < 2 && !categorie && idBlog && idPromo) ?
                <Carousel autoPlay interval="7000" transitionTime="2000" showStatus={false} stopOnHover={true} showThumbs={false} infiniteLoop={true} className='w-full'>
                    <BestPromo promotions={promotions} idPromo={idPromo} />
                    <LastBlog blog={blog} idBlog={idBlog} />
                </Carousel>
                :
                (trend.length >= 2 && !categorie && !idBlog && idPromo) ?
                <Carousel autoPlay interval="7000" transitionTime="2000" showStatus={false} stopOnHover={true} showThumbs={false} infiniteLoop={true} className='w-full'>
                    <TrendProductsSlide trend={trend} colorLeft={colorLeft} colorRight={colorRight} />
                    <BestPromo promotions={promotions} idPromo={idPromo} />
                </Carousel>
                :
                (trend.length >= 2 && !categorie && idBlog && !idPromo) ?
                <Carousel autoPlay interval="7000" transitionTime="2000" showStatus={false} stopOnHover={true} showThumbs={false} infiniteLoop={true} className='w-full'>
                    <TrendProductsSlide trend={trend} colorLeft={colorLeft} colorRight={colorRight} />
                    <LastBlog blog={blog} idBlog={idBlog} />
                </Carousel>
                :
                (trend.length < 2 && !categorie && !idBlog && idPromo) ?
                <Carousel autoPlay interval="7000" transitionTime="2000" showStatus={false} stopOnHover={true} showThumbs={false} infiniteLoop={true} className='w-full'>
                    <BestPromo promotions={promotions} idPromo={idPromo} />
                </Carousel>
                :
                (trend.length < 2 && !categorie && idBlog && !idPromo) ?
                <Carousel autoPlay interval="7000" transitionTime="2000" showStatus={false} stopOnHover={true} showThumbs={false} infiniteLoop={true} className='w-full'>
                    <LastBlog blog={blog} idBlog={idBlog} />
                </Carousel>
                :
                (trend.length >= 2 && !categorie && !idBlog && !idPromo) ?
                <Carousel autoPlay interval="7000" transitionTime="2000" showStatus={false} stopOnHover={true} showThumbs={false} infiniteLoop={true} className='w-full'>
                    <TrendProductsSlide trend={trend} colorLeft={colorLeft} colorRight={colorRight} />
                </Carousel>
                :
                // PROMO CONDITIONS
                (trend.length >= 2 && categorie && idBlog && !idPromo) ?
                <Carousel autoPlay interval="7000" transitionTime="2000" showStatus={false} stopOnHover={true} showThumbs={false} infiniteLoop={true} className='w-full'>
                    <TrendProductsSlide trend={trend} colorLeft={colorLeft} colorRight={colorRight} />
                    <TrendCategorySlide categorie={categorie} />
                    <LastBlog blog={blog} idBlog={idBlog} />
                </Carousel>
                : 
                (trend.length < 2 && categorie && idBlog && !idPromo) ?
                <Carousel autoPlay interval="7000" transitionTime="2000" showStatus={false} stopOnHover={true} showThumbs={false} infiniteLoop={true} className='w-full'>
                    <TrendCategorySlide categorie={categorie} />
                    <LastBlog blog={blog} idBlog={idBlog} />
                </Carousel>
                :
                (trend.length >= 2 && !categorie && idBlog && !idPromo) ?
                <Carousel autoPlay interval="7000" transitionTime="2000" showStatus={false} stopOnHover={true} showThumbs={false} infiniteLoop={true} className='w-full'>
                    <TrendProductsSlide trend={trend} colorLeft={colorLeft} colorRight={colorRight} />
                    <LastBlog blog={blog} idBlog={idBlog} />
                </Carousel>
                :
                (trend.length >= 2 && categorie && !idBlog && !idPromo) ?
                <Carousel autoPlay interval="7000" transitionTime="2000" showStatus={false} stopOnHover={true} showThumbs={false} infiniteLoop={true} className='w-full'>
                    <TrendProductsSlide trend={trend} colorLeft={colorLeft} colorRight={colorRight} />
                    <TrendCategorySlide categorie={categorie} />
                </Carousel>
                :
                (trend.length < 2 && !categorie && idBlog && !idPromo) ?
                <Carousel autoPlay interval="7000" transitionTime="2000" showStatus={false} stopOnHover={true} showThumbs={false} infiniteLoop={true} className='w-full'>
                    <LastBlog blog={blog} idBlog={idBlog} />
                </Carousel>
                :
                (trend.length < 2 && categorie && !idBlog && !idPromo) ?
                <Carousel autoPlay interval="7000" transitionTime="2000" showStatus={false} stopOnHover={true} showThumbs={false} infiniteLoop={true} className='w-full'>
                    <TrendCategorySlide categorie={categorie} />
                </Carousel>
                :
                (trend.length >= 2 && !categorie && !idBlog && !idPromo) ?
                <Carousel autoPlay interval="7000" transitionTime="2000" showStatus={false} stopOnHover={true} showThumbs={false} infiniteLoop={true} className='w-full'>
                    <TrendProductsSlide trend={trend} colorLeft={colorLeft} colorRight={colorRight} />
                </Carousel>
                :
                // BLOG CONDITIONS
                (trend.length >= 2 && categorie && !idBlog && idPromo) ?
                <Carousel autoPlay interval="7000" transitionTime="2000" showStatus={false} stopOnHover={true} showThumbs={false} infiniteLoop={true} className='w-full'>
                    <TrendProductsSlide trend={trend} colorLeft={colorLeft} colorRight={colorRight} />
                    <TrendCategorySlide categorie={categorie} />
                    <BestPromo promotions={promotions} idPromo={idPromo} />
                </Carousel>
                : 
                (trend.length < 2 && categorie && !idBlog && idPromo) ?
                <Carousel autoPlay interval="7000" transitionTime="2000" showStatus={false} stopOnHover={true} showThumbs={false} infiniteLoop={true} className='w-full'>
                    <TrendCategorySlide categorie={categorie} />
                    <BestPromo promotions={promotions} idPromo={idPromo} />
                </Carousel>
                :
                (trend.length >= 2 && !categorie && !idBlog && idPromo) ?
                <Carousel autoPlay interval="7000" transitionTime="2000" showStatus={false} stopOnHover={true} showThumbs={false} infiniteLoop={true} className='w-full'>
                    <TrendProductsSlide trend={trend} colorLeft={colorLeft} colorRight={colorRight} />
                    <BestPromo promotions={promotions} idPromo={idPromo} />
                </Carousel>
                :
                (trend.length >= 2 && categorie && !idBlog && !idPromo) ?
                <Carousel autoPlay interval="7000" transitionTime="2000" showStatus={false} stopOnHover={true} showThumbs={false} infiniteLoop={true} className='w-full'>
                    <TrendProductsSlide trend={trend} colorLeft={colorLeft} colorRight={colorRight} />
                    <TrendCategorySlide categorie={categorie} />
                </Carousel>
                :
                (trend.length < 2 && !categorie && !idBlog && idPromo) ?
                <Carousel autoPlay interval="7000" transitionTime="2000" showStatus={false} stopOnHover={true} showThumbs={false} infiniteLoop={true} className='w-full'>
                    <BestPromo promotions={promotions} idPromo={idPromo} />
                </Carousel>
                :
                (trend.length < 2 && categorie && !idBlog && !idPromo) ?
                <Carousel autoPlay interval="7000" transitionTime="2000" showStatus={false} stopOnHover={true} showThumbs={false} infiniteLoop={true} className='w-full'>
                    <TrendCategorySlide categorie={categorie} />
                </Carousel>
                :
                (trend.length >= 2 && !categorie && !idBlog && !idPromo) &&
                <Carousel autoPlay interval="7000" transitionTime="2000" showStatus={false} stopOnHover={true} showThumbs={false} infiniteLoop={true} className='w-full'>
                    <TrendProductsSlide trend={trend} colorLeft={colorLeft} colorRight={colorRight} />
                </Carousel>
            }
        </> 
    );
}

export default Slide;
