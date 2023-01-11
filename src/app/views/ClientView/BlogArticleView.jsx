import React, {useState, useEffect} from 'react'
import {Helmet} from "react-helmet-async";
import { useParams, Link } from 'react-router-dom';
import apiBackend from "../../api/backend/api.Backend";
import {URL_BACK_BLOG, URL_BACK_CATEGORIES} from "../../constants/urls/urlBackEnd";
import SuggestionsContainer from "../../components/products/SuggestionsContainer"
import axios from 'axios';

const BlogArticleView = props => {
  const [articlesBlog, setArticlesBlog]=useState([]);
  const [categorie, setCategorie] = useState();
  const articleID=useParams();
  let id=parseInt(articleID.articleID);
  useEffect(() => {
    axios.all([
      apiBackend.get(URL_BACK_CATEGORIES),
      apiBackend.get(URL_BACK_BLOG + `${id}`)
    ])
    .then((respArr => {
      setArticlesBlog(respArr[1].data[0]);
      setCategorie(respArr[0].data[Math.floor(Math.random()*respArr[0].data.length)]);
    }))
  },[])

  return (
    <div className='blog-article w-11/12 flex flex-col justify-center items-center mt-12 mb-12 border bish-border-gray rounded-3xl m-2 mx-auto bish-bg-white-up'>
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
        <p className='text-justify text-sm md:text-lg' dangerouslySetInnerHTML={{__html: articlesBlog.description}}></p><br/>
        <div>
                {categorie && (
                    <SuggestionsContainer
                        id={-1}
                        idCategorie={categorie.id}
                    />
                )}
        </div>
      <button className='m-6'>
        <Link className='btn-black-bish hover:bish-bg-blue ' to={"/blog/"}>Revenir à la liste d'articles</Link>
      </button>
      </div>

    </div>
  )
}

export default BlogArticleView