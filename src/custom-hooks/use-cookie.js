import React, { useState } from "react"

const useCookie = (cookieName, cookieValue) => {
  const isBrowser = typeof window !== "undefined"
  const [hasCookie, setHasCookie] = useState(true)

  const setCookie = () => {
    if (isBrowser) {
      const now = new Date()
      const time = now.getTime()
      const expireTime = time + 1000 * 3600000
      now.setTime(expireTime)
      document.cookie = "cookie=ok;expires=" + now.toUTCString() + ";path=/"

      document.cookie = `${cookieName}=${cookieValue}; expires=${now.toUTCString()}; SameSite=None; Secure`
      setHasCookie(true)
    }
  }

  const getCookie = () => {
    if (isBrowser && cookieValue) {
      const cookie = document.cookie
        .split("; ")
        .find(row => row.startsWith(`${cookieName}=`))

      if (cookie) {
        return
      } else {
        setHasCookie(false)
      }
    }
  }

  return {
    getCookie,
    setCookie,
    hasCookie: hasCookie,
  }
}

export default useCookie
