import React, { useContext, useEffect } from "react"
import { graphql } from "gatsby"
import SignupWrapper from "../../../components/account-componets/forms/signup-form/SignupWrapper"
import MessagePopUp from "../../../components/UI/message-popup/MessagePopUp"
import CheckoutContext from "../../../context/CheckoutContext"
import FullPageLoader from "../../../components/UI/full-page-loader/FullPageLoader"
import { navigate } from "gatsby"
import useGlobalLang from "../../../custom-hooks/useGlobalLang"

const Signup = ({ data }) => {
  const { GLOBAL_LANG } = useGlobalLang()
  const translatedData = data[GLOBAL_LANG]
  const { customerData } = useContext(CheckoutContext)
  useEffect(() => {
    if (customerData) {
      const url =
        GLOBAL_LANG === "en" ? "/en/account/detail" : "/account/detail"
      navigate(url)
    }
  }, [customerData])

  return (
    <>
      {customerData && <FullPageLoader />}
      <MessagePopUp />
      <SignupWrapper data={translatedData} />
    </>
  )
}

export default Signup

export const query = graphql`
  fragment LangSign on STRAPI_SIGNUP {
    signupForm {
      formTitle
      formType
      formInput {
        type
        placeholder
        label
        name
        required
        errText
        description {
          data {
            description
          }
        }
        icon {
          localFile {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED)
            }
          }
        }
      }
      logo {
        localFile {
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED)
          }
        }
      }
      formButton {
        type
        title
      }
      formLink {
        description
        title
        url
      }
      sideImage {
        localFile {
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED)
          }
        }
      }
      bgDesktop {
        url
      }
      bgMobile {
        url
      }
    }
  }

  query {
    en: strapiSignup(locale: { eq: "en" }) {
      ...LangSign
    }
    sv: strapiSignup(locale: { eq: "sv-SE" }) {
      ...LangSign
    }
  }
`
