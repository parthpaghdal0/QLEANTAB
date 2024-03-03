import React, { useLayoutEffect } from "react"
import * as Style from "./how-it-works-section.module.scss"
import Markdown from "react-markdown"
import Step from "./components/step/Step"
import TimeTemperature from "./components/time-temperature/TimeTemperature"
import useWindowWidth from "../../custom-hooks/useWindowWidth"

const HowItWorksSection = ({ data }) => {
  const isBrowser = typeof window !== "undefined"
  const windowWidth = useWindowWidth()

  const stepArr = data?.how_it_works_step.map((el, index) => {
    return <Step key={index} data={el} index={index} />
  })
  const timeArr = data?.how_it_works_time.map((el, index) => {
    return <TimeTemperature key={index} data={el} />
  })
  useLayoutEffect(() => {
    setTimeout(() => {
      if (isBrowser) {
        let arr = Array.from(document.getElementsByClassName("step_component"))
        let heights = []
        arr.forEach((element, index) => {
          Array.from(element.children).forEach(function (element, index) {
            let elementHeight = element.offsetHeight
            if (!heights[index] || heights[index] < elementHeight) {
              heights[index] = elementHeight
            }
          })
        })
        Array.from(document.getElementsByClassName("step_component")).forEach(
          function (element, index) {
            Array.from(element.children).forEach(function (element, index) {
              element.style.height = heights[index] + "px"
            })
          }
        )
      }
    }, 500)
  }, [windowWidth,isBrowser])

  return (
    <div className={Style.how_it_works_section}>
      <div className={Style.heading}>
        <Markdown children={data?.heading?.data?.heading} />
      </div>
      <div className={Style.description}>
        <Markdown children={data?.description?.data?.description} />
      </div>
      <div className={Style.steps_wrapper}>{stepArr}</div>
      <div className={Style.times_wrapper}>{timeArr}</div>
    </div>
  )
}

export default HowItWorksSection
