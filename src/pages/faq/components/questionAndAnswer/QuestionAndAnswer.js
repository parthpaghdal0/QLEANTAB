import React, { useState, useLayoutEffect } from "react"
import * as Style from "./question-and-answer.module.scss"
import Markdown from "react-markdown"
import { SlickLeftArrow } from "../../../../assets/components/icons/Icons"

const QuestionAndAnswer = ({ data, selectedCategory, pdfData }) => {

  const isBrowser = typeof window !== "undefined"
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const [faqArr, setFaqArr] = useState([])
  useLayoutEffect(() => {
    if (data) setFaqArr(data.Faq_page[selectedCategory].Faq_QA)
  }, [data, selectedCategory])
  function openQuestion(index, question) {
    if (isBrowser) {
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({
        event: "expand_faq_answer",
        question_text: question,
      })
    }

    if (index === selectedQuestion) {
      setSelectedQuestion(null)
    } else {
      setSelectedQuestion(index)
    }
  }

  const blocks = faqArr?.map((el, index) => {
    return (
      <div className={Style.question_wrapper} key={index}>
        <div
          className={Style.question_heading}
          onClick={() => openQuestion(index, el?.Question.data.Question)}
          onKeyDown={() => openQuestion(index)}
          role="button"
          tabIndex={0}
        >
          <div
            className={`${Style.heading} ${
              index === selectedQuestion && Style.selected
            }`}
          >
            <Markdown children={el?.Question.data.Question} />
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
            <Markdown children={el?.Answer?.data?.Answer} />
            {(el.Question.data.Question === "Where can I find your product safety information?" || el.Question.data.Question === "Vart hittar jag er produktsäkerhetsblad?")
            && (
              <div>
                {pdfData && (
                  <>
                    {pdfData.edges.map((file, index) => {
                      return (
                        <p key={`pdf-${index}`}>
                          <a
                            href={file.node.publicURL}
                            download
                            className={Style.pdf_link}
                          >
                            {file.node.name}
                          </a>
                        </p>
                      )
                    })}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  })
  return (
    <div className={`${Style.faq_section} main-container`}>
      <div className={Style.heading}>
        {/* <Markdown children={data?.heading.data.heading} /> */}
      </div>
      <div>{blocks}</div>
    </div>
  )
}

export default QuestionAndAnswer
