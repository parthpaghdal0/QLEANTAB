import React, { useState } from "react"
import * as Style from "./product-ingredients.module.scss"
import { ProductLeafsIcon } from "../../../assets/components/icons/Icons"
import { ProductBoxIcon } from "../../../assets/components/icons/Icons"

const ProductIngredients = ({ data, popupFn }) => {
  const isBrowser = typeof window !== "undefined"
  const [popupOpened, setPopupOpened] = useState(false)
  const [popupData, setPopupData] = useState(null)
  const [tabIndex, setTabIndex] = useState(0)
  const togglePopup = index => {
    setPopupOpened(!popupOpened)
    setTabIndex(index)
    if (index === 1) {
      setPopupData(data?.tab1)

      popupFn(1)
    } else if (index === 2) {
      setPopupData(data?.tab2)
      popupFn(2)
    }
  }

  return (
    <div className={Style.product_ingredients}>
      <div className={Style.tab1} onClick={() => togglePopup(1)}>
        <div className={Style.tabBroder}>
          <ProductBoxIcon />
          {data?.tab1.heading && <p>{data?.tab1.heading}</p>}
        </div>
      </div>
      <div className={Style.tab2} onClick={() => togglePopup(2)}>
        <div className={Style.tabBroder}>
          <ProductLeafsIcon />
          {data?.tab2.heading && <p>{data?.tab2.heading}</p>}
        </div>
      </div>
    </div>
  )
}

export default ProductIngredients
