import React, { useLayoutEffect, useState } from "react"
import * as Style from "./tab2.module.scss"
import Accordion from "./components/Accordion/Accordion"
import CustomButton from "../../../../../../UI/custom-button/CustomButton"

const Tab2 = ({ data, togglePopup,closeText }) => {
  const [tabs, setTabs] = useState(null)
  const [accordionData, setAccordionData] = useState(null)
  const [indx, selectedIndx] = useState(0)
  const selectInternalTab = index => {
    selectedIndx(index)
    setAccordionData(data[index].product.tab2.table_row)
  }
  const arr = Array.isArray(data)
    ? data.map((el, index) => {
        return (
          <div
            className={`${Style.internal_tab} ${
              indx === index && Style.selected
            }`}
            key={index}
            onClick={() => selectInternalTab(index)}
          >
            {el.product.title_short}
          </div>
        )
      })
    : null
  useLayoutEffect(() => {
    if (Array.isArray(data)) {
      const arr1 = data.map((el, index) => {
        if (index === 0) setAccordionData(el.product.tab2.table_row)
        return (
          <div
            className={`${Style.internal_tab} ${
              indx === index && Style.selected
            }`}
            key={index}
            onClick={() => selectInternalTab(index)}
          >
            {el.product.title_short}
          </div>
        )
      })
      setTabs(arr1)
    } else {
      setAccordionData(data.table_row)
    }
  }, [])

  return (
    <div className={Style.tab2}>
      {arr && <div className={Style.internal_tabs_wrapper}>{arr}</div>}
      {data?.heading ? (
        <div className={Style.heading}>{data?.heading}</div>
      ) : (
        <div className={Style.heading}>{data[0].product.tab2.heading}</div>
      )}
      <Accordion data={accordionData} />
      <CustomButton
        style={Style.close}
        globalStyles={true}
        buttonHandler={() => togglePopup()}
      >
        {closeText}
      </CustomButton>
    </div>
  )
}

export default Tab2
