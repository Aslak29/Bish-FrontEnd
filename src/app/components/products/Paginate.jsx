import React from "react";
import ReactPaginate from "react-paginate";
import arrowRight from "../../assets/images/arrow-right.png"
import arrowLeft from "../../assets/images/arrow-left.png"


const Paginate = props => {

  return (
    <div className="w-fit m-auto">
      <ReactPaginate
        previousLabel={<img src={arrowLeft} alt="Page suivante" className="h-6"/>}
        nextLabel={<img src={arrowRight} alt="Page suivante" className="h-6"/>}
        breakLabel={"..."}
        activeClassName="bish-bg-blue"
        pageCount={props.countPage}
        marginPagesDisplayed={3}
        pageRangeDisplayed={3}
        forcePage={props.countPage > 0 ? props.page : -1}
        onPageChange={(selected)=>props.setPage({selected})}
        pageClassName="border bish-border-gray px-2 py-1 rounded"
        className="flex gap-3 items-center"
      />
    </div>
  );
};

export default Paginate;
