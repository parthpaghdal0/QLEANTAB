import React, { useState } from "react"

const useGetUrlParams = () => {
  const [paramData, setParamData] = useState(null)

  const getUrlParams = urlArg => {
    if (typeof window !== "undefined") {
      const queryParams = new URLSearchParams(window.location.search)
      const urlData = queryParams.get(urlArg)
      setParamData(urlData)
      return urlData
    }
  }

  return {
    getUrlParams,
    paramData: paramData,
  }
}

export default useGetUrlParams
