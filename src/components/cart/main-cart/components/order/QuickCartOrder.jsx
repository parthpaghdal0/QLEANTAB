import React from "react"
import * as Style from "./QuickCartOrder.module.scss"

const Order = ({ heading, children }) => {
  return (
    <div className={Style.quickCartMainWrapper}>
      <h4 className={Style.quickCartOrderHeading}>{heading}</h4>
      {children}
    </div>
  )
}

export default Order
