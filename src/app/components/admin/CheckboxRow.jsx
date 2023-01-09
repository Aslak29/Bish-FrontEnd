import React, { useState } from 'react'

const CheckboxRow = props => {

    const toggleRowCheck = id => {
        const isCheck = document.getElementById('checkRow' + id).checked
        if (isCheck) {
          props.setRowsCheck(current => [...current, id])
        } else {
          props.setRowsCheck(current => [...current.filter(res => res !== id)])
        }
    }

    return (
      <>
          <input type="checkbox" id={`checkRow${props.id}`} onClick={() => toggleRowCheck(props.id)}/>
      </>
    )
}

export default CheckboxRow