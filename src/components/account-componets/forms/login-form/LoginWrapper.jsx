import React, { useEffect, useContext } from "react"
import * as Style from "./LoginWrapper.module.scss"
import LoginForm from "./login/LoginForm"
import useLogin from "../../../../custom-hooks/auth/useLogin"
import useGetUrlParams from "../../../../custom-hooks/use-getUrlParams"
import CheckoutContext from "../../../../context/CheckoutContext"
import { navigate } from "gatsby"
import useGlobalLang from "../../../../custom-hooks/useGlobalLang"

const LoginWrapper = ({ data }) => {
  const {
    inputHandler,
    submitHandler,
    checkBoxHandler,
    inputState,
    submit,
    loading,
    navigateRecoveryHandler,
    recovery,
    setRecovery,
  } = useLogin()
  //
  const { getUrlParams, paramData } = useGetUrlParams()
  //
  const { customerData } = useContext(CheckoutContext)
  //
  const { GLOBAL_LANG } = useGlobalLang()

  useEffect(() => {
    if (customerData) {
      const param = getUrlParams("name")
      if (customerData.firstName === param) {
        setRecovery(true)
      } else {
        const url =
          GLOBAL_LANG === "en" ? "/en/account/detail" : "/account/detail"
        navigate(url)
      }
    }
  }, [customerData])
  //

  return (
    <>
      <section
        className={`${Style.loginSection} ${Style.desktop}`}
        style={{
          backgroundImage: `url(${data.loginForm.bgDesktop.url})`,
        }}
      >
        <LoginForm
          data={data}
          inputHandler={inputHandler}
          submitHandler={submitHandler}
          checkBoxHandler={checkBoxHandler}
          navigateRecoveryHandler={navigateRecoveryHandler}
          recovery={recovery}
          inputState={inputState}
          submit={submit}
          loading={loading}
          idVariant={1}
        />
      </section>
      <section
        className={`${Style.loginSection} ${Style.mobile}`}
        style={{
          backgroundImage: `url(${data.loginForm.bgMobile.url})`,
        }}
      >
        <LoginForm
          data={data}
          inputHandler={inputHandler}
          submitHandler={submitHandler}
          checkBoxHandler={checkBoxHandler}
          navigateRecoveryHandler={navigateRecoveryHandler}
          recovery={recovery}
          inputState={inputState}
          submit={submit}
          loading={loading}
          idVariant={2}
        />
      </section>
    </>
  )
}

export default LoginWrapper
