import React, { useContext, useEffect, useState } from "react"
import CheckoutContext from "../../../context/CheckoutContext"
import * as Style from "./SideCart.module.scss"
import { useStaticQuery, graphql } from "gatsby"
import CartModal from "../../UI/cart-modal/CartModal"
import CustomButton from "../../UI/custom-button/CustomButton"
import { GatsbyImage } from "gatsby-plugin-image"
import CartControls from "../../cart-controls/CartControls"
import { navigate } from "gatsby"
import useTrackCart from "../../../custom-hooks/track-cart"
import useGetCheckoutUrl from "../../../custom-hooks/use-getCheckoutUrl"
import useGlobalLang from "../../../custom-hooks/useGlobalLang"

const query = graphql`
  fragment LangSideCart on STRAPI_SIDE_CART {
    button {
      title
      icon {
        localFile {
          childImageSharp {
            gatsbyImageData(layout: FIXED, placeholder: BLURRED)
          }
        }
      }
    }
    incart_text
    items_text
    shipping_text
    total_text
    cur_symbol
    shipping_heading
  }

  query {
    en: strapiSideCart(locale: { eq: "en" }) {
      ...LangSideCart
    }
    sv: strapiSideCart(locale: { eq: "sv-SE" }) {
      ...LangSideCart
    }
  }
`

const SideCart = () => {
  const { GLOBAL_LANG } = useGlobalLang()
  const isBrowser = typeof window !== "undefined"
  const sideCartData = useStaticQuery(query)
  const ctx = useContext(CheckoutContext)
  const { CheckoutTrackingHandler } = useTrackCart()
  const [totalProductCount, settotalProductCount] = useState(0)
  const [totalPrice, settotaltotalPrice] = useState(0)
  const { getCheckoutUrl } = useGetCheckoutUrl()
  let html
  if (isBrowser) {
    html = document.querySelector("html")
  }

  useEffect(() => {
    if (isBrowser) {
      if (ctx.openSideCart) {
        html.classList.add("html-hide-overflow")
      } else {
        html.classList.remove("html-hide-overflow")
      }
    }
  }, [ctx.openSideCart])

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

  const proceedToCheckoutHanler = async () => {
    const hasItems = ctx?.checkout?.totalQuantity !== 0

    if (isBrowser && ctx?.checkout && hasItems) {
      const url =
        ctx.checkout.checkoutUrl.replace(
          "http://qleantab.com",
          "https://qleantabstore.myshopify.com"
        ) + `?locale=${GLOBAL_LANG}`
      // await getCheckoutUrl(ctx.checkout)

      CheckoutTrackingHandler(ctx.checkout)
      // window.open(url, "_self")
      // const test = "https://qleantabstore.myshopify.com"
      // window.open(test, "_self")

      window.location.assign(url)
    }
  }

  const viewCarthandler = () => {
    ctx.setSideOpenCart(!ctx.openSideCart)
    const url = GLOBAL_LANG === "en" ? `/en/cart` : `/cart`
    navigate(url)
  }

  const ModalHandler = () => {
    ctx.setSideOpenCart(!ctx.openSideCart)
  }

  return (
    <CartModal mode={"side-cart"}>
      <section
        className={
          ctx.openSideCart
            ? Style.sideCartMainContainer
            : Style.sideCartMainContainerInactive
        }
      >
        <div>
          <div className={Style.sideCartHeader}>
            <div className={Style.closeBtnOutsideWrapper}>
              <CustomButton style={Style.closeBtn} buttonHandler={ModalHandler}>
                <div className={Style.closeBtnWrapper}>
                  <GatsbyImage
                    image={
                      sideCartData[GLOBAL_LANG].button[2].icon.localFile
                        .childImageSharp.gatsbyImageData
                    }
                    alt="close_btn"
                  />
                  <p>{sideCartData[GLOBAL_LANG].button[2].title}</p>
                </div>
              </CustomButton>
            </div>

            <div className={Style.headerTextWrapper}>
              <p className={Style.inCart}>
                {sideCartData[GLOBAL_LANG].incart_text}
              </p>
              <p className={Style.items}>
                {`${totalProductCount} ${sideCartData[GLOBAL_LANG].items_text}`}
              </p>
            </div>
          </div>
          <div className={Style.controlsWrappr}>
            <CartControls mode="side-cart" />
          </div>
        </div>

        <div className={Style.sideCartFooter}>
          <div className={Style.shippingText}>
            <p>{sideCartData[GLOBAL_LANG].shipping_heading}</p>
            <p>{sideCartData[GLOBAL_LANG].shipping_text}</p>
          </div>
          <div className={Style.totalText}>
            <p>{sideCartData[GLOBAL_LANG].total_text}</p>
            <p>
              {/* {sideCartData.strapiSideCart.cur_symbol}  */}
              {`Kr `}
              {Number(totalPrice).toFixed(2)}
            </p>
          </div>
          <div className={Style.footerBtnWrapper}>
            <CustomButton
              buttonHandler={viewCarthandler}
              style={Style.viewCartBtn}
            >
              {sideCartData[GLOBAL_LANG].button[0].title}
            </CustomButton>
            <CustomButton
              buttonHandler={proceedToCheckoutHanler}
              style={Style.checkoutBtn}
            >
              {sideCartData[GLOBAL_LANG].button[1].title}
            </CustomButton>
          </div>
        </div>
      </section>
    </CartModal>
  )
}

export default SideCart
