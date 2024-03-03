import React from "react"
import * as Style from "./AddressPopup.module.scss"

const AddressPopup = ({ children, showForm, setShowForm }) => {
  const modalHandler = event => {
    if (event.target.dataset.type === "modal") {
      setShowForm(!setShowForm)
    }
  }

  return (
    <div
      onMouseDown={modalHandler}
      data-type="modal"
      className={`${Style.popUp} ${showForm ? Style.popUpActive : ""}`}
    >
      {children}
    </div>
  )
}

export default AddressPopup
