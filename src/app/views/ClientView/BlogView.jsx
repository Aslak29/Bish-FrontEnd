import React, {useEffect, useState} from 'react'
import apiBackend from "../../api/backend/api.Backend";
import {URL_BACK_BLOG} from "../../constants/urls/urlBackEnd";
import {Helmet} from "react-helmet-async";
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import arrowRight from "../../assets/images/arrow-right.png"
import arrowLeft from "../../assets/images/arrow-left.png"

const BlogView = () => {

  const [blog,setBlog] = useState([]);
  // Pagination
  const [page,setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const handlePage = (numPage) =>{
    setPage(numPage.selected);
  }

  useEffect(() => {
    apiBackend.post(URL_BACK_BLOG+ "5/"+ `${page * 5}`).then((response => {
      setBlog(response.data[0]);
      setTotalPages(Math.ceil(response.data[1][1]/5));
      
    }))
  },[page])
  return (
    <div className='flex flex-col justify-center items-center mt-4 gap-y-8  w-full mb-12'>
        <Helmet>
            <title>Bish - Blog</title>
            <meta name="description" content="Découvrez les nouveaux article de notre blog !" />
        </Helmet>
        <h6>Nouveaux articles</h6>
        {Object.entries(blog).map((article)=>{
          const{id, title, description, pathImage, date} =article[1];
          
          return(
            <div key={id} className="border bish-border-gray bish-bg-white-up w-11/12 flex flex-col sm:flex-row h-auto sm:odd:flex-row-reverse ">
              <img className='w-full sm:w-3/5 object-cover' src={window.location.origin + `/src/app/assets/images/blog/` + `${pathImage}`} alt="Illustration d'un article de blog" />
              <div className='flex flex-col m-6 justify-around'>
                <div>
                  <p>{title}</p>
                  <p className='bish-text-gray text-sm	'>{date}</p><br/>
                </div>
                <p className='text-justify text-sm md:text-lg'>{description.substring(0, 80) + "..."}</p><br/>
                <button >
                  <Link className='btn-black-bish w-auto h-auto' to={"/blog/article/" +  `${article[1].id}`}>En savoir plus</Link>
                </button>
              </div>

            </div>
          )
        })}
      <ReactPaginate
        previousLabel={<img src={arrowLeft} alt="Page suivante" className="h-6"/>}
        nextLabel={<img src={arrowRight} alt="Page suivante" className="h-6"/>}
        breakLabel={"..."}
        activeClassName="bish-bg-blue"
        pageCount={totalPages}
        marginPagesDisplayed={3}
        pageRangeDisplayed={3}
        onPageChange={handlePage}
        pageClassName="border bish-border-gray px-2 py-1 rounded"
        className="flex gap-3 items-center"
      />
    </div>
  )
}

export default BlogView