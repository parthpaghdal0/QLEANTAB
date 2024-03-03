import React from "react"
import { graphql } from "gatsby"
import BannerSection from "../../components/banner-section/BannerSection"
import * as Style from "./legal-notice.module.scss"
import TextComponent from "../../components/text-component/TextComponent"
import CleanLayout from "../../components/layout/CleanLayout"
import Layout from "../../components/layout/Layout"
import useGlobalLang from "../../custom-hooks/useGlobalLang"

export const query = graphql`
  fragment LangLegalNotice on STRAPI_LEGAL_NOTICE {
    bannerLegal {
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
            gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
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
    legalText {
      description {
        data {
          description
        }
      }
    }
  }
  query {
    en: strapiLegalNotice(locale: { eq: "en" }) {
      ...LangLegalNotice
    }

    sv: strapiLegalNotice(locale: { eq: "sv-SE" }) {
      ...LangLegalNotice
    }
  }
`

const LegalNotice = ({ data }) => {
  const { GLOBAL_LANG } = useGlobalLang()
  const blocks = data[GLOBAL_LANG]?.legalText.map((el, index) => {
    return <TextComponent key={index} data={el} styles={Style.text_component} />
  })
  return (
    <Layout>
      <CleanLayout>
        <div className={`${Style.pp_page}`}>
          <BannerSection
            data={data[GLOBAL_LANG]?.bannerLegal}
            textPageStyles={Style.pp_page_banner}
          />
          <div className={`${Style.content_wrapper} main-container`}>
            {blocks}
          </div>
        </div>
      </CleanLayout>
    </Layout>
  )

  return null
}

export default LegalNotice
