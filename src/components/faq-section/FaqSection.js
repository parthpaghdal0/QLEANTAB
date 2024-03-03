import React, { useState } from "react"
import * as Style from "./faq-section.module.scss"
import Markdown from "react-markdown"
import { SlickLeftArrow } from "../../assets/components/icons/Icons"
import CustomButton from "../UI/custom-button/CustomButton"

const FaqSection = ({ data }) => {
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const [questionCounter, setQuestionCounter] = useState(5)
  const [more, setMore] = useState(false)
  function openQuestion(index) {
    if (index === selectedQuestion) {
      setSelectedQuestion(null)
    } else {
      setSelectedQuestion(index)
    }
  }
  function loadMore() {
    // if (questionCounter < data.questions.length) {
    //   let num = questionCounter + 5
    //   setQuestionCounter(num)
    // } else {
    //   setQuestionCounter(5)
    // }
    setMore(!more)
  }

  const blocks = data.questions.map((el, index) => {
    if (index + 1 <= questionCounter) {
      return (
        <div
          className={`${Style.question_wrapper} ${
            index + 1 === questionCounter && Style.no_border
          }`}
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

  const sliced = blocks.slice(0, 5)

  return (
    <div className={`${Style.faq_section} main-container`}>
      <div className={Style.heading}>
        <Markdown children={data?.heading.data.heading} />
      </div>
      <div>{!more ? sliced : blocks}</div>
      <div className={Style.btn_wrapper}>
        {blocks.length > 5 && (
          <CustomButton
            buttonHandler={loadMore}
            globalStyles={true}
            style={Style.faq_section_btn}
          >
            {data.button.title}
          </CustomButton>
        )}
      </div>
    </div>
  )
}

export default FaqSection
