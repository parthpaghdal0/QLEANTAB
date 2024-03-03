import React, { useState, useContext, useEffect } from "react"
import * as Style from "./LadingProduct.module.scss"
import LandingProductInformation from "./lading-product-information/LandingProductInformation"
import IngredientsPopup from "../../product-template/product-ingredients/components/ingredients-popup/IngredientsPopup"
import ProductContext from "../../../context/ProductContext"
import LandingAskQuestion from "./landing-ask-question/LandingAskQuestion"
import { getImage, GatsbyImage } from "gatsby-plugin-image"

const LandingProduct = ({ data, shopifyProduct }) => {
  const isBrowser = typeof window !== "undefined"
  const [showPopup, setShowPopup] = useState(false)
  const [popupDate, setPopupData] = useState(null)
  const [tabIndex, setTabIndex] = useState(null)
  const [popupDataByVariant, setPopupDataByVariant] = useState(null)
  const [selectedVariant, setSelectedVariant] = useState(null)
  const { strapiHelperText } = useContext(ProductContext)

  //
  const image = data.ladingImage.localFile.childImageSharp.gatsbyImageData
  const paymentIcons = data.paymentIcons
  const askQuestionData = data.landingQuestion
  const bgDesktop = data.bgDesktop.url
  const bgMobile = data.bgMobile.url
  const fullDesc = data.fullDescription.data.fullDescription
  const shortDesc = data.shortDescription.data.shortDescription

  useEffect(() => {
    if (isBrowser) {
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({ ecommerce: null })
      window.dataLayer.push({
        event: "view_item",
        ecommerce: {
          items: [
            {
              item_name: shopifyProduct.title,
              item_id: shopifyProduct.shopifyId.split("/").pop(),
              price: shopifyProduct.variants[0].price,
              currency:
                shopifyProduct.variants[0].presentmentPrices[4].price
                  .currencyCode,
              item_category: shopifyProduct.productType,
              quantity: 1,
            },
          ],
        },
      })
    }
  }, [])

  const popupFn = val => {
    setShowPopup(!showPopup)
    setTabIndex(val)
    if (val === 1) {
      if (popupDataByVariant) {
        setPopupData(popupDataByVariant)
      } else {
        setPopupData(data.product.tab1)
      }
    } else if (val === 2) {
      if (data.product.bundle_content.length > 0) {
        setPopupData(data.product.bundle_content)
      } else {
        setPopupData(data.product.tab2)
      }
    }
  }

  const getSelectedVariant = val => {
    setSelectedVariant(val)
  }

  const content = (
    <>
      <section className={Style.productWrapper}>
        <div className={`${Style.imageSection}`}>
          <div className={Style.imgWrapper}>
            <GatsbyImage image={getImage(image)} alt="product-image" />
          </div>
        </div>
        <div className={Style.productSection}>
          <LandingProductInformation
            data={shopifyProduct}
            productIngredients={data.product}
            popupFn={val => popupFn(val)}
            getSelectedVariant={val => {
              getSelectedVariant(val)
            }}
            productid={shopifyProduct.shopifyId}
            strapiHelperText={strapiHelperText}
            paymentIcons={paymentIcons}
            fullDesc={fullDesc}
            shortDesc={shortDesc}
          />
        </div>
      </section>
      {askQuestionData && (
        <div className={Style.questionWrapper}>
          <LandingAskQuestion data={askQuestionData} />
        </div>
      )}
    </>
  )

  return (
    <>
      {showPopup && (
        <IngredientsPopup
          data={popupDate}
          index={tabIndex}
          togglePopup={val => popupFn(val)}
          closeText={strapiHelperText?.CloseButton}
        />
      )}

      <section
        style={{
          backgroundImage: `url(${bgDesktop})`,
        }}
        className={`${Style.wrapper} ${Style.desktop} main-container`}
      >
        {content}
      </section>
      <section
        style={{
          backgroundImage: `url(${bgMobile})`,
        }}
        className={`${Style.wrapper}  ${Style.mobile} main-container`}
      >
        {content}
      </section>
    </>
  )
}

export default LandingProduct
