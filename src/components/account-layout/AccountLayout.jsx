import React, { useContext } from "react"
import * as Style from "./AccountLayout.module.scss"
import { graphql, useStaticQuery } from "gatsby"
import AccountLink from "../UI/account-link/AccoutLink"
import Markdown from "react-markdown"
import CheckoutContext from "../../context/CheckoutContext"
import {
  DetailsIcon,
  AdressIcon,
  OrderIcon,
  SubIcon,
  LogoutIcon,
} from "../../assets/components/icons/Icons"
import Button from "../UI/custom-button/CustomButton"
import useGlobalLang from "../../custom-hooks/useGlobalLang"

const AccountLayout = ({ children }) => {
  const { GLOBAL_LANG } = useGlobalLang()
  const layoutData = useStaticQuery(query)
  const translatedData = layoutData[GLOBAL_LANG]
  const icons = {
    0: DetailsIcon,
    1: AdressIcon,
    2: OrderIcon,
    3: SubIcon,
  }

  const { logOutHandler, customerData } = useContext(CheckoutContext)

  const dekstop = translatedData.accLink.map((item, index) => {
    return (
      <AccountLink
        key={index}
        title={item.titleDesktop}
        url={item.url}
        Icon={icons[index]}
      />
    )
  })

  const mobile = translatedData.accLink.map((item, index) => {
    return (
      <AccountLink
        key={index}
        title={item.titleMobile}
        url={item.url}
        Icon={icons[index]}
      />
    )
  })

  return (
    <section className={`${Style.accountWrapper} main-container`}>
      <aside className={Style.navBar}>
        <div className={Style.navigateAwayWrapper}>
          <Markdown children={translatedData.navigateHome.data.navigateHome} />
        </div>
        <p className={Style.heading}>{translatedData?.heading}</p>
        <p className={Style.name}>{customerData?.firstName}</p>
        <ul className={`${Style.navWrapper} ${Style.desktop}`}>
          {dekstop}
          <Button buttonHandler={logOutHandler} style={Style.logoutBtn}>
            <div className={Style.iconWrapper}>
              <LogoutIcon />
            </div>
            <p>{translatedData.accButton.title}</p>
          </Button>
        </ul>
        <ul className={`${Style.navWrapper} ${Style.mobile}`}>{mobile}</ul>
      </aside>
      {children}
    </section>
  )
}

export default AccountLayout

const query = graphql`
  fragment LangAccLayout on STRAPI_ACC_LAYOUT {
    heading
    navigateHome {
      data {
        navigateHome
      }
    }
    accLink {
      titleDesktop
      titleMobile
      url
      icon {
        localFile {
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED)
          }
        }
      }
    }
    accButton {
      title
      icon {
        localFile {
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED)
          }
        }
      }
    }
  }

  query {
    en: strapiAccLayout(locale: { eq: "en" }) {
      ...LangAccLayout
    }
    sv: strapiAccLayout(locale: { eq: "sv-SE" }) {
      ...LangAccLayout
    }
  }
`
