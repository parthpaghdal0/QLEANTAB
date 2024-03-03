import React from "react"
import * as Style from "./Layout.module.scss"
import Header from "./header/Header"
import Footer from "./footer/Footer"
import { useStaticQuery, graphql } from "gatsby"
import MainCart from "../cart/main-cart/MainCrat"
import SideCart from "../cart/side-cart/SideCart"
import Helmet from "react-helmet"
import white from "../../../static/white.ico"
import black from "../../../static/black.ico"
import CookiePopUp from "../UI/cookie-popup/CookiePopUp"
import useGlobalLang from "../../custom-hooks/useGlobalLang"

const query = graphql`
  fragment LangLayout on STRAPI_LAYOUT {
    header {
      button {
        title
        url
        icon {
          localFile {
            childImageSharp {
              gatsbyImageData(layout: FIXED, placeholder: BLURRED)
            }
            url
          }
        }
      }

      main_logo {
        localFile {
          childImageSharp {
            gatsbyImageData(layout: FIXED, placeholder: BLURRED)
          }
          url
        }
      }

      main_logo_mobile {
        localFile {
          childImageSharp {
            gatsbyImageData(layout: FIXED, placeholder: BLURRED)
          }
          url
        }
      }

      info_box {
        text {
          data {
            text
          }
        }

        icon {
          localFile {
            childImageSharp {
              gatsbyImageData(layout: FIXED, placeholder: BLURRED)
            }
          }
        }
      }

      links {
        id
        text
        url
      }

      currency {
        name
        code
        symbol
      }

      contact_phone {
        data {
          contact_phone
        }
      }
    }

    footer {
      button {
        id
        url
        title
        title_mobile
        icon {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
      footer_main_heading
      footer_sub_heading {
        data {
          footer_sub_heading
        }
      }

      footer_main_logo {
        title
        main_logo {
          localFile {
            childImageSharp {
              gatsbyImageData(layout: FIXED, placeholder: BLURRED)
            }
          }
        }
      }

      footer_info {
        id
        info {
          data {
            info
          }
        }
        icon {
          localFile {
            childImageSharp {
              gatsbyImageData(layout: FIXED, placeholder: BLURRED)
            }
          }
        }
      }

      input {
        placeholder
        type
      }

      single_icon {
        heading {
          data {
            heading
          }
        }
        icon_image {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        description {
          data {
            description
          }
        }
      }
    }

    footer_links {
      id
      links {
        id
        text
        url
      }
      title
    }

    layoutCookie {
      text {
        data {
          text
        }
      }
      cookieButton {
        title
      }
    }
  }

  query {
    en: strapiLayout(locale: { eq: "en" }) {
      ...LangLayout
    }
    sv: strapiLayout(locale: { eq: "sv-SE" }) {
      ...LangLayout
    }
  }
`

const Layout = ({ mode, children, hideFooter = false }) => {
  const { GLOBAL_LANG } = useGlobalLang()
  //Header
  const isBrowser = typeof window !== "undefined"
  const layoutData = useStaticQuery(query)
  const headerButtons = layoutData[GLOBAL_LANG].header.button
  const headerLinks = layoutData[GLOBAL_LANG].header.links
  const headerInfoBox = layoutData[GLOBAL_LANG].header.info_box
  const headerMainLogo = layoutData[GLOBAL_LANG].header.main_logo
  const headerMainLogoMobile =
    layoutData[GLOBAL_LANG].header.main_logo_mobile
  const headerCurrency = layoutData[GLOBAL_LANG].header.currency
  const contactPhone = layoutData[GLOBAL_LANG].header.contact_phone
  //Footer
  const footerData = layoutData[GLOBAL_LANG].footer
  const footerLinks = layoutData[GLOBAL_LANG].footer_links
  let icon =
    isBrowser &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? white
      : black
  const cookieData = layoutData[GLOBAL_LANG].layoutCookie

  return (
    <>
      <Helmet>
        <link rel="icon" href={icon} />
        <link rel="apple-touch-icon" href={icon} />
      </Helmet>
      <div className={Style.test}>
        <MainCart />
        <SideCart />
        <Header
          mode={mode}
          currencyList={headerCurrency}
          buttons={headerButtons}
          links={headerLinks}
          infoBox={headerInfoBox}
          contactPhone={contactPhone}
          mainLogo={headerMainLogo}
          mainLogoMobile={headerMainLogoMobile}
        />
        <CookiePopUp data={cookieData} />
      </div>

      {children}
      {!hideFooter && (
        <Footer mode={mode} footerData={footerData} footerLinks={footerLinks} />
      )}
    </>
  )
}

export default Layout
