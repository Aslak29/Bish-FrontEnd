import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import imageTest from '../assets/images/imageTest.jpeg';

const Slide = () => {
        return (
            // showThumbs={false} permet de cacher les vignettes du carousel
            <Carousel autoPlay interval="5000" transitionTime="2000" showStatus={false} stopOnHover={true} showThumbs={false} className='w-full '>
                <div className='absolute flex flex-row justify-center items-center w-full '>
                    <p className='absolute left-4 top-1/4 sm:font-thin'>Nouvelle collection</p>
                    <img src={imageTest} alt="slide" className=' w-full'/>
                    <button className="absolute  right-10 border-2 border-black h-fit flex content-start p-2 font-semibold">Je découvre</button>
                </div>
                <div className='flex flex-row justify-center items-center'>
                    <p className='absolute left-4 top-1/4'>Nouvelle collection</p>
                    <img src={imageTest} alt="" className='w-full'/>
                    <button className="absolute  right-10 border-2 border-black h-fit flex content-start p-2 font-semibold">Je découvre</button>
                </div>                
                <div className='flex flex-row justify-center items-center'>
                    <p className='absolute left-4 top-1/4'>Nouvelle collection</p>
                    <img src={imageTest} alt="" className='w-full'/>
                    <button className="absolute  right-10 border-2 border-black h-fit flex content-start p-2 font-semibold">Je découvre</button>
                </div>
            </Carousel>
        );
    }

export default Slide;