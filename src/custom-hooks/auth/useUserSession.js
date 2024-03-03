const useUserSession = () => {
  const isBrowser = typeof window !== "undefined"

  const createUserSession = () => {
    if (isBrowser) {
      localStorage.setItem("logged", "true")
    }
  }

  const clearUserSession = () => {
    if (isBrowser) {
      localStorage.removeItem("logged")
    }
  }

  const getUserSession = () => {
    if (isBrowser) {
      const session = localStorage.getItem("logged")
      if (session) {
        return session
      } else {
        return null
      }
    }
  }

  return {
    createUserSession,
    clearUserSession,
    getUserSession,
  }
}

export default useUserSession
