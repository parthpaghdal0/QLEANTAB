import React from "react"
import { graphql } from "gatsby"
import Layout from "../../components/layout/Layout"
import LatestArticle from "../../components/latest-article/LatestArticle"
import ArticlesGrid from "../../components/articles-grid/ArticlesGrid"
import PlanetApprovedCleaning from "../../components/planet-approved-cleaning/PlanetApprovedCleaning"
import useGlobalLang from "../../custom-hooks/useGlobalLang"

export const query = graphql`
  fragment LangBlogPage on STRAPI_BLOG_PAGE {
    articles_grid_button_text
    articles_grid_button_text2
    articles_grid_heading
    latest_article_button_text
    related_articles_heading
    # latest_article {
    #   Title
    #   Date(formatString: "DD-MM-YYYY")
    #   Author
    #   Handle
    #   main_image {
    #     localFile {
    #       childImageSharp {
    #         gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
    #       }
    #     }
    #   }
    #   text_content_1 {
    #     data {
    #       text_content_1
    #     }
    #   }
    # }
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
  query {
    en: strapiBlogPage(locale: { eq: "en" }) {
      ...LangBlogPage
    }

    sv: strapiBlogPage(locale: { eq: "sv-SE" }) {
      ...LangBlogPage
    }
    en1: allStrapiArticle(
      limit: 1
      sort: { fields: publishedAt, order: DESC }
      filter: { locale: { eq: "en" } }
    ) {
      nodes {
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
    sv1: allStrapiArticle(
      limit: 1
      sort: { fields: publishedAt, order: DESC }
      filter: { locale: { eq: "sv-SE" } }
    ) {
      nodes {
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
`
const Blog = ({ data }) => {
  const { GLOBAL_LANG } = useGlobalLang()
  return (
    <Layout>
      <LatestArticle
        data={data[GLOBAL_LANG + "1"]?.nodes[0]}
        buttonText={data[GLOBAL_LANG]?.latest_article_button_text}
      />
      <ArticlesGrid
        heading={data[GLOBAL_LANG]?.articles_grid_heading}
        buttonText={data[GLOBAL_LANG]?.articles_grid_button_text}
        buttonText2={data[GLOBAL_LANG]?.latest_article_button_text}
        buttonText3={data[GLOBAL_LANG]?.articles_grid_button_text2}
      />
      <PlanetApprovedCleaning
        data={data[GLOBAL_LANG]?.icons_section}
      />
    </Layout>
  )
}

export default Blog
