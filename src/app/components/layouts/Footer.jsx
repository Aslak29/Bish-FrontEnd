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

function Footer() {
  return (
    <footer className="bish-bg-blue bish-text-white">
        <div className='flex justify-between items-center pt-6 pb-6 pl-3 pr-3'>
            <div>Logo</div>
            <div>
                <ul>
                    <Link to={URL_PRESENTATION}><li>Qui sommes-nous ?</li></Link>
                    <Link to={URL_BLOG}><li>Blog</li></Link>
                    <Link to={URL_CONTACT}><li>Contact</li></Link>
                </ul>
            </div>
            <div>
                <ul>
                <Link to={URL_LEGAL_NOTICE}><li>Mentions légales</li></Link>
                <Link to={URL_CGU}><li>CGU</li></Link>
                <Link to={URL_FAQ}><li>FAQ</li></Link>
                <Link to={URL_HELP}> <li>Aide</li></Link>
                </ul>
            </div>
            <div>Stripe</div>
        </div>
    </footer>
  )
}

export default Footer