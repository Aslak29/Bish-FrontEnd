import React, {useEffect, useState} from "react";
import { Link } from 'react-router-dom';

const Taille = props => {

  const taille = props.taille
  const [styleFocus, setStyleFocus] = useState("")

  useEffect(() => {
    if(props.addStock) {
      props.addStock(taille.stock)
    }
  },[])

  useEffect(() => {
    if(props.index !== props.resetFocus) {
      setStyleFocus("")
    }
  },[props.resetFocus])

  const handleStyleFocus = () => {
    props.setResetFocus(props.index)
    setStyleFocus("bish-bg-white border bish-border-gray text-black")
  }

  return (
    <>
      {
        props.focusButton ?
        <Link onClick={() => handleStyleFocus()} className={`w-full focus rounded font-medium box-border h-8 p-1 text-center bish-bg-blue bish-text-white ${taille.stock < 1 ? "opacity-25 cursor-not-allowed" : `hover:bish-bg-white hover:border hover:bish-border-gray hover:text-black ${styleFocus}`}`}>{taille.taille.toUpperCase()}</Link>
        :
        <Link className={`w-full focus rounded font-medium box-border h-8 p-1 text-center bish-bg-blue bish-text-white ${taille.stock < 1 ? "opacity-25 cursor-not-allowed" : `hover:bish-bg-white hover:border hover:bish-border-gray hover:text-black ${props.focusButton && "focus:bish-bg-white focus:border focus:bish-border-gray focus:text-black"}`}`}>{taille.taille.toUpperCase()}</Link>
      }
    </>
  );
};

export default Taille;
