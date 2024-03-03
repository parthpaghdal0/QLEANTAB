import React from "react"
import { graphql } from "gatsby"
import Layout from "../../components/layout/Layout"
import BannerSection from "../../components/banner-section/BannerSection"
import SimpleTextButtonSection from "../../components/simple-text-button-section/SimpleTextButtonSection"
import ContactSection from "../../components/contact-section/ContactSection"
import InstagramSection from "../../components/instagram-section/InstagramSection"
import useGlobalLang from "../../custom-hooks/useGlobalLang"

export const query = graphql`
  fragment LangContactUsPage on STRAPI_CONTACT_US_PAGE {
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
    contact_section {
      heading
      address {
        data {
          address
        }
      }
      social_links {
        title
        title_mobile
      }
    }
    instagram {
      heading {
        data {
          heading
        }
      }
      instagram_post {
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
        post_url
        likes_counter
        comments_counter
        image {
          url
          localFile {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
            }
          }
        }
        in_image_heading {
          data {
            in_image_heading
          }
        }
        in_image_description {
          data {
            in_image_description
          }
        }
        logo_position
        image_text_position
        image_text_alignment
        in_image_text_background_color
        show_logo
        half_screen_image
      }
      instagram_profile_url
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
  }
  fragment LangLayoutContact on STRAPI_LAYOUT {
    footer {
      button {
        title
        url
      }
    }
  }

  query {
    en: strapiContactUsPage(locale: { eq: "en" }) {
      ...LangContactUsPage
    }
    sv: strapiContactUsPage(locale: { eq: "sv-SE" }) {
      ...LangContactUsPage
    }
    en1: strapiLayout(locale: { eq: "en" }) {
      ...LangLayoutContact
    }
    sv1: strapiLayout(locale: { eq: "sv-SE" }) {
      ...LangLayoutContact
    }
  }
`

const ContactUs = ({ data }) => {
  const { GLOBAL_LANG } = useGlobalLang()
  return (
    <Layout>
      <BannerSection data={data[GLOBAL_LANG]?.banner} />
      <SimpleTextButtonSection
        mode="affiliatesAndContact"
        data={data[GLOBAL_LANG]?.simple_text}
        // customClass={true}
      />
      <ContactSection
        data={{
          contact: data[GLOBAL_LANG]?.contact_section,
          layout: data[GLOBAL_LANG + "1"]?.footer,
        }}
      />
      <InstagramSection
        data={data[GLOBAL_LANG]?.instagram}
        customClass={true}
      />
    </Layout>
  )
}

export default ContactUs
