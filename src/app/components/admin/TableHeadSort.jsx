import React from 'react'
import { search, sort } from '../../services/adminServices';
import sortIMG from '../../assets/images/trier.png'

const TableHeadSort = props => {
  return (
    <th onClick={() => sort(props.nbSortColumn)}>
        <div className='flex py-5 justify-center items-center space-x-2 cursor-pointer'>
            <span className='truncate hover:text-clip' title={props.name}>{props.name}</span>
            <img className='h-4' src={sortIMG} alt={`Trier par ${props.name}`} />
        </div>
    </th>
  )
}

export default TableHeadSort