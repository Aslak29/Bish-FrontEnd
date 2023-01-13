import React from "react";
import image from "../../assets/images/products/femme1.jpg";
import trash from "../../assets/images/trash.png";

const ShoppingChild = props => {
  return (
    <div className="bish-bg-gray-shop w-full m-auto">
      <div className={`flex justify-around items-center py-5 mx-10 ${!props.lastItem && "border-b bish-border-gray"}`}>
        <img className="w-1/12" src={image} alt="image" />
        <span htmlFor="">Pull Alosius</span>
        <span className="bish-text-blue"> 45 €</span>
        <span className="rounded box-border h-8 p-1 px-4 text-center bish-bg-blue bish-text-white">M</span>
        <div className="space-x-5 flex">
          <button className="bish-bg-product-detail px-2">-</button>
          <span className="block bish-bg-product-detail px-6" htmlFor="">5</span>
          <button className="bish-bg-product-detail px-2">+</button>
        </div>
        <button>
          <img className="my-auto h-5" src={trash} alt="" />
        </button>
      </div>
    </div>
  );
}

export default ShoppingChild;
