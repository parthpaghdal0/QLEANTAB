import React, { useState, useContext, useEffect, lazy } from "react"
import CheckoutContext from "../../../context/CheckoutContext"
import ProductContext from "../../../context/ProductContext"
import * as Style from "./product-information.module.scss"
import CustomButton from "../../UI/custom-button/CustomButton"
import Divider from "../../UI/divider/Divider"
import ProductQuantity from "../product-quantity/ProductQuantity"
import { ShareIcon } from "../../../assets/components/icons/Icons"
import Raiting from "../../raiting/Raiting"
import ProductPaymentIcons from "../product-payment-icons/ProductPaymentIcons"
import Subscription from "../../subscription/Subscription"
import ProductPrice from "../product-price/ProductPrice"
import ProductIngredients from "../product-ingredients/ProductIngredients"
import ProductVariants from "../product-variants/ProductVariants"
import GatsbyLink from "gatsby-link"
import YotpoProductSummary from "../../youtpo-reviews/components/YotpoProductSummary"
import useRating from "../../../custom-hooks/useRating"
import { navigate } from "gatsby"
import useTrackCart from "../../../custom-hooks/track-cart"

const loremText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit."
const ProductInformation = ({
  data,
  productIngredients,
  popupFn,
  getSelectedVariant,
  productid,
}) => {
  const isBrowser = typeof window !== "undefined"
  const [quantity, setQuantity] = useState(1)
  const [selectedVariant, setSelectedVariant] = useState(null)
  const [strapiProduct, setStrapiProduct] = useState(null)
  const [sellingPlanId, setSellingPlanId] = useState(null)
  const [showSubscription, setShowSubscription] = useState(false)
  const [showVariants, setShowVariants] = useState(false)
  const [isReadMore, setIsReadMore] = useState(false)
  const [productLocation, setProductLocation] = useState("")
  const {
    getProductByHandle,
    checkout,
    updateLineItem,
    updateSubscriptionLineItem,
    setOpenCart,
  } = useContext(CheckoutContext)
  const {
    allStrapiProduct,
    getProductById,
    currency,
    currencySymbol,
    strapiHelperText,
  } = useContext(ProductContext)

  const { reviewsCount } = useRating(productid)

  const updateQuantity = value => {
    setQuantity(prevQuantity => prevQuantity + value)
  }

  useEffect(() => {
    if (isBrowser) {
      const location = window.location.href
      setProductLocation(location)
    }
  }, [])

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
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({ ecommerce: null })
      window.dataLayer.push({
        event: "view_item",
        ecommerce: {
          items: [
            {
              item_name: data.title,
              item_id: data.shopifyId.split("/").pop(),
              price: data.variants[0].price,
              currency:
                data.variants[0].presentmentPrices[4].price.currencyCode,
              item_category: data.productType,
              quantity: 1,
            },
          ],
        },
      })
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

  const handleSubmit = e => {
    if (sellingPlanId) {
      updateSubscriptionLineItem(
        {
          variantId: selectedVariant.shopifyId,
          quantity: +quantity,
          sellingPlanId,
        },
        "defult",
        {
          location: null,
          item: {
            id: data.shopifyId,
            quantity: quantity,
            sub: true,
            variant: selectedVariant.title,
          },
        }
      )
    } else {
      updateLineItem(
        {
          variantId: selectedVariant.shopifyId,
          quantity: +quantity,
        },
        "defult",
        {
          location: null,
          item: {
            id: data.shopifyId,
            quantity: quantity,
            sub: false,
            variant: selectedVariant.title,
          },
        }
      )
    }

    setOpenCart(true)
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

  const setSubscriptionId = id => {
    setSellingPlanId(id)
  }

  const handleShowSubscription = value => {
    setShowSubscription(value)
  }

  const hahandleVariant = variant => {
    setSelectedVariant(variant)
    getSelectedVariant(variant.shopifyId)
  }

  const excludeIngredients = () => {
    const excludeHandles = ["qleantab-bottles"]
    if (excludeHandles.includes(data.handle)) return true
    return false
  }

  return (
    <div className={Style.product_information}>
      {data?.title && (
        <div className={Style.product_heading}>
          <h1 className={Style.heading}>
            <span className={Style.heading_title}>{data.title}</span>
            {selectedVariant && selectedVariant.title !== "Default Title" && (
              <span className={Style.heading_subtitle}>
                {selectedVariant.title}
              </span>
            )}
          </h1>
          <div className={Style.product_icons}>
            <CustomButton buttonHandler={shareHandler}>
              <div className={Style.product_icon}>
                <ShareIcon />
              </div>
            </CustomButton>
          </div>
          <ProductPrice
            selectedVariant={selectedVariant}
            styleClass={Style.mobile_price}
            symbol={currencySymbol}
            currency={currency}
          />
        </div>
      )}

      <div className={Style.rating}>
        <Raiting productid={productid} />
        {reviewsCount !== 0 && (
          <div className={Style.ratingPopUp}>
            <YotpoProductSummary productid={productid} />
          </div>
        )}
      </div>

      <div className={Style.product_info}>
        <div className={Style.product_info_left}>
          <p className={Style.product_info_item}>
            {/* <span className={Style.product_info_information}>
              {strapiHelperText?.Availability}:
            </span> */}
            <span
              className={`${Style.product_info_content} ${Style.product_info_available}`}
            >
              {data.variants[0]?.availableForSale ? "In stock" : "Out of stock"}
            </span>
          </p>
          <p className={Style.product_info_item}>
            <span className={Style.product_info_information}>
              {strapiHelperText?.ShippingTime}:
            </span>
            <span className={Style.product_info_content}>
              {strapiHelperText?.FreeShipping}
            </span>
          </p>
        </div>
        <div className={Style.product_info_right}>
          <CustomButton
            globalStyles={true}
            style={`${Style.product_shipping_button} ${Style.product_default_button}`}
          >
            <GatsbyLink to={`/shipping-and-returns`}>
              {strapiHelperText?.ShippingReturns}
            </GatsbyLink>
          </CustomButton>
        </div>
      </div>
      <Divider styleClass={Style.decsktop} />
      <ProductPrice
        selectedVariant={selectedVariant}
        styleClass={Style.price_deckstop}
        symbol={currencySymbol}
        currency={currency}
      />
      <div className={Style.description}>
        {/* <p
          className={`${Style.description_content} ${
            isReadMore ? Style.active : ""
          }`}
        >
          {data?.description ? data?.description : loremText}
        </p> */}
        <p
          className={`${Style.description_content} ${
            isReadMore ? Style.active : ""
          }`}
        >
          {productIngredients?.description
            ? productIngredients?.description
            : loremText}
        </p>
        <div
          className={`${Style.product_description_mobile} ${
            isReadMore ? Style.active : ""
          }`}
        >
          {/* <p>{data?.description ? data?.description : loremText}</p> */}
          <p>
            {productIngredients?.description
              ? productIngredients?.description
              : loremText}
          </p>
          <Divider />
          {!excludeIngredients() && (
            <ProductIngredients
              data={productIngredients}
              popupFn={val => popupFn(val)}
            />
          )}
          <Divider />
          <div className={Style.shipping_mobile}>
            <p className={Style.product_info_item}>
              <span className={Style.product_info_information}>
                {strapiHelperText?.ShippingTime}
              </span>
              <span className={Style.product_info_content}>
                {strapiHelperText?.FreeShipping}
              </span>
            </p>
            <div className={Style.shipping_mobile_button}>
              <CustomButton
                globalStyles={true}
                style={`${Style.product_shipping_button}`}
              >
                <GatsbyLink to={`/shipping-and-returns`}>
                  {strapiHelperText?.ShippingReturns}
                </GatsbyLink>
              </CustomButton>
            </div>
          </div>
        </div>
        <p
          className={Style.read_more}
          onClick={() => setIsReadMore(!isReadMore)}
        >
          {strapiHelperText?.ReadText}{" "}
          {isReadMore ? strapiHelperText?.Less : strapiHelperText?.More}
        </p>
      </div>
      {showVariants && (
        <ProductVariants
          variants={data.variants}
          selectedVariantId={selectedVariant?.shopifyId}
          handleVariant={hahandleVariant}
        />
      )}
      <Divider
        styleClass={`${Style.divider_order_3} ${
          !showSubscription ? Style.decsktop : ""
        }`}
      />
      <Subscription
        setSubscriptionId={setSubscriptionId}
        handleShowSubscription={handleShowSubscription}
        product={strapiProduct}
      />
      {showSubscription && <Divider styleClass={Style.decsktop} />}
      {!excludeIngredients() && (
        <div className={Style.decsktop}>
          <ProductIngredients
            data={productIngredients}
            popupFn={val => popupFn(val)}
          />
        </div>
      )}
      <Divider styleClass={Style.divider_order_5} />

      <div className={Style.button_container}>
        <div>
          <p className={Style.quantity}>{strapiHelperText?.Quantity}:</p>
          <ProductQuantity
            updateQuantity={updateQuantity}
            quantity={quantity}
          />
        </div>
        <CustomButton
          buttonHandler={handleSubmit}
          globalStyles={true}
          style={`${Style.product_button} ${Style.product_default_button}`}
        >
          {strapiHelperText?.AddToCart}
        </CustomButton>
        <CustomButton
          globalStyles={true}
          buttonHandler={handleDiscount}
          style={`${Style.product_button} ${Style.decsktop}`}
        >
          {strapiHelperText?.BuyNow}
        </CustomButton>
      </div>
      <div className={Style.mobile_stock}>
        <p>
          <span className={Style.product_info_information}>
            {strapiHelperText?.AvailabilityText}:
          </span>
          <span
            className={`${Style.product_info_content} ${Style.product_info_available}`}
          >
            {data.variants[0]?.availableForSale
              ? strapiHelperText?.InStock
              : strapiHelperText?.OutOfStock}
          </span>
        </p>
      </div>
      <ProductPaymentIcons />
    </div>
  )
}
export default ProductInformation
