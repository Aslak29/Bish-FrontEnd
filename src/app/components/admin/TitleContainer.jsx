import React, { useState } from 'react'
import addIMG from '../../assets/images/add.png'
import { search } from '../../services/adminServices';
import ModalCrud from '../../components/admin/ModalCrud';

const TitleContainer = props => {
    return (
        <>
            <div className='flex flex-row shadow fixed top-0 right-0 mt-20 bish-bg-white w-full z-10'>
                <div className='w-12 sm:w-72'></div>
                <div className='flex flex-row justify-between space-x-5 h-20 w-full px-10'>
                    <span className='text-center my-auto text-2xl font-medium'>{props.name}</span>
                    <input className='w-1/3 h-10 my-auto' type="text" id="searchInput" onKeyUp={() => search()} placeholder="Rechercher.."/>
                    {
                        props.addButton &&
                        <button className='my-auto bg-green-600 p-2 bish-text-white font-medium' onClick={() => props.openModal()}>
                            <img className='h-5 lg:h-8' src={addIMG} alt="Ajouter" />
                        </button>
                    }
                </div>
            </div>
            {/* Modal CREATE */}
            {
                props.addButton &&
                <ModalCrud modalIsOpen={props.modalIsOpen} openModal={props.openModal} closeModal={props.closeModal} form={props.form}/>
            }
        </>
    )
}

export default TitleContainer