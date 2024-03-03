import React, { useState, useEffect, useContext } from "react"
import { graphql } from "gatsby"
import * as Style from "./styles/product-template.module.scss"
import Breadcrumb from "../components/breadcrumb/Breadcrumb"
import ProducPageSlider from "../components/product-page-slider/ProducPageSlider"
import ProductInformation from "../components/product-template/product-information/ProductInformation"
import Layout from "../components/layout/Layout"
import ProductModal from "../components/product-page-slider/product-modal/ProductModal"
import { ProductDropletIcon } from "../assets/components/icons/Icons"
import IngredientsPopup from "../components/product-template/product-ingredients/components/ingredients-popup/IngredientsPopup"
import HowItWorksSection from "../components/how-it-works-section/HowItWorksSection"
import ImageAndText from "../components/image-and-text/ImageAndText"
import ReviewsSection from "../components/reviews-section/ReviewsSection"
import BoughtTogether from "../components/bought-together/BoughtTogether"
import AskAnything from "../components/ask-anything/AskAnything"
import ProductContext from "../context/ProductContext"
import Seo from "../components/seo/Seo"
import YoutpoReviews from "../components/youtpo-reviews/YoutpoReviews"
import useGlobalLang from "../custom-hooks/useGlobalLang"

export const query = graphql`
  fragment LangSingleProduct on STRAPI_SINGLE_PRODUCT {
    textImage {
      background
      heading
      id
      imageOnLeft
      paragraph {
        pargraph {
          data {
            pargraph
          }
        }
      }
      image {
        localFile {
          childrenImageSharp {
            gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
          }
        }
      }
    }
    howItWorks {
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
      how_it_works_step {
        step_image {
          localFile {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
            }
          }
        }
        step_description {
          data {
            step_description
          }
        }
      }
      how_it_works_time {
        time_icon {
          localFile {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
            }
          }
        }
        icon_text {
          data {
            icon_text
          }
        }
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
      }
    }
  }

  query productQuery($shopifyID: String) {
    shopifyProduct(shopifyId: { eq: $shopifyID }) {
      title
      shopifyId
      handle
      description
      descriptionHtml
      status
      productType
      vendor
      id
      variants {
        title
        sku
        shopifyId
        price
        compareAtPrice
        availableForSale
        presentmentPrices {
          price {
            amount
            currencyCode
          }
        }
      }
      options {
        name
        shopifyId
        values
        position
      }
      featuredImage {
        src
        gatsbyImageData(layout: CONSTRAINED)
        altText
      }
      media {
        preview {
          image {
            gatsbyImageData(layout: CONSTRAINED, height: 660, width: 660)
            altText
          }
        }
      }
    }
    en: allStrapiProduct(filter: { locale: { eq: "en" } }) {
      edges {
        node {
          locale
          title
          title_short
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
                    gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
                  }
                  url
                }
              }
              image_mobile {
                localFile {
                  childImageSharp {
                    gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
                  }
                  url
                }
              }
              background_color
              background_image {
                localFile {
                  childImageSharp {
                    gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
                  }
                  url
                }
              }
              icon_image1 {
                localFile {
                  childImageSharp {
                    gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
                  }
                }
              }
              icon_image2 {
                localFile {
                  childImageSharp {
                    gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
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
              variant_id
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
          description
          shopifyID
          bundle_content {
            product {
              title_short
              tab2 {
                heading
                table_row {
                  table_header
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
                }
              }
            }
          }
          reviews {
            heading {
              data {
                heading
              }
            }
            single_review {
              text {
                data {
                  text
                }
              }
              name {
                data {
                  name
                }
              }
              image {
                localFile {
                  childImageSharp {
                    gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
                  }
                }
              }
              color_code
            }
          }
        }
      }
    }
    sv: allStrapiProduct(filter: { locale: { eq: "sv-SE" } }) {
      edges {
        node {
          locale
          title
          title_short
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
                    gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
                  }
                  url
                }
              }
              image_mobile {
                localFile {
                  childImageSharp {
                    gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
                  }
                  url
                }
              }
              background_color
              background_image {
                localFile {
                  childImageSharp {
                    gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
                  }
                  url
                }
              }
              icon_image1 {
                localFile {
                  childImageSharp {
                    gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
                  }
                }
              }
              icon_image2 {
                localFile {
                  childImageSharp {
                    gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
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
              variant_id
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
          description
          shopifyID
          bundle_content {
            product {
              title_short
              tab2 {
                heading
                table_row {
                  table_header
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
                }
              }
            }
          }
          reviews {
            heading {
              data {
                heading
              }
            }
            single_review {
              text {
                data {
                  text
                }
              }
              name {
                data {
                  name
                }
              }
              image {
                localFile {
                  childImageSharp {
                    gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
                  }
                }
              }
              color_code
            }
          }
        }
      }
    }

    en1: strapiSingleProduct(locale: { eq: "en" }) {
      ...LangSingleProduct
    }
    sv1: strapiSingleProduct(locale: { eq: "sv-SE" }) {
      ...LangSingleProduct
    }
  }
`
const ProductTemplate = ({ data }) => {
  const { GLOBAL_LANG } = useGlobalLang()
  const isBrowser = typeof window !== "undefined"
  const [breadcrumb, setBreadcrumb] = useState(null)
  const [showPopup, setShowPopup] = useState(false)
  const [popupDate, setPopupData] = useState(null)
  const [tabIndex, setTabIndex] = useState(null)
  const [seoData, setSeoData] = React.useState(null)
  const [selectedVariant, setSelectedVariant] = useState(null)
  const [popupDataByVariant, setPopupDataByVariant] = useState(null)
  const product = data[GLOBAL_LANG].edges.filter(el =>
    data.shopifyProduct.shopifyId.includes(el.node.shopifyID)
  )

  if (isBrowser) {
    if (data?.shopifyProduct?.handle !== undefined) {
      window.location.replace(
        `https://promo.qleantab.se/collections/starter-sets/products/${data?.shopifyProduct?.handle}`
      )
    }
  }

  let html
  if (isBrowser) {
    html = document.querySelector("html")
  }

  useEffect(() => {
    if (showPopup) {
      html.classList.add("html-hide-overflow")
    } else {
      html.classList.remove("html-hide-overflow")
    }
  }, [showPopup])

  const { currency } = useContext(ProductContext)
  const { strapiHelperText } = useContext(ProductContext)

  useEffect(() => {
    setBreadcrumb([
      {
        title: strapiHelperText?.BreadcrumbHome,
        link: GLOBAL_LANG === "en" ? "/en/shop" : "/shop",
      },
      {
        title: data?.shopifyProduct?.title,
        link: `/products/${data?.shopifyProduct?.handle}`,
      },
    ])

    if (data.shopifyProduct.variants.length > 1) {
      setSelectedVariant(data.shopifyProduct.variants[0].shopifyId)
    }

    if (data) {
      const description = data?.shopifyProduct?.description.substring(0, 150)

      const seo = {
        altImageText:
          data?.shopifyProduct?.featuredImage?.altText ||
          `${data?.shopifyProduct?.handle}-image`,
        canonicalTag: `https://qleantab.com/products/${data?.shopifyProduct?.handle}`,
        description: description,
        metaAuthor: "QLEANTAB",
        metaDescription: description,
        metaKeywords: `QLEANTAB, product, ${data?.shopifyProduct?.title}, qlean`,
        metaTitle: data?.shopifyProduct?.title,
        ogDescription: description,
        ogTitle: data?.shopifyProduct?.title,
        ogType: "product",
        title: data?.shopifyProduct?.title,
      }
      setSeoData(seo)
    }
  }, [strapiHelperText, data])

  useEffect(() => {
    if (data.shopifyProduct.variants.length > 1) {
      let tabContentByVariant = product[0].node.tab1.section.find(
        el => el.variant_id === selectedVariant
      )
      let dataPopupByVariant = {
        heading: product[0].node.tab1.heading,
        section: [tabContentByVariant],
      }
      setPopupDataByVariant(dataPopupByVariant)
    }
  }, [selectedVariant])
  const popupFn = val => {
    setShowPopup(!showPopup)
    setTabIndex(val)
    if (val === 1) {
      if (isBrowser) {
        window.dataLayer = window.dataLayer || []
        window.dataLayer.push({
          event: "what_inside_click",
          product_name: data.shopifyProduct.title,
        })
      }

      if (popupDataByVariant) {
        setPopupData(popupDataByVariant)
      } else {
        setPopupData(product[0].node.tab1)
      }
    } else if (val === 2) {
      if (isBrowser) {
        window.dataLayer = window.dataLayer || []
        window.dataLayer.push({
          event: "ingredients_click",
          product_name: data.shopifyProduct.title,
        })
      }

      if (product[0].node.bundle_content.length > 0) {
        setPopupData(product[0].node.bundle_content)
      } else {
        setPopupData(product[0].node.tab2)
      }
    }
  }
  const getSelectedVariant = val => {
    setSelectedVariant(val)
  }

  return (
    <>
      <ProductModal />
      {/* <div className={Style.dropletBg}>
        <ProductDropletIcon />
      </div> */}
      {showPopup && (
        <IngredientsPopup
          data={popupDate}
          index={tabIndex}
          togglePopup={val => popupFn(val)}
          closeText={strapiHelperText?.CloseButton}
        />
      )}

      <Layout>
        {seoData && (
          <Seo data={seoData}>
            <script type="application/ld+json">
              {`
                {
                  "@context": "https://schema.org/",
                  "@type": "Product",
                  "name": "${data?.shopifyProduct?.title}",
                  "image": "${data?.shopifyProduct?.featuredImage?.src}",
                  "description": "${data?.shopifyProduct?.description.substring(
                    0,
                    150
                  )}",
                  "brand": {
                    "@type": "Brand",
                    "name": "Remilia"
                  },
                  "review": {
                    "@type": "Review",
                    "reviewRating": {
                      "@type": "Rating",
                      "ratingValue": "${Math.round(5)}",
                      "bestRating": "5"
                    },
                    "author": {
                      "@type": "Person",
                      "name": "Fred Benson"
                    }
                  },
                  "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "${5}",
                    "reviewCount": "${
                      product[0].node?.reviews?.single_review.length || 10
                    }"
                  },
                  "offers": {
                    "@type": "Offer",
                    "url": "https://remiliahair.com/products/${
                      data?.shopifyProduct?.handle
                    }",
                    "priceCurrency": "${currency || "SEK"}",
                    "price": "${
                      selectedVariant?.price ||
                      data?.shopifyProduct?.variants[0].price
                    }"
                  }
                }
             `}
            </script>
          </Seo>
        )}
        <section className={`main-container`}>
          {breadcrumb && <Breadcrumb data={breadcrumb} isShare={true} />}
          <div className={Style.product_container}>
            <div className={Style.product_gallery}>
              <ProducPageSlider
                images={data.shopifyProduct.media}
                title={data.shopifyProduct.title}
              />
            </div>
            <div className={Style.product_information}>
              <ProductInformation
                data={data?.shopifyProduct}
                productIngredients={product[0].node}
                popupFn={val => popupFn(val)}
                getSelectedVariant={val => {
                  getSelectedVariant(val)
                }}
                productid={data.shopifyProduct.shopifyId}
              />
            </div>
          </div>
          {data?.shopifyProduct.title !== "TEST PRODUCT - TEST PROD" && (
            <BoughtTogether
              collectionHandle={`${data?.shopifyProduct?.title}-fbt`}
            />
          )}
          <AskAnything mode="mobile" productName={data.shopifyProduct.title} />
        </section>
        <HowItWorksSection data={data[GLOBAL_LANG + "1"]?.howItWorks} />

        <ImageAndText data={data[GLOBAL_LANG + "1"]?.textImage} />

        {/* {product[0].node?.reviews && (
          <ReviewsSection
            data={product[0].node?.reviews}
            isProductReview={true}
          />
        )} */}
        <section className="main-container product-reviews">
          <YoutpoReviews
            image={data.shopifyProduct.media}
            productid={data.shopifyProduct.shopifyId}
            product={data.shopifyProduct}
          />
        </section>
      </Layout>
    </>
  )
}
export default ProductTemplate
