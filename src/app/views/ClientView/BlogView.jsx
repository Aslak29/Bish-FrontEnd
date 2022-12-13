import React, {useEffect, useState} from 'react'
import apiBackend from "../../api/backend/api.Backend";
import {URL_BACK_BLOG} from "../../constants/urls/urlBackEnd";
import {Helmet} from "react-helmet-async";
import { Link } from 'react-router-dom';
const BlogView = () => {

  const [blog,setBlog] = useState([]);

  useEffect(() => {
    apiBackend.get(URL_BACK_BLOG).then((response => {
      setBlog(response.data);
    }))
  },[])

  return (
    <div className='flex flex-col justify-center items-center mt-4 gap-y-8  w-full mb-12'>
        <Helmet>
            <title>Bish - Blog</title>
            <meta name="description" content="Découvrez les nouveaux article de notre blog !" />
        </Helmet>
        <h6>Nouveaux articles</h6>
        {Object.entries(blog).slice(0).reverse().map((article)=>{
          const{id, title, description, pathImage, date} =article[1];

          return(
            <div key={id} className="border bish-border-gray bish-bg-white-up w-11/12 flex flex-col sm:flex-row h-auto sm:odd:flex-row-reverse ">
            {/* <div key={id} className="border bish-border-gray bish-bg-white-up w-11/12 flex flex-col sm:flex-row h-auto sm:odd:flex-row-reverse "> */}
              <img className='w-full sm:w-3/5 object-cover' src={window.location.origin + `/src/app/assets/images/blog` + `${pathImage}`} alt="Illustration d'un article de blog" />
              <div className='flex flex-col m-6 justify-around'>
                <div>
                  <p>{title}</p>
                  <p className='bish-text-gray text-sm	'>{date.date}</p><br/>
                </div>
                <p className='text-justify text-sm md:text-lg'>{description.substring(0, 80) + "..."}</p><br/>
                <button >
                  <Link className='btn-black-bish w-auto h-auto' to={"/blog/article/" +  `${article[1].id}`}>En savoir plus</Link>
                </button>
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default BlogView