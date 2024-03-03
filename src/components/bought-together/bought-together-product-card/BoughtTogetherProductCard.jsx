import React, { useState, useContext } from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import * as Style from "./BoughtTogetherProductCard.module.scss"
import CustomCheckbox from "../../UI/custom-checkbox/CustomCheckbox"
import { PlusIconProducts } from "../../../assets/components/icons/Icons"
import { navigate } from "gatsby"
import useTrackCart from "../../../custom-hooks/track-cart"
import ProductContext from "../../../context/ProductContext"
import useGlobalLang from "../../../custom-hooks/useGlobalLang"

const BoughtTogetherProductCard = ({
  product,
  title,
  variats,
  image,
  itemPlace,
  collectionLength,
  handle,
  adjustToBuyItemsHandler,
  discount,
  currencySymbol,
  collectionHandle,
}) => {
  const [checked, setChecked] = useState(true)
  const { strapiHelperText } = useContext(ProductContext)
  const checkBoxHandler = () => {
    setChecked(!checked)
    adjustToBuyItemsHandler(handle, !checked, {
      handle: handle,
      variantId: variats[0].shopifyId,
      quantity: 1,
      price: variats[0].price,
      index: itemPlace,
    })
  }
  const { selectItmHandler } = useTrackCart()
  const { GLOBAL_LANG } = useGlobalLang()

  return (
    <div className={Style.productWidthContorll}>
      {collectionLength !== itemPlace && (itemPlace + 1) % 2 !== 0 && (
        <div className={Style.plusIconAlt}>
          <PlusIconProducts />
        </div>
      )}
      <div
        className={`${Style.productWrapper} ${
          (itemPlace + 1) % 2 !== 0
            ? Style.mobilePaddingLeft
            : Style.mobilePaddingRight
        }`}
      >
        <div
          onClick={() => {
            selectItmHandler(product, {
              listName: collectionHandle,
              index: itemPlace + 1,
            })

            const url =
              GLOBAL_LANG === "en"
                ? `/en/products/${handle}`
                : `/products/${handle}`

            navigate(url)
          }}
          className={Style.imageWrapper}
        >
          <GatsbyImage
            image={image}
            alt="product-img"
            className={Style.productImage}
          />
          {collectionLength !== itemPlace && (
            <div className={Style.plusIcon}>
              <PlusIconProducts />
            </div>
          )}
        </div>
        {itemPlace !== 0 && (
          <div className={Style.checkboxWrapper}>
            <CustomCheckbox checkboxHandler={checkBoxHandler} />
            <p className={Style.productText}>{strapiHelperText?.NewItem}</p>
          </div>
        )}
        {itemPlace === 0 && (
          <p className={Style.productText}>{strapiHelperText?.ThisItem}</p>
        )}
        <p className={Style.producTitle}>{title}</p>
        <div className={Style.priceWrappper}>
          {discount && (
            <p className={Style.price}>{`${currencySymbol && currencySymbol} ${(
              variats[0].price -
              variats[0].price / 10
            ).toFixed(2)}`}</p>
          )}
          <p
            className={`${Style.comparePrice} ${!discount ? Style.price : ""}`}
          >{`${currencySymbol && currencySymbol} ${variats[0].price.toFixed(
            1
          )}`}</p>
        </div>
      </div>
    </div>
  )
}

export default BoughtTogetherProductCard
