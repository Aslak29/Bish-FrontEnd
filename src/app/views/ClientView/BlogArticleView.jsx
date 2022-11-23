import React, {useEffect} from 'react'
import {Helmet} from "react-helmet-async";

const BlogArticleView = () => {
  return (
    <div>BlogArticleView
      <Helmet>
        <title>Bish - Article</title>
        {/*TODO: changer le title par le nom de l'article ainsi que la description*/}
        <meta name="description" content="" />
      </Helmet>


    </div>
  )
}

export default BlogArticleView