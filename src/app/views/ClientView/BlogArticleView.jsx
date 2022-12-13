import React, {useState, useEffect} from 'react'
import {Helmet} from "react-helmet-async";
import { useParams } from 'react-router-dom';
import apiBackend from "../../api/backend/api.Backend";
import {URL_BACK_BLOG} from "../../constants/urls/urlBackEnd";
import { Link } from 'react-router-dom';

const BlogArticleView = props => {
  const [articlesBlog, setArticlesBlog]=useState([]);
  const articleID=useParams();
  // let id= articleID.articleID;
  let id=parseInt(articleID.articleID)-1;
  
  useEffect(() => {
    apiBackend.get(URL_BACK_BLOG).then((response => {
      setArticlesBlog(response.data[id]);
    }))
  },[])

  console.log(articlesBlog.date);
  return (
    <div className='flex flex-col justify-center items-center mt-4 mb-12 border bish-border-gray rounded-3xl m-2 sm:m-16 bish-bg-white-up'>
      <Helmet>
        <title>Bish - Article</title>
        {/*TODO: changer le title par le nom de l'article ainsi que la description*/}
        <meta name="description" content="" />
      </Helmet>
      <div className='flex flex-col w-10/12 h-auto'>
          {Object.keys(articlesBlog).map((date)=>{
            console.log(date);
            return(
              <div className='bish-text-gray text-right'><p>{articlesBlog.date[date]}</p></div>
            )
          })}
        <p>{articlesBlog.title}</p><br/>

        <img className='object-cover' src={window.location.origin + `/src/app/assets/images/blog` + `${articlesBlog.pathImage}`} alt="Illustration d'un article de blog" /><br/>
        <p className='text-justify text-sm md:text-lg'>{articlesBlog.description}</p><br/>
      <button className='m-6'>
        <Link className='btn-black-bish hover:bish-bg-blue ' to={"/blog/"}>Revenir à la liste d'articles</Link>
      </button>
      </div>

    </div>
  )
}

export default BlogArticleView