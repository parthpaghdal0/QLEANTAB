import React, { useEffect, useState, useContext } from "react"
import * as Style from "./CartInfo.module.scss"
import Input from "../../../UI/input/Input"
import CustomButton from "../../../UI/custom-button/CustomButton"
import CheckoutContext from "../../../../context/CheckoutContext"
import Markdown from "react-markdown"
import { navigate } from "gatsby"
import useTrackCart from "../../../../custom-hooks/track-cart"
import ProductContext from "../../../../context/ProductContext"
import useGlobalLang from "../../../../custom-hooks/useGlobalLang"

const CartInfo = ({ data }) => {
  const { GLOBAL_LANG } = useGlobalLang()
  const isBrowser = typeof window !== "undefined"
  const ctx = useContext(CheckoutContext)
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalSubPrice, setSubTotalPrice] = useState(0)
  const [discount, setDiscount] = useState("")
  const { CheckoutTrackingHandler } = useTrackCart()
  const { strapiHelperText } = useContext(ProductContext)

  const addDiscountCode = () => {
    if (discount) {
      ctx.addDiscount(discount)
      setDiscount("")
    }
  }

  useEffect(() => {
    if (ctx.invalidCupon) {
      setDiscount(strapiHelperText?.InvalidCoupon)
    }
  }, [ctx.invalidCupon])

  const cuponInputFocusHandler = () => {
    if (ctx.invalidCupon) {
      ctx.setInvalidCupon(false)
      setDiscount("")
    }
  }

  useEffect(() => {
    if (isBrowser && ctx.checkout) {
      const lineItemsArray = ctx.checkout.lines.edges
      if (lineItemsArray.length !== 0) {
        setTotalPrice(ctx.checkout.cost.totalAmount.amount)
        setSubTotalPrice(ctx.checkout.cost.subtotalAmount.amount)
      } else {
        setTotalPrice(0)
        setSubTotalPrice(0)
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
    <div className={Style.cartInfoWrapper}>
      <h2>
        <Markdown children={data.summary_heading.data.summary_heading} />
      </h2>
      <div className={Style.subTotalWrapper}>
        <div className={Style.subTotalHeading}>
          <Markdown children={data.subtotal_text.data.subtotal_text} />
        </div>
        <p className={Style.subTotalPrice}>
          {`Kr ${Number(totalSubPrice).toFixed(2)}`}{" "}
        </p>
      </div>
      <div className={Style.couponCodeWrapper}>
        <div className={Style.couponCodeInnerWrapper}>
          <h4>
            <Markdown children={data.cuponcode_text.data.cuponcode_text} />
          </h4>
          <form className={`${Style.cuponForm}`}>
            <Input
              focusHandler={cuponInputFocusHandler}
              inputHandler={e => {
                setDiscount(e.target.value)
              }}
              inputValue={discount}
              placeholder={data.pagecart_input[0].placeholder}
              style={`${Style.cuponInput} ${
                ctx.invalidCupon ? Style.invalidCuponInput : ""
              }`}
            />
            <CustomButton
              buttonHandler={addDiscountCode}
              type="button"
              globalStyles={true}
              style={Style.cuponButton}
            >
              <Markdown children={data.pagecart_btn[0].title} />
            </CustomButton>
          </form>
          {/* <p>
            No worries, <br />
            Coupon code will be applied on the checkout page
          </p> */}
          <Markdown children={data.cupon_info.data.cupon_info} />
        </div>
      </div>
      <div className={Style.proccedToCheckoutWrapper}>
        <div className={Style.totalWrapper}>
          <div className={Style.totalHeading}>
            <Markdown children={data.total_text.data.total_text} />
          </div>
          <p className={Style.totalPrice}>
            {`Kr ${Number(totalPrice).toFixed(2)}`}{" "}
          </p>
        </div>
        <div className={Style.btnWrapper}>
          <CustomButton
            buttonHandler={proceedToCheckoutHanler}
            style={Style.checkoutBtn}
            globalStyles={true}
          >
            <Markdown children={data.pagecart_btn[1].title} />
          </CustomButton>
          <CustomButton
            buttonHandler={() => {
              const url = GLOBAL_LANG === "en" ? `/en/shop` : `/shop`
              navigate(url)
            }}
            style={Style.continueBtn}
          >
            <Markdown children={data.pagecart_btn[2].title} />
          </CustomButton>
        </div>
      </div>
    </div>
  )
}

export default CartInfo
