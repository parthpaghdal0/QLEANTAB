import React from "react"
import { graphql } from "gatsby"
import BannerSection from "../../components/banner-section/BannerSection"
import HowItWorksSection from "../../components/how-it-works-section/HowItWorksSection"
import FaqSection from "../../components/faq-section/FaqSection"
import PlanetApprovedCleaning from "../../components/planet-approved-cleaning/PlanetApprovedCleaning"
import BottleSection from "../../components/bottle-section/BottleSection"
import TextIconsSection from "../../components/text-icons-section/TextIconsSection"
import ImageTextDouble from "../../components/image-text-double-section/ImageTextDouble"
import Layout from "../../components/layout/Layout"
import InsideTheTabletsSection from "../../components/double-section/inside-the-tablests/InsideTheTabletsSection"
import Seo from "../../components/seo/Seo"
import useGlobalLang from "../../custom-hooks/useGlobalLang"

export const query = graphql`
  fragment LangLearnPage on STRAPI_LEARN_PAGE {
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
    benefits {
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
    bottle_section {
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
      image_desktop {
        url
        localFile {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
          }
        }
      }
      image_mobile {
        localFile {
          url
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
          }
        }
      }
      bottle_text {
        text {
          data {
            text
          }
        }
      }
    }
    text_icons_section {
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
      heading2 {
        data {
          heading2
        }
      }
      description2 {
        data {
          description2
        }
      }
      icon {
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
        icon_image {
          localFile {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
            }
          }
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
    }
    insidetab_section {
      heading {
        data {
          heading
        }
      }
      pargraph_one {
        data {
          pargraph_one
        }
      }
      pargraph_two {
        data {
          pargraph_two
        }
      }
      pargraph_three {
        data {
          pargraph_three
        }
      }
      inside_icon {
        heading {
          data {
            heading
          }
        }
        icon_image {
          localFile {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
            }
          }
        }
      }
      insidetab_bg {
        localFile {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
          }
          url
        }
      }
      single_icon {
        localFile {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
          }
          url
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
      metaImage {
        url
      }
    }
  }
  query {
    en: strapiLearnPage(locale: { eq: "en" }) {
      ...LangLearnPage
    }

    sv: strapiLearnPage(locale: { eq: "sv-SE" }) {
      ...LangLearnPage
    }
  }
`
const Learn = ({ data }) => {
  const { GLOBAL_LANG } = useGlobalLang()
  const imageTextSections = data[
    GLOBAL_LANG
  ]?.image_text_double.map((el, index) => {
    return <ImageTextDouble data={el} key={index} />
  })
  const insidetabSection = data[GLOBAL_LANG]?.insidetab_section
  return (
    <Layout>
      <Seo data={data[GLOBAL_LANG]?.seo} />
      <BannerSection
        data={data[GLOBAL_LANG]?.banner}
        /*staticPage={true}*/ bannerDiscover={true}
      />
      <TextIconsSection
        data={data[GLOBAL_LANG]?.text_icons_section}
      />
      <HowItWorksSection data={data[GLOBAL_LANG]?.how_it_works} />
      <InsideTheTabletsSection data={insidetabSection} />
      <BottleSection data={data[GLOBAL_LANG]?.bottle_section} />
      <PlanetApprovedCleaning data={data[GLOBAL_LANG]?.benefits} />
      {imageTextSections}
      <FaqSection data={data[GLOBAL_LANG]?.faq} />
    </Layout>
  )
}

export default Learn
