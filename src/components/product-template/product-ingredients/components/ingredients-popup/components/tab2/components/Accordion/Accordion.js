import React, { useState } from "react"
import * as Style from "./accordion.module.scss"
import Markdown from "react-markdown"
import { SlickLeftArrow } from "../../../../../../../../../assets/components/icons/Icons"

const Accordion = ({ data }) => {
  const [selectedQuestion, setSelectedQuestion] = useState(null)

  function openQuestion(index) {
    if (index === selectedQuestion) {
      setSelectedQuestion(null)
    } else {
      setSelectedQuestion(index)
    }
  }
  const tableRows = data?.map((el, index) => {
    return (
      <div
        key={index}
        className={`${
          el.table_header ? Style.table_header : Style.table_row
        }  ${!el.table_header && index % 2 === 0 && Style.row_background}`}
      >
        <div className={Style.column1}>{el.heading.data.heading}</div>
        <div className={Style.column2}>{el.description.data.description}</div>
      </div>
    )
  })
  const accordion = data?.map((el, index) => {
    if (index + 1 !== 1) {
      return (
        <div
          className={`${Style.question_wrapper} ${
            index === selectedQuestion && Style.selected
          } ${index % 2 === 0 && Style.row_background}`}
          key={index}
        >
          <div
            className={Style.question_heading}
            onClick={() => openQuestion(index)}
            onKeyDown={() => openQuestion(index)}
            role="button"
            tabIndex={0}
          >
            <div
              className={`${Style.heading} ${
                index === selectedQuestion && Style.selected
              }`}
            >
              <Markdown children={el.heading.data.heading} />
            </div>
            <div
              className={`${Style.arrow} ${
                index === selectedQuestion && Style.selected
              }`}
            >
              <SlickLeftArrow />
            </div>
          </div>
          <div
            className={`${Style.helper_wrapper} ${
              index === selectedQuestion && Style.selected
            }`}
          >
            <div
              className={`${Style.answer_wrapper} ${
                index === selectedQuestion && Style.selected
              }`}
            >
              <Markdown children={el.description.data.description} />
            </div>
          </div>
        </div>
      )
    } else {
      return false
    }
  })
  return (
    <div className={Style.accordion_table_wrapper}>
      <div className={Style.helper_wrapper}>
        <div className={Style.scroll_wrapper}>{tableRows}</div>
        <div className={Style.accordion_wrapper}>{accordion}</div>
      </div>
    </div>
  )
}

export default Accordion
