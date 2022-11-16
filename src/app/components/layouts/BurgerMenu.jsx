import React, {useState} from 'react'
import { Link } from "react-router-dom";
import {
    URL_HOME,
    URL_PRODUCTS,
    URL_PRESENTATION,
    URL_BLOG,
    // URL_SHOPPING_CART,
    // URL_INFOS
  } from "../../constants/urls/urlFrontEnd";
  import Home from "../../assets/images/Home.svg";
  import Question from "../../assets/images/Question.svg";
  import ShoppingBasket from "../../assets/images/ShoppingBasket.svg";
  import Blog from "../../assets/images/Blog.svg";

const BurgerMenu = () => {
  const [burgerBarTop, setBurgerBarTop] = useState("");
  const [burgerBarBottom, setBurgerBarBottom] = useState("");
  const [burgerBarHidden, setBurgerBarHidden] = useState("");
  const [menuClass, setMenuClass] = useState("hidden");
  const [isMenuClicked, setIsMenuClicked] = useState(false);

  const updateMenu = () =>{
    setIsMenuClicked(!isMenuClicked);
    if(!isMenuClicked){
      setBurgerBarTop("absolute top-5 burger-bar clicked origin-center rotate-45");
      setBurgerBarBottom("absolute top-5  burger-bar clicked origin-center -rotate-45");
      setBurgerBarHidden("hidden");
      setMenuClass("block top-8");

    }else{
      setBurgerBarTop("");
      setBurgerBarBottom("");
      setBurgerBarHidden("");
      setMenuClass("hidden");
    }
  }

  return (
    <div className={`dropdown w-12 my-auto relative lg:hidden`}>
      <div className={`flex flex-col h-12 mx-4 my-auto hover:cursor-pointer lg:hidden`} onClick={updateMenu}>
        <div className={`${burgerBarTop} w-12 h-1.5 bish-bg-white m-auto`}></div>
        <div className={`${burgerBarHidden} w-12 h-1.5 bish-bg-white m-auto`}></div>
        <div className={`${burgerBarBottom} w-12 h-1.5 bish-bg-white m-auto`}></div>
      </div>
        <ul className={`${menuClass}  w-screen h-screen absolute -left-1 bish-bg-white bish-text-gray space-y-8 my-10 text-3xl`}>
          <li className='w-4/5 m-auto  border bish-border-blue rounded-lg py-8 flex justify-start bish-shadow-blue'>
            <img src={Home} alt="Accueil" className='w-16 mr-12 ml-4 ' />
            {/* <Link to={URL_HOME} className="bish-text-blue font-semibold my-auto">
              Accueil
            </Link>             */}
          </li>
          <li className='w-4/5 m-auto border bish-border-blue rounded-lg py-8  flex justify-start bish-shadow-blue '>
            <img src={ShoppingBasket} alt="Nos Produits" className='w-16 mr-12 ml-4' />
            {/* <Link to={URL_PRODUCTS} className="bish-text-blue font-semibold my-auto ">
              Nos Produits
            </Link>             */}
          </li>
          <li className='w-4/5 m-auto border bish-border-blue rounded-lg py-8  flex justify-start bish-shadow-blue'>
            <img src={Question} alt="Qui sommes nous" className='w-16 mr-12 ml-4'/>
            {/* <Link to={URL_PRESENTATION} className="bish-text-blue font-semibold my-auto">
              Qui sommes-nous?
            </Link> */}
          </li>
          <li className='w-4/5 m-auto border bish-border-blue rounded-lg py-8 flex justify-start bish-shadow-blue'>
            <img src={Blog} alt="Blog" className='w-16 mr-12 ml-4'/>
            {/* <Link to={URL_BLOG} className="bish-text-blue font-semibold my-auto">
              Blog
            </Link> */}
          </li>
        </ul>
      
      </div>  )
}

export default BurgerMenu;