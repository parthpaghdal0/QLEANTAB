import React from "react"
import { graphql } from "gatsby"
import RecoverWrapper from "../../../components/account-componets/forms/recover-form/RecoveWrapper"
import MessagePopUp from "../../../components/UI/message-popup/MessagePopUp"
import useGlobalLang from "../../../custom-hooks/useGlobalLang"

const Recover = ({ data }) => {
  const { GLOBAL_LANG } = useGlobalLang()
  const translatedData = data[GLOBAL_LANG]

  return (
    <>
      <MessagePopUp />
      <RecoverWrapper data={translatedData} />
    </>
  )
}

export default Recover

export const query = graphql`
  fragment LangRecover on STRAPI_RECOVER {
    recoverForm {
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
    en: strapiRecover(locale: { eq: "en" }) {
      ...LangRecover
    }
    sv: strapiRecover(locale: { eq: "sv-SE" }) {
      ...LangRecover
    }
  }
`
