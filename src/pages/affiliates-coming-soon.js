import React, { useState } from "react"
import { graphql } from "gatsby"
import { getImage } from "gatsby-plugin-image"
import { GatsbyImage } from "gatsby-plugin-image"
import Markdown from "react-markdown"
import * as Style from "./coming-soon-second.module.scss"
import { Link } from "gatsby"
import Newsletter from "../components/newsletter/Newsletter"
import Popup from "../components/popup/Popup"
import { LogoLarge } from "../assets/components/icons/Icons"
import { LogoSmall } from "../assets/components/icons/Icons"
import { FacebookCircle } from "../assets/components/icons/Icons"
import { InstagramCircle } from "../assets/components/icons/Icons"
import Seo from "../components/seo/Seo"
import useGlobalLang from "../custom-hooks/useGlobalLang"

export const query = graphql`
  fragment LangComingSoonAffiliate on STRAPI_COMING_SOON_AFFILIATE {
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
  fragment LangLayoutAff on STRAPI_LAYOUT {
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
  fragment LangHelperText on STRAPI_HELPER_TEXT {
    NamePlaceholder
    SignUpButton
    EmailPlaceholder
  }
  query {
    en: strapiComingSoonAffiliate(locale: { eq: "en" }) {
      ...LangComingSoonAffiliate
    }
    sv: strapiComingSoonAffiliate(locale: { eq: "sv-SE" }) {
      ...LangComingSoonAffiliate
    }
    en1: strapiLayout(locale: { eq: "en" }) {
      ...LangLayoutAff
    }
    sv1: strapiLayout(locale: { eq: "sv-SE" }) {
      ...LangLayoutAff
    }
    en2: strapiHelperText(locale: { eq: "en" }) {
      ...LangHelperText
    }
    sv2: strapiHelperText(locale: { eq: "sv-SE" }) {
      ...LangHelperText
    }
  }
`

export default function Home({ data }) {
  const { GLOBAL_LANG } = useGlobalLang()
  const isBrowser = typeof window !== "undefined"
  const [showPopup, setShowPopup] = useState(false)
  const togglePopup = () => {
    setShowPopup(!showPopup)
  }

  const iconsArr = data[
     GLOBAL_LANG
  ]?.social_media_links.social_link.map((el, index) => {
    let icon
    if (el.title === "instagram") {
      icon = <InstagramCircle />
    } else if (el.title === "facebook") {
      icon = <FacebookCircle />
    }
    return (
      <a
        onClick={() => {
          if (isBrowser) {
            window.dataLayer = window.dataLayer || []
            window.dataLayer.push({
              event: "social_media_click",
              social_media: el.title,
            })
          }
        }}
        key={index}
        className={Style.icon}
        target="_blank"
        to={`${el.url}`}
        href={`${el.url}`}
      >
        {icon}
      </a>
    )
  })
  const footerArr = data[ GLOBAL_LANG]?.footer_link.map(
    (el, index) => {
      return (
        <Link
          key={index}
          className={Style.icon}
          target="_blank"
          rel="noreferrer"
          to={`${el.url}`}
        >
          {el.text}
        </Link>
      )
    }
  )

  const pageContent = (
    <div className={`main-container ${Style.coming_soon_page}`}>
      <div className={`${Style.logo_wrapper} ${Style.desktop_images}`}>
        <LogoLarge />
      </div>
      <div className={`${Style.logo_wrapper} ${Style.mobile_section}`}>
        <LogoSmall />
      </div>

      <div className={`${Style.image_mobile} ${Style.mobile_section}`}>
        <GatsbyImage
          image={getImage(
            data[ GLOBAL_LANG]?.background_mobile.localFile
              .childImageSharp.gatsbyImageData
          )}
          alt="logo-image"
        />
      </div>

      <div className={`${Style.mobile_text} ${Style.mobile_section}`}>
        <div className={Style.heading}>
          <Markdown
            children={data[ GLOBAL_LANG]?.heading.data.heading}
          />
        </div>
        <div className={Style.description}>
          <Markdown
            children={
              data[ GLOBAL_LANG]?.description.data.description
            }
          />
        </div>
      </div>

      <div className={Style.form_wrapper}>
        <div className={Style.heading}>
          <Markdown
            children={data[ GLOBAL_LANG]?.heading.data.heading}
          />
        </div>
        <div className={Style.description}>
          <Markdown
            children={
              data[ GLOBAL_LANG]?.description.data.description
            }
          />
        </div>
        <Newsletter
          showName={true}
          labels={{
            name: data[ GLOBAL_LANG + "2"]?.NamePlaceholder,
            email: "Email",
            button: data[ GLOBAL_LANG + "2"]?.SignUpButton,
            placeholder_name:
              data[ GLOBAL_LANG + "2"]?.NamePlaceholder,
            placeholder_email:
              data[ GLOBAL_LANG + "2"]?.EmailPlaceholder,
          }}
          style={Style.coming_soon_form}
          errorMessageStyle={Style.newsletter_error_message}
          togglePopup={togglePopup}
          mode={"aff"}
        />
      </div>
      <div className={Style.helper_wrapper}>
        <div className={Style.social_icons_wrapper}>
          <p className={Style.heading}>
            {data[ GLOBAL_LANG]?.social_media_links.heading}
          </p>
          <div>{iconsArr}</div>
        </div>
        <div className={Style.footer_wrapper}>{footerArr}</div>
      </div>
      {showPopup && (
        <Popup
          togglePopup={togglePopup}
          data={data[ GLOBAL_LANG]?.popup_content}
        />
      )}
    </div>
  )
  const content = (
    <>
      <Seo data={data[ GLOBAL_LANG]?.seo} />
      <div
        className={Style.desktop_section}
        style={{
          backgroundImage: `url(${
            data[ GLOBAL_LANG]?.background_desktop.url
          })`,
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
    </>
  )
  return content
}
