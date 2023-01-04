import React from 'react'
import {Link} from 'react-router-dom';
import { URL_BLOG } from "../../constants/urls/urlFrontEnd";

const LastBlog = props => {
  return (
        <div className='slide-default-bg flex flex-col justify-center h-[54rem] '>
            <p className='slide-title w-full fixed top-0 text-center font-bold text-2xl'>Découvrez notre nouvel article de blog</p>
                <img src={window.location.origin + "/src/app/assets/images/blog/" +  `${props.blog}`} alt="" className='h-full object-cover'/>
            <button className="btn-slide-bish absolute right-10 w-auto px-4">
                <Link to={`${URL_BLOG}/article/${props.idBlog}`}>Je découvre</Link>
            </button>
        </div>
    )
}

export default LastBlog