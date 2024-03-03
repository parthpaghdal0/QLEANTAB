import React, { useContext } from "react"
import { graphql } from "gatsby"
import BannerSection from "../../components/banner-section/BannerSection"
import HowItWorksSection from "../../components/how-it-works-section/HowItWorksSection"
import FaqSection from "../../components/faq-section/FaqSection"
import ProductContext from "../../context/ProductContext"
import HomepageCollection from "../../components/homepage-collection/HomepageCollection"
import BestsellingProducts from "../../components/bestselling-products/BestsellingProducts"
import Layout from "../../components/layout/Layout"
import Seo from "../../components/seo/Seo"
import useGlobalLang from "../../custom-hooks/useGlobalLang"

export const query = graphql`
  fragment LangHowItWorksPage on STRAPI_HOW_IT_WORKS_PAGE {
    banner {
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
      button {
        title
        title_mobile
        url
      }
      background_image_desktop {
        url
        localFile {
          childImageSharp {
            gatsbyImageData(
              layout: CONSTRAINED
              placeholder: BLURRED
              height: 800
              width: 1920
              quality: 100
            )
          }
        }
      }
      background_image_mobile {
        url
        localFile {
          childImageSharp {
            gatsbyImageData(
              layout: CONSTRAINED
              placeholder: BLURRED
              width: 540
              quality: 100
            )
          }
        }
      }
      product_image_desktop {
        localFile {
          childImageSharp {
            gatsbyImageData(
              layout: CONSTRAINED
              placeholder: BLURRED
              height: 633
              width: 960
              quality: 100
            )
          }
        }
      }
      product_image_mobile {
        localFile {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
          }
        }
      }
    }
    how_it_works {
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

    faq {
      heading {
        data {
          heading
        }
      }
      button {
        title
      }
      questions {
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
    howitworksCollection {
      order
      heading
      id
      buttonClass
      content {
        id
        pargraph {
          data {
            pargraph
          }
        }
      }
      handle
      imageOnLeft
      layoutClass
      background {
        url
        localFile {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
          }
        }
      }
      mobileBackground {
        url
        localFile {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
          }
        }
      }
      button {
        url
        title
        title_mobile
        id
      }
    }
  }

  query {
    en: strapiHowItWorksPage(locale: { eq: "en" }) {
      ...LangHowItWorksPage
    }
    sv: strapiHowItWorksPage(locale: { eq: "sv-SE" }) {
      ...LangHowItWorksPage
    }
  }
`
const HowItWorks = ({ data }) => {
  const { GLOBAL_LANG } = useGlobalLang()
  const { shopifyCollections } = useContext(ProductContext)

  return (
    <Layout>
      <Seo data={data[GLOBAL_LANG]?.seo} />
      <BannerSection
        data={data[GLOBAL_LANG]?.banner}
        // staticPage={true}
      />
      <HowItWorksSection data={data[GLOBAL_LANG]?.how_it_works} />
      <BestsellingProducts
        collections={shopifyCollections.nodes}
        handle="starter-kits"
        customMarginBottom={true}
      />
      <BestsellingProducts
        collections={shopifyCollections.nodes}
        handle="refills-1"
        customMarginTop={true}
        customMarginBottom={true}
      />

      <HomepageCollection
        data={data[GLOBAL_LANG]?.howitworksCollection[0]}
      />
      <FaqSection data={data[GLOBAL_LANG]?.faq} />
    </Layout>
  )
}

export default HowItWorks
