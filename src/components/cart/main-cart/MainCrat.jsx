import React, { useContext, useEffect, useState } from "react"
import * as Style from "./MainCart.module.scss"
import ProductContext from "../../../context/ProductContext"
import CheckoutContext from "../../../context/CheckoutContext"
import { useStaticQuery, graphql } from "gatsby"
import CustomButton from "../../UI/custom-button/CustomButton"
import { GatsbyImage } from "gatsby-plugin-image"
import QuickCartBox from "./components/quick-cart-box/QuickCartBox"
import QuickCartOrder from "./components/order/QuickCartOrder"
import CartModal from "../../UI/cart-modal/CartModal"
import CartControls from "../../cart-controls/CartControls"
import ProductCollectionCart from "./components/products-collection-cart/ProductCollectionCart"
import { navigate } from "gatsby"
import useTrackCart from "../../../custom-hooks/track-cart"
import useGlobalLang from "../../../custom-hooks/useGlobalLang"

const query = graphql`
  fragment LangMainCart on STRAPI_QUICK_CART {
    button {
      id
      title
      url
      icon {
        localFile {
          childImageSharp {
            gatsbyImageData(layout: FIXED, placeholder: BLURRED)
          }
        }
      }
    }
    heading_three
    heading_two
    heading_one
    items_in
    total
    terms {
      data {
        terms
      }
    }
  }

  query {
    en: strapiQuickCart(locale: { eq: "en" }) {
      ...LangMainCart
    }
    sv: strapiQuickCart(locale: { eq: "sv-SE" }) {
      ...LangMainCart
    }
  }
`

const MainCrat = () => {
  const { GLOBAL_LANG } = useGlobalLang()
  const isBrowser = typeof window !== "undefined"
  const ctx = useContext(CheckoutContext)
  const quickCartData = useStaticQuery(query)
  const { CheckoutTrackingHandler } = useTrackCart()
  const ModalHandler = () => {
    ctx.setOpenCart(!ctx.openCart)
  }

  const [totalProductCount, settotalProductCount] = useState(0)
  const [totalPrice, settotaltotalPrice] = useState(0)
  const { shopifyCollections } = useContext(ProductContext)
  let html
  if (isBrowser) {
    html = document.querySelector("html")
  }

  useEffect(() => {
    if (isBrowser) {
      if (ctx.openCart) {
        html.classList.add("html-hide-overflow")
      } else {
        html.classList.remove("html-hide-overflow")
      }
    }
  }, [ctx.openCart])

  useEffect(() => {
    if (isBrowser && ctx.checkout) {
      const lineItemsArray = ctx.checkout.lines.edges
      if (lineItemsArray.length !== 0) {
        settotaltotalPrice(ctx.checkout.cost.totalAmount.amount)
        settotalProductCount(ctx.checkout.totalQuantity)
      } else {
        settotaltotalPrice(0)
        settotalProductCount(0)
      }
    }
  }, [ctx.checkout])

  const proceedToCheckoutHanler = () => {
    const hasItems = ctx?.checkout?.totalQuantity !== 0
    if (isBrowser && ctx?.checkout && hasItems) {
      const url =
        ctx.checkout.checkoutUrl.replace(
          "http://qleantab.com",
          "https://qleantabstore.myshopify.com"
        ) + `?locale=${GLOBAL_LANG}`
      CheckoutTrackingHandler(ctx.checkout)
      window.open(url, "_self")
    }
  }

  return (
    <>
      <CartModal mode={"quick-cart"}>
        <div data-type="modal" className={Style.paddingWrapper}>
          <section
            className={
              ctx.openCart
                ? Style.cartMainContainer
                : Style.cartMainContainerinactive
            }
          >
            <div className={Style.topCartWrapper}>
              <h4>{quickCartData[GLOBAL_LANG].heading_one}</h4>

              <CustomButton style={Style.closeBtn} buttonHandler={ModalHandler}>
                <div className={Style.closeBtnWrapper}>
                  <GatsbyImage
                    image={
                      quickCartData[GLOBAL_LANG].button[4].icon.localFile
                        .childImageSharp.gatsbyImageData
                    }
                    alt="close_btn"
                  />
                  <p>{quickCartData[GLOBAL_LANG].button[4].title}</p>
                </div>
              </CustomButton>
            </div>
            <div className={Style.middleCartWrapper}>
              <QuickCartBox
                totalprice={totalPrice}
                totalProductCount={totalProductCount}
                heading={quickCartData[GLOBAL_LANG].heading_two}
                total={quickCartData[GLOBAL_LANG].total}
                items_in={quickCartData[GLOBAL_LANG].items_in}
              />
              <QuickCartOrder
                heading={quickCartData[GLOBAL_LANG].heading_three}
              >
                <CartControls mode="main-cart" />
              </QuickCartOrder>
            </div>
            <div className={Style.quickCartBtnWrapper}>
              <CustomButton
                buttonHandler={() => {
                  ctx.setOpenCart(!ctx.openCart)
                  const url = GLOBAL_LANG === "en" ? `/en/shop` : `/shop`
                  navigate(url)
                }}
                style={Style.continueShopingBtn}
              >
                {quickCartData[GLOBAL_LANG].button[0].title}
              </CustomButton>
              <CustomButton
                buttonHandler={proceedToCheckoutHanler}
                globalStyles={true}
                style={Style.proceedBtn}
              >
                {quickCartData[GLOBAL_LANG].button[2].title}
              </CustomButton>
            </div>

            <ProductCollectionCart
              openCart={ctx.openCart}
              setOpenCart={ctx.setOpenCart}
              collections={shopifyCollections.nodes}
              handle="you-may-also-like"
            />
          </section>
        </div>
      </CartModal>
    </>
  )
}

export default MainCrat
