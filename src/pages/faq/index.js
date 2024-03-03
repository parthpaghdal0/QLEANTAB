import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import BannerSection from "../../components/banner-section/BannerSection"
import Layout from "../../components/layout/Layout"
import Markdown from "react-markdown"
import FaqMenu from "./components/faqMenu/FaqMenu"
import QuestionAndAnswer from "./components/questionAndAnswer/QuestionAndAnswer"
import Seo from "../../components/seo/Seo"
import useGlobalLang from "../../custom-hooks/useGlobalLang"

import * as Style from "./faq.module.scss"

export const query = graphql`
  fragment LangFAQ on STRAPI_FAQ_PAGE {
    Faq_page {
      Heading
      Faq_QA {
        Answer {
          data {
            Answer
          }
        }
        Question {
          data {
            Question
          }
        }
      }
    }
    banner {
      heading {
        data {
          heading
        }
      }
      description {
        data {
          description
        }
      }
      background_image_desktop {
        url
        localFile {
          childImageSharp {
            gatsbyImageData(
              layout: CONSTRAINED
              placeholder: BLURRED
              height: 800
              width: 1920
              quality: 100
            )
          }
        }
      }
      background_image_mobile {
        url
        localFile {
          childImageSharp {
            gatsbyImageData(
              layout: CONSTRAINED
              placeholder: BLURRED
              width: 540
              quality: 100
            )
          }
        }
      }
      product_image_desktop {
        localFile {
          childImageSharp {
            gatsbyImageData(
              layout: CONSTRAINED
              placeholder: BLURRED
              height: 633
              width: 960
              quality: 100
            )
          }
        }
      }
      product_image_mobile {
        localFile {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
          }
        }
      }
    }
    seo {
      title
      metaTitle
      metaKeywords
      metaAuthor
      description
      metaDescription
      ogTitle
      ogType
      ogDescription
      canonicalTag
      altImageText
    }
  }

  query {
    en: strapiFaqPage(locale: { eq: "en" }) {
      ...LangFAQ
    }
    sv: strapiFaqPage(locale: { eq: "sv-SE" }) {
      ...LangFAQ
    }
    allFile(filter: { extension: { eq: "pdf" } }) {
      edges {
        node {
          publicURL
          name
        }
      }
    }
  }
`

const Faq = ({ data }) => {
  const { GLOBAL_LANG } = useGlobalLang()
  const [selectedCategory, setSelectedCategory] = useState(0)
  const [faqJSON, setFaqJSON] = useState(null)

  useEffect(() => {
    const jsonArray = []
    data[GLOBAL_LANG]?.Faq_page.forEach(element => {
      element.Faq_QA.forEach(item => {
        if (item?.Answer && item?.Question)
          jsonArray.push({
            "@type": "Question",
            name: item.Question.data.Question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.Answer.data.Answer,
            },
          })
      })
    })

    setFaqJSON(jsonArray)
  }, [data])

  function handleClick(category) {
    setSelectedCategory(category)
  }

  return (
    <Layout>
      {faqJSON && (
        <Seo data={data[GLOBAL_LANG].seo}>
          <script type="application/ld+json">
            {`{
                    "@context": "http://schema.org",
                    "@type":"FAQPage",
                    "@id":"https://remiliahair.com/pages/faq",
                    "mainEntity": ${JSON.stringify(faqJSON)}
                    }`}
          </script>
        </Seo>
      )}
      <BannerSection
        data={data[GLOBAL_LANG]?.banner}
        staticPage={true}
        setTitleWidth={true}
        setDescWidth={true}
      />

      <FaqMenu handleClick={handleClick} data={data[GLOBAL_LANG]} />

      <div className={Style.faqContainer}>
        <Markdown
          children={data[GLOBAL_LANG]?.Faq_page[selectedCategory]?.Heading}
        />
      </div>

      <QuestionAndAnswer
        data={data[GLOBAL_LANG]}
        pdfData={data?.allFile}
        selectedCategory={selectedCategory}
      />
    </Layout>
  )
}

export default Faq

// allFile(filter: { extension: { eq: "pdf" } }) {
//   edges {
//     node {
//       publicURL
//       name
//     }
//   }
// }
