import React from "react"
import { graphql } from "gatsby"
import BannerSection from "../../components/banner-section/BannerSection"
import Layout from "../../components/layout/Layout"
import ImageTextDouble from "../../components/image-text-double-section/ImageTextDouble"
import useGlobalLang from "../../custom-hooks/useGlobalLang"

export const query = graphql`
  fragment LangReducingOurImpactPage on STRAPI_REDUCING_OUR_IMPACT_PAGE {
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
    imageTextDouble {
      columns_reverse
      background_color
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
      image {
        localFile {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
          }
        }
      }
      button {
        title
        url
      }
    }
  }
  query {
    en: strapiReducingOurImpactPage(locale: { eq: "en" }) {
      ...LangReducingOurImpactPage
    }

    sv: strapiReducingOurImpactPage(locale: { eq: "sv-SE" }) {
      ...LangReducingOurImpactPage
    }
  }
`

const ReducingOurImpact = ({ data }) => {
  const { GLOBAL_LANG } = useGlobalLang()

  const imageTextSections = data[GLOBAL_LANG]?.imageTextDouble.map(
    (el, index) => {
      return <ImageTextDouble data={el} key={index} customClass={true} />
    }
  )
  return (
    <Layout>
      <BannerSection data={data[GLOBAL_LANG]?.banner} staticPage={true} />
      {imageTextSections}
    </Layout>
  )
}

export default ReducingOurImpact
