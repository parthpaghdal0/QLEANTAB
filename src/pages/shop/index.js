import React, { useContext, useEffect, useState } from "react"
import ProductContext from "../../context/ProductContext"
import ProductItem from "../../components/product-item/ProductItem"
import Layout from "../../components/layout/Layout"
import { graphql } from "gatsby"
import * as Style from "./shop.module.scss"
import Seo from "../../components/seo/Seo"
import Markdown from "react-markdown"
import useGlobalLang from "../../custom-hooks/useGlobalLang"

const ITEM_ORDER = [
  "sustainable-starter-set",
  "kitchen-and-bathroom-set",
  "kitchen-cleaner",
  "bathroom-cleaner",
  "glass-cleaner",
  "sustainable-starter-set-refills",
  "kitchen-refills-6-qleantabs",
  "bathroom-refills-6-qleantabs",
  "glass-refills-6-qleantabs",
  "test-product-test-prod",
  "qleantab-bottles",
]

const Shop = ({ data }) => {
  const { GLOBAL_LANG } = useGlobalLang()
  const { shopifyProducts } = useContext(ProductContext)
  const products = shopifyProducts.nodes
  const isBrowser = typeof window !== "undefined"
  const [sortedPoducts, setSortedProducts] = useState([])

  useEffect(() => {
    if (products) {
      const sorted = []

      ITEM_ORDER.forEach(handle => {
        products.forEach(product => {
          if (product.handle === handle) {
            sorted.push(product)
          }
        })
      })
      setSortedProducts(sorted)
    }
  }, [products])

  useEffect(() => {
    if (isBrowser && sortedPoducts.length !== 0) {
      const sortedPoductsEvent = sortedPoducts.map((item, index) => {
        return {
          item_name: item.title,
          item_id: item.shopifyId.split("/").pop(),
          price: item.variants[0].price,
          currency: item.variants[0].presentmentPrices[4].price.currencyCode,
          item_category: item.productType,
          item_list_name: "shop",
          index: Number(index + 1),
          quantity: 1,
        }
      })

      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({ ecommerce: null })
      window.dataLayer.push({
        event: "view_item_list",
        ecommerce: {
          items: sortedPoductsEvent,
        },
      })
    }
  }, [sortedPoducts])

  return (
    <Layout>
      <Seo data={data[GLOBAL_LANG].seo}>
        <script type="application/ld+json">
          {`{
              "@context": "http://schema.org",
              "@type": "WebPage",
              "headline": "Shop pag",
              "url": "https://qleantab.com/shop",
              "description": "Explore our range of natural yet effective cleaning products, available in starter kits and refill packs for minimal waste with no single-use plastic.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://qleantab.com/search?q=shop",
                "query-input": "required name=shop"
              }
            }`}
        </script>
      </Seo>
      <section className={`main-container`}>
        {/* <h1 className={Style.heading}>All products</h1> */}
        <Markdown
          className={Style.heading}
          children={
            data[GLOBAL_LANG].PageHeading?.data?.PageHeading
          }
        />
        <div className={Style.products}>
          {products &&
            sortedPoducts.map((item, index) => (
              <ProductItem key={index} product={item} index={index} />
            ))}
        </div>
      </section>
    </Layout>
  )
}
export default Shop

export const query = graphql`
  fragment LangShop on STRAPI_SHOP {
    PageHeading {
      data {
        PageHeading
      }
    }
    seo {
      title
      metaTitle
      metaKeywords
      metaAuthor
      description
      metaDescription
      ogTitle
      ogType
      ogDescription
      canonicalTag
      altImageText
    }
  }
  fragment LangHelperButton on STRAPI_HELPER_TEXT {
    AddToCart
  }
  query {
    en: strapiShop(locale: { eq: "en" }) {
      ...LangShop
    }

    sv: strapiShop(locale: { eq: "sv-SE" }) {
      ...LangShop
    }
    en1: strapiHelperText(locale: { eq: "en" }) {
      ...LangHelperButton
    }

    sv1: strapiHelperText(locale: { eq: "sv-SE" }) {
      ...LangHelperButton
    }
  }
`
