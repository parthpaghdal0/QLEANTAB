import { useContext, useEffect } from "react"
import GeneralContext from "../context/GeneralContext"

const useGlobalLang = () => {
  const isBrowser = typeof window !== "undefined"
  const { GLOBAL_LANG, setLocalLang } = useContext(GeneralContext)

  const checkUrlLang = () => {
    if (isBrowser) {
      const location = window.location.href
      if (location) {
        const extract = location.split("/")
        const hasLang = extract.find(ele => ele === "en")
        const lang = localStorage.getItem("globalLang")
        if (hasLang) {
          if (!lang) return setLocalLang("en")
          if (lang && lang !== "en") return setLocalLang("en")
        } else {
          if (!lang) return setLocalLang("sv")
          if (lang && lang !== "sv") return setLocalLang("sv")
        }
      }
    }
  }

  useEffect(() => {
    checkUrlLang()
  }, [])

  return {
    GLOBAL_LANG,
  }
}

export default useGlobalLang
