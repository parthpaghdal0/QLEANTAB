import React from "react"
import { graphql } from "gatsby"
import Layout from "../../components/layout/Layout"
import BannerSection from "../../components/banner-section/BannerSection"
import SimpleTextButtonSection from "../../components/simple-text-button-section/SimpleTextButtonSection"
import EmailTextSection from "../../components/email-text-section/EmailTextSection"
import ImageAndText from "../../components/image-and-text/ImageAndText"
import HomepageCollection from "../../components/homepage-collection/HomepageCollection"
import useGlobalLang from "../../custom-hooks/useGlobalLang"

export const query = graphql`
  fragment LangAff on STRAPI_AFFILIATES_PAGE {
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
    simple_text {
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
    }
    email_first {
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
      background_color
      decoration_left
    }
    email_second {
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
      background_color
      decoration_left
    }

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

    collection {
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
    en: strapiAffiliatesPage(locale: { eq: "en" }) {
      ...LangAff
    }
    sv: strapiAffiliatesPage(locale: { eq: "sv-SE" }) {
      ...LangAff
    }
  }
`

const Affiliates = ({ data }) => {
  const { GLOBAL_LANG } = useGlobalLang()
  return (
    <Layout>
      <BannerSection data={data[GLOBAL_LANG]?.banner} />
      <SimpleTextButtonSection
        mode="affiliatesAndContact"
        data={data[GLOBAL_LANG]?.simple_text}
      />
      <EmailTextSection data={data[GLOBAL_LANG]?.email_first} />
      <ImageAndText data={data[GLOBAL_LANG]?.textImage} />
      {data[GLOBAL_LANG]?.collection && (
        <HomepageCollection
          mode="affiliates"
          data={data[GLOBAL_LANG].collection}
        />
      )}
      <EmailTextSection data={data[GLOBAL_LANG].email_second} />
    </Layout>
  )
}

export default Affiliates
