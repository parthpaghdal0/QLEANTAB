import React, { useState, useContext, useEffect } from "react"
import ProductIngredients from "../../../product-template/product-ingredients/ProductIngredients"
import ProductQuantity from "../../../product-template/product-quantity/ProductQuantity"
import Button from "../../../UI/custom-button/CustomButton"
import CheckoutContext from "../../../../context/CheckoutContext"
import ProductContext from "../../../../context/ProductContext"
import * as Style from "./LandingProductInformation.module.scss"
import Raiting from "../../../raiting/Raiting"
import { ShareIcon } from "../../../../assets/components/icons/Icons"
import { getImage, GatsbyImage } from "gatsby-plugin-image"
import { ExpandMore } from "../../../../assets/components/icons/Icons"
import Markdown from "react-markdown"

const LandingProductInformation = ({
  data,
  productIngredients,
  popupFn,
  getSelectedVariant,
  productid,
  strapiHelperText,
  paymentIcons,
  shortDesc,
  fullDesc,
}) => {
  const isBrowser = typeof window !== "undefined"
  const { updateLineItem, updateSubscriptionLineItem, getProductByHandle } =
    useContext(CheckoutContext)
  const { getProductById, currency, currencySymbol } =
    useContext(ProductContext)

  const [quantity, setQuantity] = useState(1)
  const [sellingPlanId, setSellingPlanId] = useState(null)
  const [selectedVariant, setSelectedVariant] = useState(null)
  const [productLocation, setProductLocation] = useState("")
  const [showVariants, setShowVariants] = useState(false)
  const [strapiProduct, setStrapiProduct] = useState(null)
  const [showFullDes, setShowFullDes] = useState(false)

  const updateQuantity = value => {
    setQuantity(prevQuantity => prevQuantity + value)
  }

  const handleDiscount = () => {
    if (sellingPlanId) {
      updateSubscriptionLineItem(
        {
          variantId: selectedVariant.shopifyId,
          quantity: +quantity,
          sellingPlanId,
        },
        "buy-now-async",
        null,
        true
      )
    } else {
      updateLineItem(
        {
          variantId: selectedVariant.shopifyId,
          quantity: +quantity,
        },
        "buy-now-async",
        null,
        true
      )
    }
  }

  const shareHandler = () => {
    if (isBrowser) {
      const shareData = {
        url: productLocation,
      }

      navigator.share(shareData)
    }
  }

  useEffect(() => {
    if (isBrowser) {
      const location = window.location.href
      setProductLocation(location)
    }
  }, [])

  useEffect(() => {
    for (const variant of data.variants) {
      if (variant.title !== "Default Title") {
        setShowVariants(true)
        break
      }
    }
    setSelectedVariant(data.variants[0])
    const strapiContextProduct = getProductById(data.shopifyId)

    setStrapiProduct(strapiContextProduct)
  }, [getProductByHandle, data])

  return (
    <div className={Style.productWrapper}>
      <div className={Style.rating}>
        <Raiting productid={productid} />
      </div>

      <div className={Style.titleWrapper}>
        <h3 className={Style.productTitle}>{data.title}</h3>
        <Button style={Style.shareBtn} buttonHandler={shareHandler}>
          <div className={Style.product_icon}>
            <ShareIcon />
          </div>
        </Button>
      </div>

      <div className={Style.productPrice}>{`${currencySymbol} ${Number(
        data.variants[0].price
      ).toFixed(2)}`}</div>

      {/* <p className={Style.productDesccription}>
        {productIngredients?.description}
      </p> */}

      <div className={Style.decWrapper}>
        <Button
          style={Style.showMoreBtn}
          buttonHandler={setShowFullDes.bind(this, !showFullDes)}
        >
          <div
            className={`${Style.expandIconWrapper} ${
              showFullDes ? Style.expandIconWrapperActive : ""
            }`}
          >
            <ExpandMore />
          </div>
        </Button>
        {!showFullDes && (
          <div className={Style.productDesccription}>
            <Markdown children={shortDesc} />
          </div>
        )}
        {showFullDes && (
          <div className={Style.productDesccription}>
            <Markdown children={fullDesc} />
          </div>
        )}
      </div>

      <div className={Style.ingrediats}>
        <ProductIngredients
          data={productIngredients}
          popupFn={val => popupFn(val)}
        />
      </div>

      <div className={Style.contols}>
        <p className={Style.quantity}>{strapiHelperText?.Quantity}:</p>
        <div className={Style.ctaWrapper}>
          <ProductQuantity
            updateQuantity={updateQuantity}
            quantity={quantity}
            landing={true}
          />
          <Button
            buttonHandler={handleDiscount}
            style={`${Style.cta} buy-landing-cta`}
          >
            {strapiHelperText?.BuyNow}
          </Button>
        </div>
      </div>
      <div className={Style.paymnetIcons}>
        {paymentIcons.map((item, index) => {
          return (
            <div key={index} className={Style.iconWrapper}>
              <GatsbyImage
                image={getImage(item.localFile.childImageSharp.gatsbyImageData)}
                alt="icon"
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default LandingProductInformation
