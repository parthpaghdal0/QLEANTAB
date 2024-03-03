import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout/Layout"
import * as Style from "./styles/article-template.module.scss"
import { getImage, GatsbyImage } from "gatsby-plugin-image"
import Template1 from "../components/article-template/template1/Template1"
import Template2 from "../components/article-template/template2/Template2"
import RelatedArticles from "../components/related-articles/RelatedArticles"
import PlanetApprovedCleaning from "../components/planet-approved-cleaning/PlanetApprovedCleaning"
import useGlobalLang from "../custom-hooks/useGlobalLang"

export const query = graphql`
  fragment LangBlogPageIcons on STRAPI_BLOG_PAGE {
    latest_article_button_text
    related_articles_heading
    icons_section {
      heading
      description {
        data {
          description
        }
      }
      planet_media {
        icon {
          localFile {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
            }
          }
        }
        title
      }
    }
  }
  query ($id: String) {
    allStrapiArticle(filter: { id: { eq: $id } }) {
      nodes {
        id
        Handle
        ArticleWithMultipleImages
        Author
        BackgroundColorTextContent2
        Date(formatString: "DD.MM.YYYY")
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
        related_articles {
          Title
          Date(formatString: "DD-MM-YYYY")
          Author
          Handle
          main_image {
            localFile {
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
              }
            }
          }
          text_content_1 {
            data {
              text_content_1
            }
          }
        }
      }
    }

    en1: strapiBlogPage(locale: { eq: "en" }) {
      ...LangBlogPageIcons
    }

    sv1: strapiBlogPage(locale: { eq: "sv-SE" }) {
      ...LangBlogPageIcons
    }
  }
`
const ArticleTemplate = ({ data }) => {
  const { GLOBAL_LANG } = useGlobalLang()
  return (
    <Layout>
      <article className={Style.article_template}>
        {data?.allStrapiArticle?.nodes[0] && (
          <div
            className={
              !data?.allStrapiArticle?.nodes[0]
                ?.ArticleWithMultipleImages
                ? Style.article_image
                : Style.article_image2
            }
          >
            <GatsbyImage
              className={Style.main_image}
              image={getImage(
                data?.allStrapiArticle?.nodes[0]?.main_image?.localFile
                  ?.childImageSharp.gatsbyImageData
              )}
              alt="image"
            />
          </div>
        )}

        {!data?.allStrapiArticle?.nodes[0]?.ArticleWithMultipleImages ? (
          <Template1 data={data?.allStrapiArticle?.nodes[0]} />
        ) : (
          <Template2 data={data?.allStrapiArticle?.nodes[0]} />
        )}
      </article>
      {data?.allStrapiArticle?.nodes[0]?.related_articles?.length && (
        <RelatedArticles
          data={data?.allStrapiArticle?.nodes[0]?.related_articles}
          heading={
            data[`${GLOBAL_LANG}1`]?.related_articles_heading
          }
          buttonText={
            data[`${GLOBAL_LANG}1`]?.latest_article_button_text
          }
        />
      )}

      <PlanetApprovedCleaning
        data={data[`${GLOBAL_LANG}1`]?.icons_section}
      />
    </Layout>
  )
}

export default ArticleTemplate
