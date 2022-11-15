import React, {useEffect, useState} from 'react'
import apiBackend from "../../api/backend/api.Backend";
import {URL_BACK_BLOG} from "../../constants/urls/urlBackEnd";

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