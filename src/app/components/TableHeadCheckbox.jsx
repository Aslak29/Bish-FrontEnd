import React from 'react'

const TableHeadCheckbox = props => {

    const toggleAllRowsCheck = () => {
        const isCheck = document.getElementById('allRowsCheck').checked
        if (isCheck) {
          props.setRowsCheck(props.allIds)
        } else {
          props.setRowsCheck([])
        }
        document.querySelectorAll('table [id^="checkRow"]').forEach(checkbox => {
          checkbox.checked = isCheck;
        })
    }

    return (
      <>
        <th><input type="checkbox" id="allRowsCheck" onChange={() => toggleAllRowsCheck()}/></th>
      </>
    )
}

export default TableHeadCheckbox