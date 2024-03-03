import React from "react"
import { graphql } from "gatsby"
import BannerSection from "../../components/banner-section/BannerSection"
import Markdown from "react-markdown"
import * as Style from "./payment-policy.module.scss"
import Layout from "../../components/layout/Layout"
import useGlobalLang from "../../custom-hooks/useGlobalLang"

export const query = graphql`
  fragment LangPaymentPrivacy on STRAPI_PAYMENT_POLICY {
    heading {
      data {
        heading
      }
    }
    content {
      data {
        content
      }
    }
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
  }

  query {
    en: strapiPaymentPolicy(locale: { eq: "en" }) {
      ...LangPaymentPrivacy
    }
    sv: strapiPaymentPolicy(locale: { eq: "sv-SE" }) {
      ...LangPaymentPrivacy
    }
  }
`
const PaymentPolicy = ({ data }) => {
  const { GLOBAL_LANG } = useGlobalLang()
  return (
    <Layout>
      <BannerSection
        data={data[GLOBAL_LANG]?.banner}
        staticPage={true}
        setTitleWidth={true}
        setDescWidth={true}
      />
      <div className={`main-container ${Style.content_wrapper}`}>
        <Markdown
          children={data[GLOBAL_LANG]?.content?.data.content}
        />
      </div>
    </Layout>
  )
}

export default PaymentPolicy
