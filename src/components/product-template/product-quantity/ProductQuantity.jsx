import React from "react"
import * as Style from "./product-quantity.module.scss"
import { PlusIcon, MinusIcon } from "../../../assets/components/icons/Icons"

const ProductQuantity = ({ updateQuantity, quantity, landing = false }) => {
  return (
    <div className={`${Style.quantity} ${landing ? Style.landing : ""}`}>
      <div
        onClick={() => updateQuantity(quantity > 0 ? -1 : 0)}
        className={Style.quantity_icon}
      >
        <MinusIcon />
      </div>
      <p> {quantity}</p>
      <div onClick={() => updateQuantity(1)} className={Style.quantity_icon}>
        <PlusIcon />
      </div>
    </div>
  )
}

export default ProductQuantity
