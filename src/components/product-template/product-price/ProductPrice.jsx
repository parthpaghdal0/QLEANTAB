import React, { useEffect, useState } from "react"
import * as Style from "./product-price.module.scss"

const ProductPrice = ({ styleClass, selectedVariant, symbol, currency }) => {
  const [amount, setAmount] = useState(null)
  const [compareAmout, setcompareAmout] = useState(null)

  useEffect(() => {
    if (selectedVariant) {
      const currencyAmount = selectedVariant.presentmentPrices.find(
        i => i.price.currencyCode === currency
      )
      setAmount(currencyAmount && currencyAmount.price.amount.toFixed(2))
      setcompareAmout(selectedVariant.compareAtPrice)
    }
  }, [currency, selectedVariant])

  return (
    <div className={`${Style.price} ${styleClass}`}>
      <p className={Style.main_curency}>
        <span className={Style.curency}>{symbol ? symbol : "€"}</span>
        {amount && amount}
      </p>
      {selectedVariant?.compareAtPrice && (
        <p className={Style.compare_curency}>
          <span className={Style.compare_cur}>{symbol ? symbol : "€"}</span>
          {amount && compareAmout.toFixed(2)}
        </p>
      )}
    </div>
  )
}

export default ProductPrice
