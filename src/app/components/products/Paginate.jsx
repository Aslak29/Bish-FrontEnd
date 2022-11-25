import React from "react";
import ReactPaginate from "react-paginate";
import arrowRight from "../../assets/images/arrow-right.png"
import arrowLeft from "../../assets/images/arrow-left.png"

const Paginate = () => {

    const handlePageClick = () => {
      };

  return (
    <div>
      <ReactPaginate
        previousLabel={<img src={arrowLeft} alt="Page suivante" className="h-6"/>}
        nextLabel={<img src={arrowRight} alt="Page suivante" className="h-6"/>}
        breakLabel={"..."}
        pageCount={20}
        marginPagesDisplayed={3}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        pageClassName="border bish-border-gray px-2 py-1 rounded"
        className="flex gap-3 items-center"
      />
    </div>
  );
};

export default Paginate;
