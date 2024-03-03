import React from "react"
import { graphql } from "gatsby"
import BannerSection from "../../components/banner-section/BannerSection"
import * as Style from "./terms-of-service.module.scss"
import TextComponent from "../../components/text-component/TextComponent"
import CleanLayout from "../../components/layout/CleanLayout"
import Layout from "../../components/layout/Layout"
import useGlobalLang from "../../custom-hooks/useGlobalLang"

export const query = graphql`
  fragment LangTermsOfService on STRAPI_TERMS_OF_SERVICE {
    banner {
      heading {
        data {
          heading
        }
      }
      background_image_desktop {
        url
        localFile {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
          }
        }
      }
      background_image_mobile {
        url
        localFile {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
          }
        }
      }
    }
    text_component {
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
  query {
    en: strapiTermsOfService(locale: { eq: "en" }) {
      ...LangTermsOfService
    }

    sv: strapiTermsOfService(locale: { eq: "sv-SE" }) {
      ...LangTermsOfService
    }
  }
`

const TermsOfService = ({ data }) => {
  const { GLOBAL_LANG } = useGlobalLang()
  const blocks = data[GLOBAL_LANG]?.text_component.map(
    (el, index) => {
      return (
        <TextComponent key={index} data={el} styles={Style.text_component} />
      )
    }
  )
  return (
    <Layout>
      <CleanLayout>
        <div className={`${Style.tos_page}`}>
          <BannerSection
            data={data[GLOBAL_LANG]?.banner}
            textPageStyles={Style.tos_page_banner}
          />
          <div className={`${Style.content_wrapper} main-container`}>
            {blocks}
          </div>
        </div>
      </CleanLayout>
    </Layout>
  )
}

export default TermsOfService
