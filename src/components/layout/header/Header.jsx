import React, { useState, useContext, useEffect } from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import Markdown from "react-markdown"
import Button from "../../UI/custom-button/CustomButton"
import CustomLink from "../../UI/link/CustomLink"
import * as Style from "./Header.module.scss"
import useWindowWidth from "../../../custom-hooks/useWindowWidth"
import CheckoutContext from "../../../context/CheckoutContext"
import { navigate } from "gatsby"
import { Link } from "gatsby"
import LangDropdown from "../../UI/lang-dropdown/LangDropdown"
// import { Link } from "gatsby-plugin-react-i18next"
import {
  HeaderDesktopLogo,
  HeaderMobileLogo,
  HeaderCartIcon,
  HeaderHelpIcon,
  LogoutIcon,
} from "../../../assets/components/icons/Icons"
import useGlobalLang from "../../../custom-hooks/useGlobalLang"

let slideAnimationBlock = true

const Header = ({
  mode,
  buttons,
  links,
  infoBox,
  // mainLogo,
  // mainLogoMobile,
  // currencyList,
}) => {
  const { GLOBAL_LANG } = useGlobalLang()
  // const { languages, originalPath } = useI18next()
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [path, setPath] = useState("")
  const width = useWindowWidth()
  const ctx = useContext(CheckoutContext)
  const isBrowser = typeof window !== "undefined"
  useEffect(() => {
    if (isBrowser) {
      setPath(window.location.pathname)
    }
  })
  const showMobileMenuhandler = () => {
    slideAnimationBlock = false
    setShowMobileMenu(!showMobileMenu)
  }

  const navigateHandler = url => {
    navigate(url)
  }

  const helpNavigateHandler = () => {
    const iframe = document.querySelector("#launcher")
    if (iframe) {
      const button = iframe.contentWindow.document.querySelector(
        '[data-testid="launcher"]'
      )
      if (button) button.click()
    }
  }

  const openSideMainCarthandler = () => {
    ctx.setSideOpenCart(!ctx.openSideCart)
  }

  const [totalProductCount, settotalProductCount] = useState(0)

  useEffect(() => {
    if (isBrowser && ctx.checkout) {
      const lineItemsArray = ctx.checkout.lines.edges
      if (lineItemsArray.length !== 0) {
        settotalProductCount(ctx.checkout.totalQuantity)
      } else {
        settotalProductCount(0)
      }
    }
  }, [ctx.checkout])

  const isNotLoggedIn = !ctx.customerData && !ctx.customerToken

  const content = (
    <section
      className={`${Style.headerContainer} ${
        mode === "cart" ? Style.altPadding : "main-container"
      }`}
    >
      {/* TOP-SECTION-HEADER */}
      <div className={Style.topLevelHeader}>
        <div className={Style.logoAndMobileContainer}>
          <Button
            buttonHandler={showMobileMenuhandler}
            style={Style.mobileMenuBtn}
          >
            <div className={Style.mobileMenuBtnInnerWrapper}>
              {!showMobileMenu ? (
                <GatsbyImage
                  image={
                    buttons[3].icon.localFile.childImageSharp.gatsbyImageData
                  }
                  alt="mobile_menu_icon"
                />
              ) : (
                <GatsbyImage
                  image={
                    buttons[6].icon.localFile.childImageSharp.gatsbyImageData
                  }
                  alt="mobile_menu_icon"
                />
              )}
            </div>
          </Button>

          <div className={Style.logoWrapper}>
            <Link to={GLOBAL_LANG === "en" ? "/en" : "/"}>
              <HeaderDesktopLogo width={90} height={85} />
            </Link>
          </div>

          <div className={Style.logoWrapperMobile}>
            <Link to={GLOBAL_LANG === "en" ? "/en" : "/"}>
              <HeaderMobileLogo />
            </Link>
          </div>
        </div>
        <div className={Style.headerTopLevelBtnWrapper}>
          {/* INFO-BOX */}

          <div
            onClick={() => {
              const url =
                GLOBAL_LANG === "en"
                  ? `/en/reducing-our-Impact`
                  : `/reducing-our-Impact`
              navigateHandler.bind(null, url)
            }}
            className={Style.infoBoxWrapper}
          >
            <div>
              <GatsbyImage
                image={
                  infoBox[0].icon.localFile.childImageSharp.gatsbyImageData
                }
                alt="group_icon"
              />
            </div>
            <div>
              <Markdown children={infoBox[0].text.data.text} />
            </div>
          </div>
          <div className={Style.moblieLangDropdown}>
            <LangDropdown />
          </div>

          {/* SHOP NOW BTN */}

          {isNotLoggedIn && (
            <Button
              buttonHandler={navigateHandler.bind(null, buttons[7].url)}
              globalStyles={true}
              style={Style.shopNowBtn}
              cta={true}
            >
              {buttons[7].title}
            </Button>
          )}
          {!isNotLoggedIn && (
            <Button
              buttonHandler={navigateHandler.bind(null, buttons[8].url)}
              globalStyles={true}
              style={Style.shopNowBtn}
              cta={true}
            >
              {buttons[8].title}
            </Button>
          )}

          {/* CART BTN */}

          <Button buttonHandler={openSideMainCarthandler} style={Style.cartBtn}>
            <div className={Style.cartBtnInnerWrapper}>
              <HeaderCartIcon />
              <div className={Style.productCount}>
                <p className={Style.productCountText}>{totalProductCount}</p>
              </div>

              <p className={Style.cartTitle}>{buttons[1].title}</p>
            </div>
          </Button>
        </div>
      </div>
      {/* TOP-SECTION-HEADER */}
      <div
        // onClick={closeBottomLevelHeaderMobileHandler}
        data-type="bottomLevelHeader"
        className={`${Style.bottomLevelHeader} ${
          showMobileMenu && !slideAnimationBlock ? Style.slideIn : ""
        } ${!showMobileMenu && !slideAnimationBlock ? Style.slideOut : ""}`}
      >
        <ul className={Style.mainNavList}>
          {links.map(link => {
            return (
              <CustomLink
                event={true}
                width={width}
                showMobileMenu={showMobileMenu}
                showMobileMenuhandler={setShowMobileMenu}
                name={link.text}
                url={link.url}
                key={link.id}
                customStyles={`${Style.mainNavLink} ${
                  path.includes(link.url) && Style.selectedMainNavLink
                } ${link.url == "/faq" && Style.hideOnDesktop}`}
              />
            )
          })}
        </ul>

        <div className={Style.logOutWrapper}>
          {isNotLoggedIn && (
            <Button
              buttonHandler={navigateHandler.bind(null, buttons[7].url)}
              globalStyles={true}
              style={Style.accMobileBtn}
              cta={true}
            >
              {buttons[7].title}
            </Button>
          )}
          {!isNotLoggedIn && (
            <Button
              buttonHandler={navigateHandler.bind(null, buttons[8].url)}
              globalStyles={true}
              style={Style.accMobileBtn}
              cta={true}
            >
              {buttons[8].title}
            </Button>
          )}
          {!isNotLoggedIn && (
            <Button buttonHandler={ctx.logOutHandler} style={Style.logOutBtn}>
              <LogoutIcon />
              <div>{buttons[9].title}</div>
            </Button>
          )}
        </div>

        <div className={Style.headerBottomLevelBtnWrapper}>
          <Button buttonHandler={helpNavigateHandler} style={Style.helpBtn}>
            <div className={Style.helpBtnInnerWrapper}>
              <HeaderHelpIcon />
              <p className={Style.cartTitle}>{buttons[2].title}</p>
            </div>
          </Button>
          <div className={Style.desktopLangDropdown}>
            <LangDropdown />
          </div>

          {/* <ul className="languages">
            {languages.map(lng => (
              <li key={lng}>
                <Link to={originalPath} language={lng}>
                  {lng}
                </Link>
              </li>
            ))}
          </ul> */}

          {/* <Button style={Style.currencyBtn}>
            <div className={Style.currencyInnerWrapper}>
              <div className={Style.currencySymbol}>
                <p className={Style.currencySymbolText}>
                  {currencyList[0].symbol}
                </p>
              </div>
              <p className={Style.cartTitle}>{currencyList[0].code}</p>
              <div className={Style.triangleDown}></div>
            </div>
          </Button> */}
        </div>
      </div>
    </section>
  )

  return content
}

export default Header
