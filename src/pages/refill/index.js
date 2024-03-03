import React, { useContext } from "react"
import { graphql } from "gatsby"
import BannerSection from "../../components/banner-section/BannerSection"
import HowItWorksSection from "../../components/how-it-works-section/HowItWorksSection"
import ReviewsSection from "../../components/reviews-section/ReviewsSection"
import FaqSection from "../../components/faq-section/FaqSection"
import Layout from "../../components/layout/Layout"
import BestsellingProducts from "../../components/bestselling-products/BestsellingProducts"
import ProductContext from "../../context/ProductContext"
import useGlobalLang from "../../custom-hooks/useGlobalLang"

export const query = graphql`
  fragment LangRefillPage on STRAPI_REFILL_PAGE {
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
  }
  query {
    en: strapiRefillPage(locale: { eq: "en" }) {
      ...LangRefillPage
    }

    sv: strapiRefillPage(locale: { eq: "sv-SE" }) {
      ...LangRefillPage
    }
  }
`
const RefillPage = ({ data }) => {
  const { GLOBAL_LANG } = useGlobalLang()
  const { shopifyCollections } = useContext(ProductContext)
  return (
    <Layout>
      <BannerSection data={data[GLOBAL_LANG]?.banner} staticPage={true} />
      <BestsellingProducts
        collections={shopifyCollections.nodes}
        handle="refills-1"
      />
      <HowItWorksSection data={data[GLOBAL_LANG]?.how_it_works} />
      <ReviewsSection data={data[GLOBAL_LANG]?.reviews} />
      <FaqSection data={data[GLOBAL_LANG]?.faq} />
    </Layout>
  )
}

export default RefillPage
