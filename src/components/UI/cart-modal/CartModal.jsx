import React, { useContext } from "react"
import CheckoutContext from "../../../context/CheckoutContext"
import * as Style from "./CartModal.module.scss"

const CratModal = ({ children, mode }) => {
  const ctx = useContext(CheckoutContext)

  const ModalHandler = event => {
    if (event.target.dataset.type === "modal") {
      if (mode === "quick-cart") {
        ctx.setOpenCart(!ctx.openCart)
      }

      if (mode === "side-cart") {
        ctx.setSideOpenCart(!ctx.openSideCart)
      }
    }
  }

  return (
    <div
      data-type="modal"
      className={`${`${Style.blockModal} ${
        mode === "side-cart" ? Style.blockModalSideCart : ""
      }`} ${
        ctx.openCart && mode === "quick-cart" ? Style.blockModalActive : ""
      } ${
        ctx.openSideCart && mode === "side-cart" ? Style.blockModalActive : ""
      }`}
      onClick={ModalHandler}
    >
      {children}
    </div>
  )
}

export default CratModal
