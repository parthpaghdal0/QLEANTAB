import React from "react"
import * as Style from "./product-payment-icons.module.scss"
import {
  ApplePayIcon,
  KlarnaPayIcon,
  PayPalIcon,
  VisaIcon,
  MasterCardIcon,
} from "../../../assets/components/icons/Icons"

const ProductPaymentIcons = ({ mode }) => {
  return (
    <div
      className={
        mode !== "footer" ? Style.icons_container : Style.icons_container_footer
      }
    >
      <ApplePayIcon />
      <KlarnaPayIcon />
      <PayPalIcon />
      <VisaIcon />
      <MasterCardIcon />
    </div>
  )
}

export default ProductPaymentIcons
