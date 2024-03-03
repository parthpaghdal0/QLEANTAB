import React from "react"
import * as Style from "./product-shipping.module.scss"
import { CloseIcon } from "../../../assets/components/icons/Icons"
import ProductContext from "../../../context/ProductContext"

const ProductShipping = ({ isActive, togglePopup }) => {
  const { strapiHelperText } = useContext(ProductContext)
  return (
    <section
      className={`${Style.shipping_container} ${isActive ? Style.active : ""}`}
    >
      <div className={Style.shipping}>
        <div className={Style.close} onClick={togglePopup}>
          <CloseIcon />
          <span>{strapiHelperText?.CloseButton}</span>
        </div>
      </div>
    </section>
  )
}

export default ProductShipping
