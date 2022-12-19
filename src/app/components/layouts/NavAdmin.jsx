import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import {
    URL_ADMIN_CATEGORIES,
    URL_ADMIN_PRODUCTS,
    URL_ADMIN_USERS,
    URL_ADMIN_STATS,
    URL_ADMIN_BLOG,
    URL_ADMIN_ORDERS,
    URL_ADMIN_CONTACT,
    URL_ADMIN_PROMOTION,
} from '../../constants/urls/urlFrontEnd';
import arrow from '../../assets/images/arrow-right.png'

const NavAdmin = () => {

    // Style
    const navelement = 'w-full border-solid border-b bish-border-gray';
    const lien = 'block pl-4 sm:pl-6 py-5 transition-all hover:translate-x-3';

    const [menuClick, setMenuClick] = useState(false);
    const [menuDisplay, setMenuDisplay] = useState('hidden');
    const [menuWidth, setMenuWidth] = useState('w-12');
    const [rotateArrow, setRotateArrow] = useState(null);
    const [positionArrow, setPositionArrow] = useState('top-24 left-2');

    const toggleMenu = () => {
        if (!menuClick) {
            setMenuClick(true)
            setRotateArrow('rotate-180')
            setMenuWidth('w-36')
            setMenuDisplay('block')
            setPositionArrow('top-24 left-24')
        } else {
            setMenuClick(false)
            setRotateArrow(null)
            setMenuWidth('w-12')
            setMenuDisplay('hidden')
            setPositionArrow('top-24 left-2')
        }
    }

    return (
        <div className={`${menuWidth} sm:w-64 shadow-xl flex items-center z-20 bish-bg-white h-screen fixed bottom-0 left-0`}>
            <button className={`${positionArrow} absolute sm:hidden`} onClick={() => toggleMenu()}>
                <img className={`${rotateArrow} h-8`} src={arrow} alt="Afficher la navigation administration"/>
            </button>
            <ul className={`${menuDisplay} sm:block w-full mb-8 sm:mb-10 xl:mb-12 2xl:mb-24`}>
                <li className={navelement}>
                    <Link className={lien} to={URL_ADMIN_CATEGORIES}>Catégories</Link>
                </li>
                <li className={navelement}>
                    <Link className={lien} to={URL_ADMIN_PRODUCTS}>Produits</Link>
                </li>
                <li className={navelement}>
                    <Link className={lien} to={URL_ADMIN_USERS}>Utilisateurs</Link>
                </li>
                <li className={navelement}>
                    <Link className={lien} to={URL_ADMIN_STATS}>Statistiques</Link>
                </li>
                <li className={navelement}>
                    <Link className={lien} to={URL_ADMIN_BLOG}>Blog</Link>
                </li>
                <li className={navelement}>
                    <Link className={lien} to={URL_ADMIN_ORDERS}>Commandes</Link>
                </li>
                <li className={navelement}>
                    <Link className={lien} to={URL_ADMIN_CONTACT}>Contact</Link>
                </li>
                <li className={navelement}>
                    <Link className={lien} to={URL_ADMIN_PROMOTION}>Promotions</Link>
                </li>
            </ul>
        </div>
    )
}

export default NavAdmin