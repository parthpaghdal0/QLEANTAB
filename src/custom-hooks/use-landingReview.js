import React, { useState } from "react"

const useLandingReview = () => {
  const [dekstopArray, setDesktopArray] = useState([])
  const [mobileArray, setMobileArray] = useState([])

  const calulateDesktopHandler = (length, array) => {
    const desktop = [[], [], []]

    let avrage = 0
    const even = length % 2 === 0
    // avrage = length / 3

    // if (even) {
    //   avrage = Math.round(avrage)
    // }

    avrage = Math.round(length / 3)

    array.forEach((ele, index) => {
      const position = index + 1
      if (position <= avrage) {
        desktop[0].push(ele)
      } else if (
        position > avrage &&
        position <= length - avrage + (even ? 2 : 1)
      ) {
        desktop[1].push(ele)
      } else {
        desktop[2].push(ele)
      }
    })

    setDesktopArray(desktop)
  }

  const calulateMobilepHandler = (length, array) => {
    const mobile = [[], []]

    let avrage = 0
    const even = length % 2 === 0
    avrage = length / 2

    if (!even) {
      avrage = Math.round(avrage)
    }

    array.forEach((ele, index) => {
      const position = index + 1
      if (position <= avrage) {
        mobile[0].push(ele)
      } else {
        mobile[1].push(ele)
      }
    })

    setMobileArray(mobile)
  }

  return {
    calulateDesktopHandler,
    dekstopArray,
    calulateMobilepHandler,
    mobileArray,
  }
}

export default useLandingReview
