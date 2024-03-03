import React, { useContext } from "react"
import GeneralContext from "../context/GeneralContext"

const usePopUp = () => {
  const { dispatchModal } = useContext(GeneralContext)

  const setPopUp = (message, error, click) => {
    dispatchModal({
      type: "SHOWMODAL",
      data: {
        message: message,
        show: true,
        error: error,
        click: click,
      },
    })
  }

  return {
    setPopUp,
  }
}

export default usePopUp
