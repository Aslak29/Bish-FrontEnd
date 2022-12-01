import React, {useEffect} from "react";

const Taille = props => {

  const taille = props.taille

  useEffect(() => {
    props.addStock(taille.stock)
  },[])

  return (
        <button className={`w-max ${taille.stock > 0 ? "bish-bg-blue" : "bish-bg-white"}`}>{taille.taille}</button>
  );
};

export default Taille;
