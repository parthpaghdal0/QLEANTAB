import React from "react"
import { graphql } from "gatsby"
import BannerSection from "../../components/banner-section/BannerSection"
import PlanetApprovedCleaning from "../../components/planet-approved-cleaning/PlanetApprovedCleaning"
import Layout from "../../components/layout/Layout"
import HomepageCollection from "../../components/homepage-collection/HomepageCollection"
import * as Style from "./sustainability.module.scss"
import useGlobalLang from "../../custom-hooks/useGlobalLang"

export const query = graphql`
  fragment LangSustainabilityPage on STRAPI_SUSTAINABILITY_PAGE {
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
    iconsSection {
      heading
      description {
        data {
          description
        }
      }
      planet_media {
        icon {
          localFile {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
            }
          }
        }
        title
      }
    }
    iconsSection2 {
      heading
      description {
        data {
          description
        }
      }
      planet_media {
        icon {
          localFile {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
            }
          }
        }
        title
      }
    }
    sustainabilityImageText {
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
    en: strapiSustainabilityPage(locale: { eq: "en" }) {
      ...LangSustainabilityPage
    }

    sv: strapiSustainabilityPage(locale: { eq: "sv-SE" }) {
      ...LangSustainabilityPage
    }
  }
`

const Sustainability = ({ data }) => {
  const { GLOBAL_LANG } = useGlobalLang()
  return (
    <Layout>
      <BannerSection
        data={data[GLOBAL_LANG]?.banner}
        staticPage={true}
      />
      <PlanetApprovedCleaning
        data={data[GLOBAL_LANG]?.iconsSection}
        withImageInfo={true}
      />
      <div className={Style.helper_class}>
        <HomepageCollection
          data={data[GLOBAL_LANG]?.sustainabilityImageText}
          isSustainabilityPage={true}
        />
      </div>

      <PlanetApprovedCleaning
        data={data[GLOBAL_LANG]?.iconsSection2}
      />
    </Layout>
  )
}

export default Sustainability
