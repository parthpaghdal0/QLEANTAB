import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import Markdown from "react-markdown"
import * as Style from "./Footer.module.scss"
import FooterNewsLetter from "../../footer-newsletter/FooterNewsLetter"
import CustomLink from "../../UI/link/CustomLink"
import CustomButton from "../../UI/custom-button/CustomButton"
import FooterMobileLinks from "./footer-mobile-links/FooterMobileLinks"
import ProductPaymentIcons from "../../product-template/product-payment-icons/ProductPaymentIcons"
import {
  FooterDesktopLogo,
  FooterMobileLogo,
} from "../../../assets/components/icons/Icons"
import {
  FacebookCircle2,
  InstagramCircle2,
  TikTokCircle,
  LinkedInCircle,
} from "../../../assets/components/icons/Icons"
const Footer = ({ mode, footerData, footerLinks }) => {
  const isBrowser = typeof window !== "undefined"
  const socialMediaBtns = footerData.button.filter(item => {
    return item.icon !== null
  })

  const getAttribute = id => {
    switch (id) {
      case 0:
        return `tel:(+46) 0123 456 7890`
      case 1:
        return `mailto:hello@qleantab.com`
      case 2:
        return `mailto:sales@qleantab.com`
    }
  }

  const content = (
    <section
      className={`${Style.footerContainer} ${
        mode === "cart" ? Style.altPadding : "main-container"
      }`}
    >
      <h2 className={Style.footerHeading}>{footerData.footer_main_heading}</h2>
      <div className={Style.footerSubHeading}>
        <Markdown
          children={footerData.footer_sub_heading.data.footer_sub_heading}
        />
      </div>
      <FooterNewsLetter input={footerData.input} btn={footerData.button[0]} />
      {/* DESKTOP */}
      <div className={Style.footerNavWrraperDesktop}>
        {footerLinks.map(item => {
          return (
            <ul key={item.id} className={Style.csNavList}>
              <h4 className={Style.linkHeadings}>{item.title}</h4>
              {item.links.map(link => {
                return (
                  <CustomLink name={link.text} url={link.url} key={link.id} />
                )
              })}
            </ul>
          )
        })}
        <div className={Style.footerInfoWrapper}>
          <div>
            <FooterDesktopLogo />
          </div>
          {footerData.footer_info.map((item, index) => {
            return (
              <div key={item.id} className={Style.infoItem}>
                <div>
                  <GatsbyImage
                    image={item.icon.localFile.childImageSharp.gatsbyImageData}
                    alt="info_icon"
                  />
                </div>

                <div>
                  <a
                    onClick={() => {
                      if (isBrowser) {
                        window.dataLayer = window.dataLayer || []
                        window.dataLayer.push({
                          event: "email_click",
                        })
                      }
                    }}
                    href={getAttribute(index)}
                  >
                    {<Markdown children={item.info.data.info} />}
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      {/* MOBILE */}
      <div className={Style.footerNavWrraperMobile}>
        <div className={Style.footerInfoWrapperMobile}>
          <div>
            <FooterMobileLogo />
          </div>
          {footerData.footer_info.map((item, index) => {
            return (
              <div key={item.id} className={Style.infoItemMobile}>
                <div>
                  <GatsbyImage
                    image={item.icon.localFile.childImageSharp.gatsbyImageData}
                    alt="info_icon"
                  />
                </div>
                <a
                  onClick={() => {
                    if (isBrowser) {
                      window.dataLayer = window.dataLayer || []
                      window.dataLayer.push({
                        event: "email_click",
                      })
                    }
                  }}
                  href={getAttribute(index)}
                >
                  <div className={`${index === 0 ? Style.infoTextAlt : ""}`}>
                    {<Markdown children={item.info.data.info} />}
                  </div>
                </a>
              </div>
            )
          })}
        </div>
        <div className={Style.footerLinksMobileWrapper}>
          {footerLinks.map(item => {
            return (
              <FooterMobileLinks
                key={item.id}
                footerLinks={item.links}
                title={item.title}
              />
            )
          })}
        </div>
      </div>

      <div className={Style.footerLogosWrapper}>
        <div className={Style.productPaymentIcons}>
          <ProductPaymentIcons mode="footer" />
        </div>
        <div className={Style.socilaMediaBtnWrapper}>
          {socialMediaBtns.map(item => {
            let icon
            switch (item.title) {
              case "Instagram":
                icon = <InstagramCircle2 />
                break
              case "Linkedin":
                icon = <LinkedInCircle />
                break
              case "Facebook":
                icon = <FacebookCircle2 />
                break
              case "Tiktok":
                icon = <TikTokCircle />
                break

              default:
                break
            }
            return (
              <CustomButton
                buttonHandler={() => {
                  if (isBrowser) {
                    window.dataLayer = window.dataLayer || []
                    window.dataLayer.push({
                      event: "social_media_click",
                      social_media: item.title,
                    })
                  }
                }}
                style={Style.socilaMediaBtn}
                key={item.id}
              >
                <a href={item?.url ? item.url : "/"}>{icon}</a>
              </CustomButton>
            )
          })}
        </div>
      </div>
    </section>
  )

  return content
}

export default Footer
