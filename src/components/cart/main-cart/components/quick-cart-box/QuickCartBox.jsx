import React from "react"
import * as Style from "./QuickCartBox.module.scss"

const QuickCartBox = ({
  heading,
  total,
  items_in,
  totalprice,
  totalProductCount,
}) => {
  return (
    <div className={Style.quickCartBoxWrapper}>
      <h4 className={Style.quickCartBoxHeading}>{heading}</h4>
      <div
        className={Style.itemsInShoppingCartWraper}
      >{`${totalProductCount} ${items_in}`}</div>
      <div className={Style.totlaPriceWrapper}>
        <p className={Style.text}>{total}</p>
        <p className={Style.totalPrice}>Kr {Number(totalprice).toFixed(2)}</p>
      </div>
    </div>
  )
}

export default QuickCartBox
