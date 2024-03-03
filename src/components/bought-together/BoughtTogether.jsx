import React, { useContext, useEffect, useState } from "react"
import * as Style from "./BoughtTogether.module.scss"
import ProductContext from "../../context/ProductContext"
import CheckoutContext from "../../context/CheckoutContext"
import BoughtTogetherProductCard from "./bought-together-product-card/BoughtTogetherProductCard"
import CustomButton from "../UI/custom-button/CustomButton"

const BoughtTogether = ({ collectionHandle }) => {
  const isBrowser = typeof window !== "undefined"
  const { shopifyCollections, currency, currencySymbol, strapiHelperText } =
    useContext(ProductContext)
  const { addCollection, setOpenCart, openCart } = useContext(CheckoutContext)
  const [collection, setCollection] = useState([])
  const [collectionLength, setCollectionLength] = useState(0)
  const [toBuyItems, setTobuyItems] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [comparePrice, setComparePrice] = useState(0)
  const [discount, setDiscount] = useState(true)

  const adjustToBuyItemsHandler = (handle, checked, product = null) => {
    if (!checked) {
      const newItemList = toBuyItems.filter(item => {
        return item.handle !== handle
      })
      setTobuyItems(newItemList)
      setDiscount(false)
      caculatePrice(newItemList)
    } else {
      const newItemList = [...toBuyItems]
      newItemList.push(product)
      if (newItemList.length === collection.length) {
        setDiscount(true)
      }
      setTobuyItems(newItemList)
      caculatePrice(newItemList)
    }
  }

  useEffect(() => {
    if (isBrowser && shopifyCollections) {
      const singleCollection = shopifyCollections.nodes.filter(item => {
        return item.title === collectionHandle
      })
      const products = singleCollection[0].products

      const productArr = products.map((item, index) => {
        return {
          item_name: item.title,
          item_id: item.shopifyId.split("/").pop(),
          price: (
            Number(item.variants[0].price) -
            Number(item.variants[0].price) / 10
          ).toFixed(2),
          currency: item.variants[0].presentmentPrices[4].price.currencyCode,
          item_category: item.productType,
          item_list_name: singleCollection[0].title,
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

  useEffect(() => {
    if (shopifyCollections) {
      const singleCollection = shopifyCollections.nodes.filter(item => {
        return item.title === collectionHandle
      })

      setCollectionLength(singleCollection[0].products.length - 1)
      setCollection(singleCollection[0].products)
      setTobuyItems(
        singleCollection[0].products.map((item, index) => {
          return {
            handle: item.handle,
            variantId: item.variants[0].shopifyId,
            quantity: 1,
            price: item.variants[0].price,
            index: index,
          }
        })
      )

      caculatePrice(singleCollection[0].products, "initial")
    }
  }, [shopifyCollections])

  const caculatePrice = (newItemList, mode = null) => {
    const price = newItemList
      .map(item => {
        if (mode === "initial") {
          return item.variants[0].price
        } else {
          return item.price
        }
      })
      .reduce((previousValue, currentValue) => previousValue + currentValue)

    const reducedPrice = price - price / 10
    setTotalPrice(reducedPrice)
    setComparePrice(price)
  }

  return (
    <>
      <h2 className={Style.heading}>{strapiHelperText?.FrequentlyBought}</h2>
      <p className={Style.subheading}>{strapiHelperText?.ChooseOption}</p>
      <div className={Style.BoughtTogetherWrapper}>
        {collection.map((item, index) => {
          return (
            <BoughtTogetherProductCard
              product={item}
              discount={discount}
              adjustToBuyItemsHandler={adjustToBuyItemsHandler}
              handle={item.handle}
              itemPlace={index}
              collectionLength={collectionLength}
              key={item.id}
              title={item.title}
              variats={item.variants}
              image={item.featuredImage.gatsbyImageData}
              currencySymbol={currencySymbol}
              collectionHandle={collectionHandle}
            />
          )
        })}

        <div className={Style.formWrapper}>
          <p className={Style.totalText}>{strapiHelperText?.Total}:</p>
          <div className={Style.totalPriceWrapper}>
            {discount && (
              <p className={Style.totalPrice}>{`${
                currencySymbol && currencySymbol
              } ${Number(totalPrice).toFixed(2)}`}</p>
            )}
            <p
              className={`${Style.totalComparePrice} ${
                !discount ? Style.totalPrice : ""
              }`}
            >{`${currencySymbol && currencySymbol} ${Number(
              comparePrice
            ).toFixed(2)}`}</p>
          </div>
          <CustomButton
            buttonHandler={() => {
              addCollection(toBuyItems, {
                listName: "Frequently bought together",
              })
              setOpenCart(!openCart)
            }}
            globalStyles={true}
            style={Style.addBtn}
          >
            {strapiHelperText?.AddToCart}
          </CustomButton>
          <p className={Style.info}>
          {strapiHelperText?.BuyProducts} <br /> {strapiHelperText?.AndGet}
            <span className={Style.infoSpan}> 10% {strapiHelperText?.Discount}</span>
          </p>
        </div>
      </div>
    </>
  )
}

export default BoughtTogether
