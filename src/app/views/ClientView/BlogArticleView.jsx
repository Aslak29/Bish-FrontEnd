import React, {useState, useEffect} from 'react'
import {Helmet} from "react-helmet-async";
import { useParams } from 'react-router-dom';
import apiBackend from "../../api/backend/api.Backend";
import {URL_BACK_BLOG} from "../../constants/urls/urlBackEnd";
import {Link} from 'react-router-dom';

const BlogArticleView = props => {
  const [articlesBlog, setArticlesBlog]=useState([]);
  const articleID=useParams();
  let id=parseInt(articleID.articleID);
  useEffect(() => {
    apiBackend.get(URL_BACK_BLOG + `${id}`).then((response => {
      setArticlesBlog(response.data[0]);
    }))
  },[])

  return (
    <div className='flex flex-col justify-center items-center mt-4 mb-12 border bish-border-gray rounded-3xl m-2 sm:m-16 bish-bg-white-up'>
      <Helmet>
        <title>Bish - Article</title>
        {/*TODO: changer le title par le nom de l'article ainsi que la description*/}
        <meta name="description" content="" />
      </Helmet>
      <div className='flex flex-col w-10/12 h-auto'>
        <div className=' text-right flex flex-row justify-between py-4'>
          <p className='text-2xl my-auto'>{articlesBlog.title}</p><br/>
          <p className='bish-text-gray text-sm my-auto'>{articlesBlog.date}</p>
        </div>

        <img className='object-cover' src={window.location.origin + `/src/app/assets/images/blog/` + `${articlesBlog.path_image}`} alt="Illustration d'un article de blog" /><br/>
        <p className='text-justify text-sm md:text-lg' dangerouslySetInnerHTML={{__html: articlesBlog.description}}/><br/>
      <button className='m-6'>
        <Link className='btn-black-bish hover:bish-bg-blue ' to={"/blog/"}>Revenir à la liste d'articles</Link>
      </button>
      </div>

    </div>
  )
}

export default BlogArticleView