import React, { useContext, useEffect, useState } from "react"
import { GatsbyImage } from "gatsby-plugin-image"
// import { Link } from "gatsby-plugin-react-i18next"
import GatsbyLink from "gatsby-link"
import Raiting from "../raiting/Raiting"
import * as Style from "./product-item.module.scss"
import CustomButton from "../UI/custom-button/CustomButton"
import CheckoutContext from "../../context/CheckoutContext"
import ProductContext from "../../context/ProductContext"
import useTracCart from "../../custom-hooks/track-cart"
import useGlobalLang from "../../custom-hooks/useGlobalLang"
const ProductItem = ({ product, index }) => {
  const { GLOBAL_LANG } = useGlobalLang()

  const { updateLineItem, setOpenCart, openCart } = useContext(CheckoutContext)
  const { currency, currencySymbol, strapiHelperText } =
    useContext(ProductContext)
  const [amount, setAmount] = useState(null)

  const { selectItmHandler } = useTracCart()
  useEffect(() => {
    if (currency && product && product.variants.length) {
      const currencyAmount = product.variants[0]?.presentmentPrices.find(
        i => i.price.currencyCode === currency
      )
      setAmount(
        currencyAmount.price.amount ? currencyAmount.price.amount : null
      )
    }
  }, [currency, product])

  const addToCart = () => {
    setOpenCart(!openCart)
    updateLineItem(
      { variantId: product.variants[0]?.shopifyId, quantity: 1 },
      "defult",
      {
        location: { listName: "shop", index: index },
        item: {
          id: product.shopifyId,
          quantity: 1,
          sub: false,
          variant: false,
        },
      }
    )
  }

  return (
    <div className={Style.product}>
      <GatsbyLink
        onClick={selectItmHandler.bind(this, product, {
          listName: "shop",
          index: index + 1,
        })}
        to={
          GLOBAL_LANG === "en"
            ? `/en/products/${product.handle}`
            : `/products/${product.handle}`
        }
      >
        <GatsbyImage
          image={product?.featuredImage?.gatsbyImageData}
          alt={product?.featuredImage?.altText || `${product?.handle}-image`}
          width={312}
          height={312}
          className={Style.product_image}
          imgStyle={{
            objectFit: "contain",
            objectPosition: "50% 50%",
          }}
        />

        <Raiting
          styleClass={Style.rating}
          productid={product.shopifyId}
          collectionItem={true}
        />
        <h3 className={Style.product_heading}>{product.title}</h3>
        <p className={Style.product_price}>
          {product?.variants[0]?.compareAtPrice && (
            <span className={Style.compare_price}>
              {product?.variants[0]?.compareAtPrice.toFixed(2)}{" "}
              {currencySymbol && currencySymbol}
            </span>
          )}
          <span className={Style.price}>
            {product?.variants[0]?.price.toFixed(2)}{" "}
            {currencySymbol && currencySymbol}
          </span>
        </p>
      </GatsbyLink>
      <CustomButton
        globalStyles={true}
        buttonHandler={addToCart}
        style={Style.product_button}
      >
        {strapiHelperText?.AddToCart}
      </CustomButton>
    </div>
  )
}

export default ProductItem
