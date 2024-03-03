import React, { useState } from "react"
import CoreScroll from '@nrk/core-scroll/jsx'

import * as Style from "./faq-menu.module.scss"

const FaqMenu = ({ data, handleClick }) => {
  const [selectedCategory, setSelectedCategory] = useState(0)

  function addActiveClass(index) {
    handleClick(index)
    if (index !== selectedCategory) {
      setSelectedCategory(index)
    }
  }

  return (
    <CoreScroll className={Style.faqMenuContainer}>
      <ul className={Style.faqMenuList}>
        {data?.Faq_page?.map((el, index) => {
          return (
            <li className={`${Style.faqMenuItem} ${index === selectedCategory && Style.activeCategory}`} key={index} onClick={event => addActiveClass(index)} onKeyDown={event => addActiveClass(index)} >{el?.Heading} ({el?.Faq_QA.length})</li>
          )
        })}
      </ul>
    </CoreScroll>
  )
}

export default FaqMenu