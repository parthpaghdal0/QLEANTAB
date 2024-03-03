import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import * as Style from "./articles-grid.module.scss"
import ArticleCard from "./article-card/ArticleCard"
import CustomButton from "../UI/custom-button/CustomButton"
import useGlobalLang from "../../custom-hooks/useGlobalLang"

export const query = graphql`
  query {
    en: allStrapiArticle(
      sort: { fields: publishedAt, order: DESC }
      filter: { locale: { eq: "en" } }
    ) {
      nodes {
        id
        Handle
        ArticleWithMultipleImages
        Author
        BackgroundColorTextContent2
        Date(formatString: "MMMM DD,YYYY")
        FullwidthImage2
        Title
        text_content_1 {
          data {
            text_content_1
          }
        }
        text_content_2 {
          data {
            text_content_2
          }
        }
        text_content3 {
          data {
            text_content3
          }
        }
        text_content4 {
          data {
            text_content4
          }
        }
        main_image {
          localFile {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
            }
          }
        }
        image1 {
          localFile {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
            }
          }
        }
        image2 {
          localFile {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
            }
          }
        }
      }
    }
    sv: allStrapiArticle(
      sort: { fields: publishedAt, order: DESC }
      filter: { locale: { eq: "sv-SE" } }
    ) {
      nodes {
        id
        Handle
        ArticleWithMultipleImages
        Author
        BackgroundColorTextContent2
        Date(formatString: "MMMM DD,YYYY")
        FullwidthImage2
        Title
        text_content_1 {
          data {
            text_content_1
          }
        }
        text_content_2 {
          data {
            text_content_2
          }
        }
        text_content3 {
          data {
            text_content3
          }
        }
        text_content4 {
          data {
            text_content4
          }
        }
        main_image {
          localFile {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
            }
          }
        }
        image1 {
          localFile {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
            }
          }
        }
        image2 {
          localFile {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
            }
          }
        }
      }
    }
  }
`

const ArticlesGrid = ({ heading, buttonText, buttonText2, buttonText3 }) => {
  const { GLOBAL_LANG } = useGlobalLang()
  const data = useStaticQuery(query)
  const [articlesPerPage, setArticlePerPage] = useState(6)

  let content = [...data[GLOBAL_LANG]?.nodes]

  let articlesArr = content?.splice(1, articlesPerPage).map((el, index) => {
    return <ArticleCard buttonText2={buttonText2} key={index} data={el} />
  })

  const buttonhandler = () => {
    let total = data[GLOBAL_LANG]?.nodes?.length
    setArticlePerPage(total)
  }
  const buttonhandler2 = () => {
    setArticlePerPage(6)
  }

  return (
    <section className={`main-container ${Style.articles_grid}`}>
      <h3>{heading}</h3>
      <div className={Style.grid_component}>{articlesArr}</div>
      {articlesPerPage === data[GLOBAL_LANG]?.nodes?.length ? (
        <CustomButton
          buttonHandler={buttonhandler2}
          style={Style.grid_button}
          globalStyles={true}
        >
          {buttonText3}
        </CustomButton>
      ) : (
        articlesPerPage < data[GLOBAL_LANG]?.nodes?.length-1 && (
          <CustomButton
            buttonHandler={buttonhandler}
            style={Style.grid_button}
            globalStyles={true}
          >
            {buttonText}
          </CustomButton>
        )
      )}
    </section>
  )
}

export default ArticlesGrid
