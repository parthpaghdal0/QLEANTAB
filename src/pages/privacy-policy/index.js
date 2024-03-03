import React from "react"
import { graphql } from "gatsby"
import BannerSection from "../../components/banner-section/BannerSection"
import * as Style from "./privacy-policy.module.scss"
import TextComponent from "../../components/text-component/TextComponent"
import CleanLayout from "../../components/layout/CleanLayout"
import Layout from "../../components/layout/Layout"
import useGlobalLang from "../../custom-hooks/useGlobalLang"

export const query = graphql`
  fragment LangPrivacyPolicy on STRAPI_PRIVACY_POLICY {
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
      columns_in_description
      description_column1 {
        data {
          description_column1
        }
      }
      description_column2 {
        data {
          description_column2
        }
      }
      lists_description {
        data {
          lists_description
        }
      }
    }
  }
  query {
    en: strapiPrivacyPolicy(locale: { eq: "en" }) {
      ...LangPrivacyPolicy
    }

    sv: strapiPrivacyPolicy(locale: { eq: "sv-SE" }) {
      ...LangPrivacyPolicy
    }
  }
`
const PrivacyPolicy = ({ data }) => {
  const { GLOBAL_LANG } = useGlobalLang()
  const blocks = data[GLOBAL_LANG]?.text_component.map((el, index) => {
    return <TextComponent key={index} data={el} styles={Style.text_component} />
  })
  return (
    <Layout>
      <CleanLayout>
        <div className={`${Style.pp_page}`}>
          <BannerSection
            data={data[GLOBAL_LANG]?.banner}
            textPageStyles={Style.pp_page_banner}
          />
          <div className={`${Style.content_wrapper} main-container`}>
            {blocks}
          </div>
        </div>
      </CleanLayout>
    </Layout>
  )
}

export default PrivacyPolicy
