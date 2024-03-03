import React, { useEffect, useState } from "react"
import * as Style from "./RecoverWrapper.module.scss"
import RecoverForm from "./recover/RecoverForm"
import useRecover from "../../../../custom-hooks/auth/useRecover"
import useGetUrlParams from "../../../../custom-hooks/use-getUrlParams"

const RecoverWrapper = ({ data }) => {
  const isBrowser = typeof window !== "undefined"
  const [mode, setMode] = useState("")
  const { getUrlParams, paramData } = useGetUrlParams()
  const { inputHandler, submitHandler, inputState, submit, loading } =
    useRecover(paramData, mode)

  useEffect(() => {
    if (isBrowser) {
      const checkParams = new URLSearchParams(window.location.search)
      if (checkParams.has("resetUrl") && !paramData) {
        setMode("resetUrl")
        getUrlParams("resetUrl")
      } else if (checkParams.has("activationUrl") && !paramData) {
        setMode("activationUrl")
        getUrlParams("activationUrl")
      }
    }
  }, [paramData])
  console.log(paramData)

  return (
    <>
      <section
        className={`${Style.recoverSection} ${Style.desktop}`}
        style={{
          backgroundImage: `url(${data.recoverForm.bgDesktop.url})`,
        }}
      >
        <RecoverForm
          data={data}
          inputHandler={inputHandler}
          submitHandler={submitHandler}
          inputState={inputState}
          submit={submit}
          loading={loading}
          idVariant={1}
        />
      </section>
      <section
        className={`${Style.recoverSection} ${Style.mobile}`}
        style={{
          backgroundImage: `url(${data.recoverForm.bgMobile.url})`,
        }}
      >
        <RecoverForm
          data={data}
          inputHandler={inputHandler}
          submitHandler={submitHandler}
          inputState={inputState}
          submit={submit}
          loading={loading}
          idVariant={2}
        />
      </section>
    </>
  )
}

export default RecoverWrapper
