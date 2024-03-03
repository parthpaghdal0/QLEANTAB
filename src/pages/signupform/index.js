import React, { useState } from "react"
import { graphql } from "gatsby"
import { getImage } from "gatsby-plugin-image"
import { GatsbyImage } from "gatsby-plugin-image"
import Markdown from "react-markdown"
import * as Style from "../coming-soon-second.module.scss"
import Newsletter from "../../components/newsletter/Newsletter"
import Popup from "../../components/popup/Popup"
import Seo from "../../components/seo/Seo"
import Layout from "../../components/layout/Layout"
import useGlobalLang from "../../custom-hooks/useGlobalLang"

export const query = graphql`
  fragment LangComingSoonPage on STRAPI_COMING_SOON_PAGE {
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
    background_desktop {
      url
      localFile {
        childImageSharp {
          gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
        }
      }
    }
    background_mobile {
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
    social_media_links {
      heading
      social_link {
        title
        url
        icon {
          localFile {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
            }
          }
        }
      }
    }
    footer_link {
      text
      url
    }
    popup_content {
      heading {
        data {
          heading
        }
      }
      button {
        title
        url
      }
      subheading {
        data {
          subheading
        }
      }
      popup_image {
        localFile {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
          }
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
    }
  }
  fragment LangLayoutOrigin on STRAPI_LAYOUT {
    header {
      main_logo {
        localFile {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
          }
        }
      }
      main_logo_mobile {
        localFile {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
          }
        }
      }
    }
  }

  query {
    en: strapiComingSoonPage(locale: { eq: "en" }) {
      ...LangComingSoonPage
    }
    sv: strapiComingSoonPage(locale: { eq: "sv-SE" }) {
      ...LangComingSoonPage
    }
    en1: strapiLayout(locale: { eq: "en" }) {
      ...LangLayoutOrigin
    }
    sv1: strapiLayout(locale: { eq: "sv-SE" }) {
      ...LangLayoutOrigin
    }
  }
`

export default function Home({ data }) {
  const { GLOBAL_LANG } = useGlobalLang()
  const [showPopup, setShowPopup] = useState(false)
  const togglePopup = () => {
    setShowPopup(!showPopup)
  }

  const pageContent = (
    <div
      className={`main-container ${Style.coming_soon_page}`}
      style={{ justifyContent: "center" }}
    >
      <div className={`${Style.image_mobile} ${Style.mobile_section}`}>
        <GatsbyImage
          image={getImage(
            data[GLOBAL_LANG]?.background_mobile.localFile
              .childImageSharp.gatsbyImageData
          )}
          alt="logo-image"
        />
      </div>

      <div className={`${Style.mobile_text} ${Style.mobile_section}`}>
        <div className={Style.heading}>
          <Markdown
            children={data[GLOBAL_LANG]?.heading.data.heading}
          />
        </div>
        <div className={Style.description}>
          <Markdown
            children={data[GLOBAL_LANG]?.description.data.description}
          />
        </div>
      </div>

      <div className={Style.form_wrapper}>
        <div className={Style.heading}>
          <Markdown
            children={data[GLOBAL_LANG]?.heading.data.heading}
          />
        </div>
        <div className={Style.description}>
          <Markdown
            children={data[GLOBAL_LANG]?.description.data.description}
          />
        </div>
        <Newsletter
          showName={true}
          labels={{
            name: "Your name",
            email: "Email",
            button: "Sign up",
            placeholder_name: "Your name",
            placeholder_email: "Enter email",
          }}
          style={Style.coming_soon_form}
          errorMessageStyle={Style.newsletter_error_message}
          togglePopup={togglePopup}
        />
      </div>
      <div className={Style.helper_wrapper}></div>
      {showPopup && (
        <Popup
          togglePopup={togglePopup}
          data={data.strapiComingSoonPage.popup_content}
        />
      )}
    </div>
  )
  const content = (
    <Layout>
      <Seo data={data[GLOBAL_LANG]?.seo} />
      <div
        className={Style.desktop_section}
        style={{
          backgroundImage: `url(${data[GLOBAL_LANG]?.background_desktop.url})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        {pageContent}
      </div>

      <div
        className={`${Style.coming_soon_page_mobile} ${Style.mobile_section}`}
      >
        {pageContent}
      </div>
    </Layout>
  )
  return content
}
