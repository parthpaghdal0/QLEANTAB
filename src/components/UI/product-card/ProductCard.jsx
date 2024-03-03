import React, { useContext } from "react"
import { getImage, GatsbyImage } from "gatsby-plugin-image"
import CustomButton from "../../UI/custom-button/CustomButton"
import Raiting from "../../raiting/Raiting"
import { Link } from "gatsby"
import CheckoutContext from "../../../context/CheckoutContext"
import ProductContext from "../../../context/ProductContext"
import useTrackCart from "../../../custom-hooks/track-cart"
import useGlobalLang from "../../../custom-hooks/useGlobalLang"

import * as Styles from "./ProductCard.module.scss"

const ProductCard = ({ product, title, index, variant, productid }) => {
  const { GLOBAL_LANG } = useGlobalLang()
  const { updateLineItem, setOpenCart, openCart } = useContext(CheckoutContext)
  const { currency, currencySymbol, strapiHelperText } =
    useContext(ProductContext)
  const { selectItmHandler } = useTrackCart()

  return (
    <div className={Styles.card_container}>
      <Link
        onClick={selectItmHandler.bind(this, product, {
          listName: title,
          index: index + 1,
        })}
        to={
          GLOBAL_LANG
            ? `/en/products/${product.handle}`
            : `/products/${product.handle}`
        }
      >
        <GatsbyImage
          image={getImage(product?.featuredImage.gatsbyImageData)}
          alt={product?.title}
          width={312}
          height={312}
          className={Styles.product_image}
          imgStyle={{
            objectFit: "contain",
            objectPosition: "50% 50%",
          }}
        />
        <div className={Styles.stars_container}>
          <Raiting productid={product.shopifyId} collectionItem={true} />
        </div>
        <p className={Styles.title}>{product.title}</p>
        <div className={Styles.price}>
          {product.variants[0].compareAtPrice && (
            <p className={Styles.oldPrice}>
              {product.variants[0].compareAtPrice.toFixed(2)}
              {currencySymbol && ` ${currencySymbol}`}
            </p>
          )}
          <p className={Styles.newPrice}>
            {product.variants[0].price.toFixed(2)}
            {currencySymbol && ` ${currencySymbol}`}
          </p>
        </div>
      </Link>
      <CustomButton
        style={Styles.button}
        globalStyles={true}
        buttonHandler={() => {
          updateLineItem(
            {
              variantId: product.variants[0].shopifyId,
              quantity: +1,
            },
            "defult",
            {
              location: { listName: title, index: index },
              item: {
                id: product.shopifyId,
                quantity: 1,
                sub: false,
                variant: variant,
              },
            }
          )
          setOpenCart(!openCart)
        }}
      >
        {strapiHelperText?.AddToCart}
      </CustomButton>
    </div>
  )
}

export default ProductCard
