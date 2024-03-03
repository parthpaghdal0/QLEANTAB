import React, { useContext } from "react"
import BannerSection from "../components/banner-section/BannerSection"
import { graphql } from "gatsby"
import IconsSection from "../components/icons-section/IconsSection"
import HowItWorksSection from "../components/how-it-works-section/HowItWorksSection"
import ReviewsSection from "../components/reviews-section/ReviewsSection"
import Layout from "../components/layout/Layout"
import InstagramSection from "../components/instagram-section/InstagramSection"
import BestsellingProducts from "../components/bestselling-products/BestsellingProducts"
import ProductContext from "../context/ProductContext"
import PlanetApprovedCleaning from "../components/planet-approved-cleaning/PlanetApprovedCleaning"
import Seo from "../components/seo/Seo"
import HomepageCollection from "../components/homepage-collection/HomepageCollection"
import useGlobalLang from "../custom-hooks/useGlobalLang"

export const query = graphql`
  fragment LangHome on STRAPI_HOME {
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
      button {
        title
        title_mobile
        url
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
    icons_collection {
      single_icon {
        heading {
          data {
            heading
          }
        }
        icon_image {
          localFile {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
            }
          }
        }
      }
    }
    how_it_works {
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
      how_it_works_step {
        step_image {
          localFile {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
            }
          }
        }
        step_description {
          data {
            step_description
          }
        }
      }
      how_it_works_time {
        time_icon {
          localFile {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
            }
          }
        }
        icon_text {
          data {
            icon_text
          }
        }
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
      }
    }
    review {
      heading {
        data {
          heading
        }
      }
      single_review {
        text {
          data {
            text
          }
        }
        name {
          data {
            name
          }
        }
        image {
          localFile {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
            }
          }
        }
        color_code
      }
    }
    instagram {
      heading {
        data {
          heading
        }
      }
      instagram_post {
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
        post_url
        likes_counter
        comments_counter
        image {
          url
          localFile {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
            }
          }
        }
        in_image_heading {
          data {
            in_image_heading
          }
        }
        in_image_description {
          data {
            in_image_description
          }
        }
        logo_position
        image_text_position
        image_text_alignment
        in_image_text_background_color
        show_logo
        half_screen_image
      }
      instagram_profile_url
    }
    planet_cleaning {
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
    homepageCollection {
      order
      heading
      id
      buttonClass
      content {
        id
        pargraph {
          data {
            pargraph
          }
        }
      }
      handle
      imageOnLeft
      layoutClass
      background {
        url
        localFile {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
          }
        }
      }
      mobileBackground {
        url
        localFile {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
          }
        }
      }
      button {
        url
        title
        title_mobile
        id
      }
      productId
    }
  }

  query {
    en: strapiHome(locale: { eq: "en" }) {
      ...LangHome
    }

    sv: strapiHome(locale: { eq: "sv-SE" }) {
      ...LangHome
    }
  }
`
const TestTsveti = ({ data, pageContext }) => {
  const { shopifyCollections } = useContext(ProductContext)
  const { GLOBAL_LANG } = useGlobalLang()

  return (
    <Layout>
      <Seo data={data[GLOBAL_LANG]?.seo} />
      <BannerSection data={data[GLOBAL_LANG]?.banner} />
      <IconsSection data={data[GLOBAL_LANG]?.icons_collection.single_icon} />
      <BestsellingProducts
        collections={shopifyCollections.nodes}
        handle="your-favourites"
      />
      <HowItWorksSection data={data[GLOBAL_LANG]?.how_it_works} />
      {data[GLOBAL_LANG]?.homepageCollection[0] && (
        <>
          <HomepageCollection data={data[GLOBAL_LANG]?.homepageCollection[0]} />
          <HomepageCollection data={data[GLOBAL_LANG]?.homepageCollection[1]} />
          <HomepageCollection data={data[GLOBAL_LANG]?.homepageCollection[2]} />
          <HomepageCollection
            data={data[GLOBAL_LANG]?.homepageCollection[3]}
            isMobileInline={1}
          />
        </>
      )}

      <ReviewsSection data={data[GLOBAL_LANG]?.review} />
      {data[GLOBAL_LANG]?.homepageCollection[0] && (
        <HomepageCollection data={data[GLOBAL_LANG]?.homepageCollection[4]} />
      )}

      <InstagramSection data={data[GLOBAL_LANG]?.instagram} />
      <PlanetApprovedCleaning data={data[GLOBAL_LANG]?.planet_cleaning} />
      {data[GLOBAL_LANG]?.homepageCollection[0] && (
        <HomepageCollection data={data[GLOBAL_LANG]?.homepageCollection[5]} />
      )}
    </Layout>
  )
}

export default TestTsveti
