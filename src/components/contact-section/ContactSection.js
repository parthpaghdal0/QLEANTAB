import React from "react"
import * as Style from "./contact-section.module.scss"
import Markdown from "react-markdown"
import { FacebookCircle2 } from "../../assets/components/icons/Icons"
import { InstagramCircle2 } from "../../assets/components/icons/Icons"
import { LinkedInCircle } from "../../assets/components/icons/Icons"
import { TikTokCircle } from "../../assets/components/icons/Icons"
import { LocationCircle } from "../../assets/components/icons/Icons"
import { EmailCircle } from "../../assets/components/icons/Icons"
import { JoinCircle } from "../../assets/components/icons/Icons"
import { PercentageCircle } from "../../assets/components/icons/Icons"

const ContactSection = ({ data }) => {
  const isBrowser = typeof window !== "undefined"
  const socialIcons = data?.layout.button.map((el, index) => {
    let icon
    switch (el.title) {
      case "Facebook":
        icon = <FacebookCircle2 />
        break
      case "Linkedin":
        icon = <LinkedInCircle />
        break
      case "Tiktok":
        icon = <TikTokCircle />
        break
      case "Instagram":
        icon = <InstagramCircle2 />
        break
      default:
        break
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
        href={el.url}
        target="_blank"
        rel="noreferrer"
        key={index}
        className={Style.social_icon}
      >
        {icon}
      </a>
    )
  })
  const infoBlocks = data?.contact.social_links.map((el, index) => {
    let icon
    switch (el.title) {
      case "Email us":
        icon = (
          <div className={Style.IconWrapper}>
            <EmailCircle />
          </div>
        )
        break
      case "Join us":
        icon = (
          <div className={Style.IconWrapper}>
            <JoinCircle />
          </div>
        )
        break
      case "Sales enquries":
        icon = (
          <div className={Style.IconWrapper}>
            <PercentageCircle />
          </div>
        )
        break

      default:
        break
    }

    return (
      <div
        className={`${Style.info_block} ${
          index + 1 === data?.contact.social_links.length && Style.no_margin
        }`}
        key={index}
      >
        {icon}
        <div className={Style.heading}>{el.title}</div>
        <div className={Style.description}>
          <a
            onClick={() => {
              if (isBrowser) {
                window.dataLayer = window.dataLayer || []
                window.dataLayer.push({
                  event: "email_click",
                })
              }
            }}
            href={`mailto:${el.title_mobile}`}
          >
            {el.title_mobile}
          </a>
        </div>
      </div>
    )
  })
  return (
    <div className={`main-container ${Style.contact_us_section}`}>
      <div className={Style.content_wrapper}>
        <div className={Style.heading}>{data?.contact.heading}</div>
        <div className={Style.address}>
          <div className={Style.IconWrapper}>
            <LocationCircle />
          </div>
          <Markdown children={data?.contact.address.data.address} />
        </div>
        <div className={Style.social_icons}>{socialIcons}</div>
      </div>
      <div className={Style.content_wrapper}>{infoBlocks}</div>
    </div>
  )
}

export default ContactSection
