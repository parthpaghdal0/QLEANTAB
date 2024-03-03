import React, { useReducer, createContext } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { useState, useEffect } from "react"
import { navigate } from "gatsby"

const GeneralContext = createContext({})

export default GeneralContext

//REDUCER
const modalReducer = (state, action) => {
  if (action.type === "SHOWMODAL") {
    return {
      modal: {
        message: action.data.message,
        show: action.data.show,
        error: action.data.error,
        click: action.data.click,
      },
    }
  }

  return {
    modal: {
      message: "",
      show: false,
      error: false,
      click: null,
    },
  }
}

export function GeneralContextProvider({ children }) {
  const isBrowser = typeof window !== "undefined"
  const [modalState, dispatchModal] = useReducer(modalReducer, {
    modal: {
      message: "",
      show: false,
      error: false,
      click: null,
    },
  })

  const data = useStaticQuery(query)

  //LANG

  const [GLOBAL_LANG, SET_GLOBAL_LANG] = useState("sv")

  const getLocalLang = () => {
    const lang = localStorage.getItem("globalLang")
    if (!lang) {
      localStorage.setItem("globalLang", GLOBAL_LANG)
    } else {
      SET_GLOBAL_LANG(lang)
    }
  }

  const setLocalLang = lang => {
    localStorage.setItem("globalLang", lang)
    SET_GLOBAL_LANG(lang)
  }

  useEffect(() => {
    getLocalLang()
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const queryParams = new URLSearchParams(window.location.search)
      const urlData = queryParams.get("l")
      if (urlData === "en") {
        SET_GLOBAL_LANG(urlData)
      }

      if (urlData === "se" || urlData === "sv") {
        SET_GLOBAL_LANG("sv")
      }
    }
  }, [])

  return (
    <GeneralContext.Provider
      value={{
        data: data,
        modalState: modalState,
        GLOBAL_LANG: GLOBAL_LANG,
        setLocalLang,
        dispatchModal,
      }}
    >
      {children}
    </GeneralContext.Provider>
  )
}

const query = graphql`
  fragment LangYotpo on STRAPI_YOTPO {
    yotpoCreateText {
      text
    }
    yotpoReviewsText {
      text
    }
    yotpoSingleText {
      text
    }
  }

  {
    en: strapiYotpo(locale: { eq: "en" }) {
      ...LangYotpo
    }
    sv: strapiYotpo(locale: { eq: "sv-SE" }) {
      ...LangYotpo
    }

    reviews: allYotpoProductReview(sort: { order: DESC, fields: createdAt }) {
      nodes {
        id
        yotpoId
        productIdentifier
        score
        sentiment
        votesUp
        votesDown
        title
        name
        email
        reviewerType
        content
        createdAt
      }
    }

    ratings: allYotpoProductBottomline {
      nodes {
        productIdentifier
        totalReviews
        score
      }
    }

    yotpoReviews: allYotpoProduct {
      nodes {
        reviews {
          id
          content
          votesUp
          votesDown
          score
          title
          createdAt
          imagesData {
            originalUrl
          }
          productId
          user {
            displayName
            userId
          }
        }
        productId
      }
    }
  }
`

//imagesData - was breaking the build, not even one image in the reviews
//
// yotpoReviews: allYotpoProduct {
//   nodes {
//     reviews {
//       id
//       content
//       votesUp
//       votesDown
//       score
//       title
//       createdAt
// imagesData {
//   originalUrl
// }
//       productId
//       user {
//         displayName
//         userId
//       }
//     }
//     productId
//   }
// }
