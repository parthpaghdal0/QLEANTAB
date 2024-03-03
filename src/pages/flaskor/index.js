import React from "react"
import Loader from "../../components/loader/Loader"
import * as Style from "./flaskor.module.scss"
import { navigate } from "gatsby"
import { useLayoutEffect } from "react"
import useGlobalLang from "../../custom-hooks/useGlobalLang"

const Faskor = () => {
  const { GLOBAL_LANG } = useGlobalLang()
  useLayoutEffect(() => {
    const url =
      GLOBAL_LANG === "en"
        ? `/en/products/qleantab-bottles`
        : `/products/qleantab-bottles`
    navigate(url)
  })

  return (
    <section className={Style.wrapper}>
      <Loader />
    </section>
  )
}

export default Faskor
