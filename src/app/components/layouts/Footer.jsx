import React from 'react'
import { Link } from "react-router-dom";
import {
    URL_PRESENTATION,
    URL_CONTACT,
    URL_BLOG,
    URL_FAQ,
    URL_LEGAL_NOTICE,
    URL_CGU,
    URL_HELP,
  } from "../../constants/urls/urlFrontEnd"
  import logo from "../../assets/images/logo-bish.svg";
  import stripe from "../../assets/images/stripe.svg";

function Footer() {
  return (
    <footer className="bish-bg-blue bish-text-white">
        <div className='flex justify-between items-center pt-4 pb-4 pl-4 pr-2 sm:pt-6 sm:pb-6 sm:pl-10 sm:pr-10'>
            <div className='order-last sm:order-first'> <img
              className="h-12 w-auto sm:h-20"
              src={logo}
              alt="Logo Bish"
            /></div>
            <div>
                { <ul>
                    <Link to={URL_PRESENTATION}><li>Qui sommes-nous ?</li></Link>
                    {/* <Link to={URL_BLOG}><li>Blog</li></Link>
                    <Link to={URL_CONTACT}><li>Contact</li></Link> */}
                    <Link to={URL_LEGAL_NOTICE}><li>Mentions légales</li></Link>
                </ul> }
            </div>
            <div>
              <ul>
                <Link to={URL_FAQ}><li>FAQ</li></Link>
              </ul>
                {/* <ul>
                <Link to={URL_CGU}><li>CGU</li></Link>
                <Link to={URL_HELP}><li>Aide</li></Link>
                </ul> */}
            </div>
            <div><img
              className="hidden w-auto sm:block sm:h-10"
              src={stripe}
              alt="stripe"
            /></div>
        </div>
    </footer>
  )
}

export default Footer