import React from "react"
import * as Style from "./SignupWrapper.module.scss"
import SignupForm from "./signup/SignupForm"
import useSingup from "../../../../custom-hooks/auth/useSignup"

const SignupWrapper = ({ data }) => {
  const {
    inputHandler,
    submitHandler,
    checkBoxHandler,
    inputState,
    submit,
    loading,
  } = useSingup()

  return (
    <>
      <section
        className={`${Style.signupSection} ${Style.desktop}`}
        style={{
          backgroundImage: `url(${data.signupForm.bgDesktop.url})`,
        }}
      >
        <SignupForm
          data={data}
          inputHandler={inputHandler}
          submitHandler={submitHandler}
          checkBoxHandler={checkBoxHandler}
          inputState={inputState}
          submit={submit}
          loading={loading}
          idVariant={1}
        />
      </section>
      <section
        className={`${Style.signupSection} ${Style.mobile}`}
        style={{
          backgroundImage: `url(${data.signupForm.bgMobile.url})`,
        }}
      >
        <SignupForm
          data={data}
          inputHandler={inputHandler}
          submitHandler={submitHandler}
          checkBoxHandler={checkBoxHandler}
          inputState={inputState}
          submit={submit}
          loading={loading}
          idVariant={2}
        />
      </section>
    </>
  )
}

export default SignupWrapper
