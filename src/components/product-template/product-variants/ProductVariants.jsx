import React from "react"
import * as Style from "./product-variants.module.scss"

const ProductVariants = ({ variants, handleVariant, selectedVariantId }) => {
  const getCount = title => {
    const regex = /\d+/g
    const matches = title.match(regex)
    return matches ? matches[0] : title.charAt(0)
  }

  return (
    <div className={Style.variants}>
      {variants.map(item => {
        return (
          item.title !== "Default Title" && (
            <div
              className={`${Style.variant} ${
                selectedVariantId === item.shopifyId ? Style.active : ""
              }`}
              key={item.shopifyId}
              onClick={() => handleVariant(item)}
            >
              {getCount(item.title)}
            </div>
          )
        )
      })}
    </div>
  )
}

export default ProductVariants
