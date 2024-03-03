import React, { useEffect, useContext } from "react"
import * as Styles from "./BestsellingProducts.module.scss"
import ProductCard from "../UI/product-card/ProductCard"
import ProductContext from "../../context/ProductContext"

const BestsellingProducts = ({
  collections,
  handle,
  customMarginTop,
  customMarginBottom,
}) => {
  const isBrowser = typeof window !== "undefined"
  const collection = collections.filter(item => {
    return item.handle === handle
  })
  const products = collection[0].products
  const { collectionTitle } = useContext(ProductContext)
  const translatedTitle = collectionTitle.collTitle.filter(item => {
    return item.handle === handle
  })[0].title

  useEffect(() => {
    if (isBrowser) {
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
  }, [])

  return (
    <div
      className={`${Styles.bestselling_products} ${
        customMarginTop && Styles.custom_margin_top
      } ${customMarginBottom && Styles.custom_margin_bottom}`}
    >
      <h3>{translatedTitle}</h3>
      <div className={Styles.products_container}>
        {collection[0].products?.map((product, index) => {
          return (
            <ProductCard
              key={index}
              product={product}
              index={index}
              title={collection[0].title}
              variant={product.variants[0].title}
            />
          )
        })}
      </div>
    </div>
  )
}

export default BestsellingProducts
