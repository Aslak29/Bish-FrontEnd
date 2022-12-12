import React, {useEffect, useState} from 'react'
import apiBackend from "../../api/backend/api.Backend";
import {URL_BACK_BLOG} from "../../constants/urls/urlBackEnd";
import {Helmet} from "react-helmet-async";

const BlogView = () => {

  const [blog,setBlog] = useState([]);

  useEffect(() => {
    apiBackend.get(URL_BACK_BLOG).then((response => {
      setBlog(response.data)
    }))
  },[])
  return (
    <div className='flex flex-col justify-center items-center mt-4 gap-y-8  w-full'>
        <Helmet>
            <title>Bish - Blog</title>
            <meta name="description" content="Découvrez les nouveaux article de notre blog !" />
        </Helmet>
        Nouveaux articles
        {Object.entries(blog).map((article)=>{
          const{ title, description, pathImage, date} =article[1];
          return(
            <div key={article.id} className="border bish-border-gray  bish-bg-white-up w-11/12 flex flex-row h-72">
              <img className='w-2/3 object-cover' src={window.location.origin + `/src/app/assets/images/blog` + `${pathImage}`} alt="Illustration d'un article de blog" />
              <div className='flex flex-col m-6'>
                <p>{title}</p>
                <p>{date.date}</p>
                <p className='text-justify'>{description.substring(0, 80) + "..."}</p>
                <button className='btn-primary-bish w-auto h-auto'>En savoir plus</button>
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default BlogView