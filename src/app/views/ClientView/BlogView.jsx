import React, {useEffect, useState} from 'react'
import apiBackend from "../../api/backend/api.Backend";
import {URL_BACK_BLOG} from "../../constants/urls/urlBackEnd";
import {Helmet} from "react-helmet-async";

const BlogView = () => {

  const [blog,setBlog] = useState([]);

  useEffect(() => {
    apiBackend.get(URL_BACK_BLOG).then((response => {
      setBlog(response.data)
      console.log(response.data)
    }))
  },[])

  return (
    <div>
        <Helmet>
            <title>Bish - Blog</title>
            <meta name="description" content="Découvrez les nouveaux article de notre blog !" />
        </Helmet>
      BlogView
      {blog.map((blogs) => {
        return (
            <h1>{blogs.title}</h1>
        )
      } )}
    </div>
  )
}

export default BlogView