import React from "react"
import { graphql } from "gatsby"
import BannerSection from "../../components/banner-section/BannerSection"
import SimpleTextSection from "../../components/simple-text-section/SimpleTextSection"
import ImageTextDouble from "../../components/image-text-double-section/ImageTextDouble"
import Layout from "../../components/layout/Layout"
import Seo from "../../components/seo/Seo"
import useGlobalLang from "../../custom-hooks/useGlobalLang"

export const query = graphql`
  fragment LangQleanNationPage on STRAPI_QLEAN_NATION_PAGE {
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
    text_section {
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
    image_text_double {
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
      metaImage {
        url
      }
    }
  }
  query {
    en: strapiQleanNationPage(locale: { eq: "en" }) {
      ...LangQleanNationPage
    }

    sv: strapiQleanNationPage(locale: { eq: "sv-SE" }) {
      ...LangQleanNationPage
    }
  }
`
const QleanNation = ({ data }) => {
  const { GLOBAL_LANG } = useGlobalLang()
  const imageTextSections = data[GLOBAL_LANG]?.image_text_double.map(
    (el, index) => {
      return <ImageTextDouble data={el} key={index} customClass={true} />
    }
  )
  return (
    <Layout>
      <Seo data={data[GLOBAL_LANG]?.seo} />
      <BannerSection
        data={data[GLOBAL_LANG]?.banner}
        staticPage={true}
      />
      <SimpleTextSection data={data[GLOBAL_LANG]?.text_section} />
      {imageTextSections}
    </Layout>
  )
}

export default QleanNation
