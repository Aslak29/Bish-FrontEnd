import React, {useEffect} from "react";
import { Link } from 'react-router-dom';

const Taille = props => {

  const taille = props.taille

  useEffect(() => {
    if(props.addStock) {
      props.addStock(taille.stock)
    }
  },[])

  return (
        <Link className={`w-full rounded font-medium box-border h-8 p-1 text-center bish-bg-blue bish-text-white ${taille.stock < 1 ? "opacity-25 cursor-not-allowed" : "hover:bish-bg-white hover:border hover:bish-border-gray hover:text-black"}`}>{taille.taille.toUpperCase()}</Link>
  );
};

export default Taille;
