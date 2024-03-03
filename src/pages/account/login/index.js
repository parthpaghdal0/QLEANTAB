import React from "react"
import { graphql } from "gatsby"
import LoginWrapper from "../../../components/account-componets/forms/login-form/LoginWrapper"
import MessagePopUp from "../../../components/UI/message-popup/MessagePopUp"
import useGlobalLang from "../../../custom-hooks/useGlobalLang"

const Login = ({ data }) => {
  const { GLOBAL_LANG } = useGlobalLang()
  const translatedData = data[GLOBAL_LANG]

  console.log( GLOBAL_LANG);

  console.log(translatedData);

  return (
    <>
      <MessagePopUp />
      <LoginWrapper data={translatedData} />
    </>
  )
}

export default Login

export const query = graphql`
  fragment LangLog on STRAPI_LOGIN {
    loginForm {
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
    en: strapiLogin(locale: { eq: "en" }) {
      ...LangLog
    }
    sv: strapiLogin(locale: { eq: "sv-SE" }) {
      ...LangLog
    }
  }
`
