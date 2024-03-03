import React, { useState, useEffect } from "react"
import { graphql, useStaticQuery } from "gatsby"
import useGlobalLang from "../custom-hooks/useGlobalLang"

const isBrowser = typeof window !== "undefined"

const query = graphql`
  fragment LangHelperContext on STRAPI_HELPER_TEXT {
    AddToCart
    AndGet
    AvailabilityText
    BillingCycle
    BreadcrumbHome
    BuyNow
    BuyProducts
    ChooseOption
    CloseButton
    Discount
    EmailPlaceholder
    EmptyCart
    FindButton
    FooterPlaceholder
    FreeShipping
    FrequentlyBought
    InvalidCoupon
    MyCart
    NamePlaceholder
    NewItem
    OneOffPurchase
    Price
    PurchaseType
    Quantity
    ReadText
    RegularPayment
    ShippingReturns
    ShippingTime
    SignUpButton
    ThisItem
    Total
    ZoomProductImage
    InStock
    OutOfStock
    More
    Less
    AskUs
    AskUsAnything
    Questions
    GoHome
    PageNotFound
  }

  fragment LangCollTitle on STRAPI_COLLECTION_TITLE {
    collTitle {
      title
      handle
    }
  }

  query {
    allShopifyProduct {
      totalCount
      nodes {
        title
        description
        id
        handle
        productType
        status
        shopifyId
        vendor
        sellingPlanGroupCount
        options {
          name
          position
          shopifyId
          values
        }
        variants {
          barcode
          id
          price
          compareAtPrice
          sku
          shopifyId
          title
          weight
          taxCode
          presentmentPrices {
            price {
              amount
              currencyCode
            }
          }
        }
        featuredImage {
          gatsbyImageData(layout: CONSTRAINED, placeholder: DOMINANT_COLOR)
          altText
        }
        media {
          preview {
            image {
              gatsbyImageData(layout: CONSTRAINED)
              altText
            }
          }
        }
      }
    }

    allShopifyCollection {
      nodes {
        products {
          shopifyId
          productType
          featuredImage {
            gatsbyImageData
          }
          sellingPlanGroupCount
          variants {
            title
            shopifyId
            compareAtPrice
            displayName
            price
            image {
              gatsbyImageData
            }
            presentmentPrices {
              price {
                amount
                currencyCode
              }
            }
          }
        }
        id
        title
        handle
        shopifyId
        description
        productsCount
        seo {
          description
          title
        }
        sortOrder
        products {
          id
          title
          handle
        }
        image {
          altText
          gatsbyImageData(layout: FULL_WIDTH, placeholder: DOMINANT_COLOR)
        }
      }
    }

    en: allStrapiProduct(filter: { locale: { eq: "en" } }) {
      totalCount
      nodes {
        locale
        shopifyID
        strapi_id
        title
        tab1 {
          heading
          section {
            heading {
              data {
                heading
              }
            }
            description {
              data {
                description
              }
            }
            image_desktop {
              localFile {
                childImageSharp {
                  gatsbyImageData
                }
                url
              }
            }
            image_mobile {
              localFile {
                childImageSharp {
                  gatsbyImageData
                }
                url
              }
            }
            background_color
            background_image {
              localFile {
                childImageSharp {
                  gatsbyImageData
                }
                url
              }
            }
            icon_image1 {
              localFile {
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
            icon_image2 {
              localFile {
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
            icon_text1 {
              data {
                icon_text1
              }
            }
            icon_text2 {
              data {
                icon_text2
              }
            }
            columns_reverse
          }
        }
        tab2 {
          heading
          table_row {
            heading {
              data {
                heading
              }
            }
            description {
              data {
                description
              }
            }
            table_header
          }
        }
        tab3 {
          heading
        }
      }
    }

    sv: allStrapiProduct(filter: { locale: { eq: "sv-SE" } }) {
      totalCount
      nodes {
        locale
        shopifyID
        strapi_id
        title
        tab1 {
          heading
          section {
            heading {
              data {
                heading
              }
            }
            description {
              data {
                description
              }
            }
            image_desktop {
              localFile {
                childImageSharp {
                  gatsbyImageData
                }
                url
              }
            }
            image_mobile {
              localFile {
                childImageSharp {
                  gatsbyImageData
                }
                url
              }
            }
            background_color
            background_image {
              localFile {
                childImageSharp {
                  gatsbyImageData
                }
                url
              }
            }
            icon_image1 {
              localFile {
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
            icon_image2 {
              localFile {
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
            icon_text1 {
              data {
                icon_text1
              }
            }
            icon_text2 {
              data {
                icon_text2
              }
            }
            columns_reverse
          }
        }
        tab2 {
          heading
          table_row {
            heading {
              data {
                heading
              }
            }
            description {
              data {
                description
              }
            }
            table_header
          }
        }
        tab3 {
          heading
        }
      }
    }

    en1: strapiHelperText(locale: { eq: "en" }) {
      ...LangHelperContext
    }
    sv1: strapiHelperText(locale: { eq: "sv-SE" }) {
      ...LangHelperContext
    }
    en2: strapiCollectionTitle(locale: { eq: "en" }) {
      ...LangCollTitle
    }
    sv2: strapiCollectionTitle(locale: { eq: "sv-SE" }) {
      ...LangCollTitle
    }
  }
`

// const currencyData = [
//   { currency: "SEK", symbol: "kr" },
//   { currency: "DKK", symbol: "Kr" },
//   { currency: "EUR", symbol: "€" },
//   { currency: "GBP", symbol: "£" },
// ]

const defaultState = {
  products: [],
}

const ProductContext = React.createContext(defaultState)
export default ProductContext

export function ProductContextProvider({ children }) {
  const { GLOBAL_LANG } = useGlobalLang()
  const data = useStaticQuery(query)
  // const {
  //   allShopifyProduct,
  //   allShopifyCollection,
  //   allStrapiProduct,
  //   strapiHelperText,
  // } = useStaticQuery(query)
  const [modalImage, setModalImage] = useState(null)
  const [zoomModal, setZoomModal] = useState(false)
  const [currency, setCurrency] = useState(null)
  const [currencySymbol, setCurrencySymbol] = useState(null)

  useEffect(() => {
    if (isBrowser) {
      const currency = localStorage.getItem("qleantCurrency")
      if (currency) {
        const currencyData = JSON.parse(currency)
        setCurrency(currencyData.currency)
        setCurrencySymbol(currencyData.symbol)
      } else {
        setDefaultCurrency()
      }
    }
  }, [])

  const setDefaultCurrency = () => {
    const qleantCurrency = { currency: "SEK", symbol: "kr" }
    const currencyString = JSON.stringify(qleantCurrency)
    localStorage.setItem("qleantCurrency", currencyString)
    setCurrency(qleantCurrency.currency)
    setCurrencySymbol(qleantCurrency.symbol)
  }

  const getProductById = productId => {
    const splitedId = productId.split("/")
    const shopifyId = splitedId[splitedId.length - 1]
    const product = data[GLOBAL_LANG].nodes.find(
      i => i.shopifyID === shopifyId
    )
    return product ? product : null
  }

  return (
    <ProductContext.Provider
      value={{
        shopifyProducts: data.allShopifyProduct,
        allStrapiProduct: data[GLOBAL_LANG],
        collectionTitle: data[GLOBAL_LANG + "2"],
        shopifyCollections: data.allShopifyCollection,
        modalImage: modalImage,
        currency,
        currencySymbol,
        getProductById,
        setModalImage: setModalImage,
        zoomModal: zoomModal,
        setZoomModal: setZoomModal,
        strapiHelperText: data[GLOBAL_LANG + "1"],
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}
