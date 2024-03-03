import React from "react"
import Layout from "../../components/layout/Layout"
import Cart from "../../components/cart/page-cart/cart/Cart"
import CartInfo from "../../components/cart/page-cart/cart-info/CartInfo"
import * as Style from "./index.module.scss"
import { useStaticQuery, graphql } from "gatsby"
import useGlobalLang from "../../custom-hooks/useGlobalLang"

const query = graphql`
  fragment LangPageCart on STRAPI_PAGE_CART {
    cupon_info {
      data {
        cupon_info
      }
    }
    cuponcode_text {
      data {
        cuponcode_text
      }
    }
    pagecart_btn {
      title
    }
    subtotal_text {
      data {
        subtotal_text
      }
    }
    summary_heading {
      data {
        summary_heading
      }
    }
    total_text {
      data {
        total_text
      }
    }
    pagecart_input {
      placeholder
    }
  }

  query {
    en: strapiPageCart(locale: { eq: "en" }) {
      ...LangPageCart
    }
    sv: strapiPageCart(locale: { eq: "sv-SE" }) {
      ...LangPageCart
    }
  }
`

const PageCart = () => {
  const pageCartData = useStaticQuery(query)
  const { GLOBAL_LANG } = useGlobalLang()

  return (
    <Layout mode="cart">
      <section className={`${Style.pageCartWrapper}`}>
        <Cart />
        <CartInfo data={pageCartData[GLOBAL_LANG]} />
      </section>
    </Layout>
  )
}

export default PageCart
