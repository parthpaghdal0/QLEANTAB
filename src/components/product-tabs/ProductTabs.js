import React, { useState, useEffect } from "react"
import * as Style from "./product-tabs.module.scss"
import ProductTab1 from "./components/product-tab1/ProductTab1"
import ProductTab2 from "./components/product-tab2/ProductTab2"
import ProductTab3 from "./components/product-tab3/ProductTab3"

const ProductTabs = ({ data }) => {
  const [selectedTab, setSelectedTab] = useState(0)
  const [section, setSection] = useState(null)
  const tabsArr = [data?.tab1, data?.tab2, data?.tab3]

  function selectTab(index) {
    setSelectedTab(index)
  }
  useEffect(() => {
    let selectedSection
    switch (selectedTab) {
      case 0:
        selectedSection = <ProductTab1 data={data?.tab1} />
        break
      case 1:
        selectedSection = <ProductTab2 data={data?.tab2} />
        break
      case 2:
        selectedSection = <ProductTab3 data={data?.tab3} />
        break

      default:
        selectedSection = <ProductTab1 data={data?.tab1} />
        break
    }
    setSection(selectedSection)
  }, [data, selectedTab])
  const tabs = tabsArr.map((el, index) => {
    return (
      <div
        key={index}
        className={`${Style.tab} ${index === selectedTab && Style.selected}`}
        onClick={() => selectTab(index)}
        onKeyDown={() => selectTab(index)}
        role="button"
        tabIndex={0}
      >
        {el.heading}
      </div>
    )
  })
  const tabsMobile = tabsArr.map((el, index) => {
    return (
      <div
        id={`tab_${index}`}
        key={index}
        className={`${Style.mobile_tabs} ${
          index === selectedTab && Style.selected
        } `}
      >
        <div
          key={index}
          className={`${Style.tab} ${index === selectedTab && Style.selected} ${
            Style.desktop_section
          } ${index + 1 === tabsArr.length && Style.border_bottom}`}
          onClick={() => selectTab(index)}
          onKeyDown={() => selectTab(index)}
          role="button"
          tabIndex={0}
        >
          <p>{el.heading}</p>
          <div className={Style.arrow}></div>
        </div>
        <div className={Style.tab_content}>{section}</div>
      </div>
    )
  })

  return (
    <>
      <div className={`${Style.product_tabs_section} ${Style.desktop_section}`}>
        <div className={`${Style.section_header} main-container`}>{tabs}</div>
        {section}
      </div>
      <div className={`${Style.product_tabs_section} ${Style.mobile_section}`}>
        {tabsMobile}
      </div>
    </>
  )
}

export default ProductTabs
