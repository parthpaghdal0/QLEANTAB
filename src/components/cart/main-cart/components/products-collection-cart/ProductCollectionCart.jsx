import React, { useContext, useEffect } from "react"
import CheckoutContext from "../../../../../context/CheckoutContext"
import * as Style from "./ProductCollectionCart.module.scss"
import { GatsbyImage } from "gatsby-plugin-image"
import Raiting from "../../../../raiting/Raiting"
import CustomButton from "../../../../UI/custom-button/CustomButton"
import { navigate } from "gatsby"
import useTrackCart from "../../../../../custom-hooks/track-cart"
import ProductContext from "../../../../../context/ProductContext"
import useGlobalLang from "../../../../../custom-hooks/useGlobalLang"

const ProductCollectionCart = ({
  setOpenCart,
  collections,
  handle,
  openCart,
}) => {
  const { GLOBAL_LANG } = useGlobalLang()
  const isBrowser = typeof window !== "undefined"
  const collection = collections.filter(item => {
    return item.handle === handle
  })
  const { selectItmHandler } = useTrackCart()

  const title = collection[0].title
  const products = collection[0].products
  const { updateLineItem } = useContext(CheckoutContext)
  const { strapiHelperText, collectionTitle } = useContext(ProductContext)

  const translatedTitle = collectionTitle.collTitle.filter(item => {
    return item.handle === handle
  })[0].title

  useEffect(() => {
    if (isBrowser && openCart) {
      const productArr = products.map((item, index) => {
        return {
          item_name: item.title,
          item_id: item.shopifyId.split("/").pop(),
          price: item.variants[0].price,
          currency: item.variants[0].presentmentPrices[4].price.currencyCode,
          item_category: item.productType,
          item_list_name: collection[0].title,
          index: Number(index + 1),
          quantity: 1,
        }
      })

      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({ ecommerce: null })
      window.dataLayer.push({
        event: "view_item_list",
        ecommerce: {
          items: productArr,
        },
      })
    }
  }, [openCart])

  const navigateToProductHandler = handle => {
    setOpenCart(false)
    const url =
      GLOBAL_LANG === "en" ? `/en/products/${handle}` : `/products/${handle}`

    navigate(url)
  }

  return (
    <div className={Style.collectionWrapper}>
      <h4>{translatedTitle}</h4>
      <div className={Style.itemsWrapper}>
        {products.map((item, index) => {
          return (
            <div key={item.id}>
              <div
                onClick={() => {
                  navigateToProductHandler(item.handle)
                  selectItmHandler(item, {
                    listName: title,
                    index: index + 1,
                  })
                }}
                className={Style.navigate}
              >
                <div className={Style.productImageWrapper}>
                  <GatsbyImage
                    image={item.featuredImage.gatsbyImageData}
                    alt="product-img"
                  />
                </div>
                <div className={Style.ratingWrapper}>
                  <Raiting
                    styleClass={Style.rating}
                    productid={item.shopifyId}
                    collectionItem={true}
                  />
                </div>

                <p className={Style.productTitle}>{item.title}</p>
                <div className={Style.priceWrapper}>
                  <p
                    className={Style.price}
                  >{`Kr ${item.variants[0].price.toFixed(2)}`}</p>
                  <p className={Style.compare}>
                    {item.variants[0].compareAtPrice
                      ? `Kr ${item.variants[0].compareAtPrice.toFixed(2)}`
                      : ""}
                  </p>
                </div>
              </div>
              <CustomButton
                buttonHandler={() =>
                  updateLineItem(
                    {
                      variantId: item.variants[0].shopifyId,
                      quantity: +1,
                    },
                    "defult",
                    {
                      location: { listName: "cart-list", index: index },
                      item: {
                        id: item.shopifyId,
                        quantity: 1,
                        sub: false,
                        variant: item.variants[0].title,
                      },
                    }
                  )
                }
                style={Style.addBtn}
                globalStyles={true}
              >
                {strapiHelperText?.AddToCart}
              </CustomButton>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ProductCollectionCart
