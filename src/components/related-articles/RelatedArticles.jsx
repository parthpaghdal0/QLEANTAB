import React from "react"
import * as Style from "./related-articles.module.scss"
import ArticleCard from "../articles-grid/article-card/ArticleCard"

const RelatedArticles = ({ data, heading, buttonText }) => {
  let content = data?.map((el, index) => {
    return (
      <ArticleCard
        buttonText2={buttonText}
        data={el}
        key={index}
        relatedArticle={true}
      />
    )
  })
  return (
    <section className={`main-container ${Style.related_articles}`}>
      <h3>{heading}</h3>
      <div className={Style.related_articles_grid}>{content}</div>
    </section>
  )
}

export default RelatedArticles
