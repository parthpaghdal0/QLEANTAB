import React from "react"
import { graphql } from "gatsby"
import Landing from "../components/landing-components/Landing"

const LandingTemplate = ({ data }) => {
  const landingData = data.allStrapiLanding.nodes[0]
  const shopifyProduct = data.shopifyProduct
  return <Landing data={landingData} shopifyProduct={shopifyProduct} />
}

export default LandingTemplate

export const query = graphql`
  query ($id: String, $shopifyID: String) {
    shopifyProduct(shopifyId: { eq: $shopifyID }) {
      title
      shopifyId
      handle
      description
      descriptionHtml
      status
      productType
      vendor
      id
      variants {
        title
        sku
        shopifyId
        price
        compareAtPrice
        availableForSale
        presentmentPrices {
          price {
            amount
            currencyCode
          }
        }
      }
      options {
        name
        shopifyId
        values
        position
      }
      featuredImage {
        src
        gatsbyImageData(layout: CONSTRAINED)
        altText
      }
      media {
        preview {
          image {
            gatsbyImageData(layout: CONSTRAINED, height: 660, width: 660)
            altText
          }
        }
      }
    }

    allStrapiLanding(filter: { id: { eq: $id } }) {
      nodes {
        handle
        id
        locale
        ladingHeader {
          heading
        }
        ladingBanner {
          order
          mainHeading {
            data {
              mainHeading
            }
          }
          description {
            data {
              description
            }
          }
          logo {
            localFile {
              childImageSharp {
                gatsbyImageData(placeholder: BLURRED)
              }
            }
          }
          ladingIconText {
            description {
              data {
                description
              }
            }
            icon {
              localFile {
                childImageSharp {
                  gatsbyImageData(placeholder: BLURRED, height: 220, width: 220)
                }
              }
            }
          }
          ladingButton {
            title
            url
          }
          bgDesktop {
            url
            localFile {
              childImageSharp {
                gatsbyImageData(placeholder: BLURRED)
              }
            }
          }
          bgMobile {
            url
            localFile {
              childImageSharp {
                gatsbyImageData(placeholder: BLURRED)
              }
            }
          }
        }
        ladingIconSection {
          heading
          order
          icon {
            localFile {
              childImageSharp {
                gatsbyImageData(placeholder: BLURRED)
              }
            }
          }
        }
        ladingProduct {
          order
          shortDescription {
            data {
              shortDescription
            }
          }
          fullDescription {
            data {
              fullDescription
            }
          }
          bgDesktop {
            url
          }
          bgMobile {
            url
          }
          landingQuestion {
            btnTitle
            btnUrl
            text
            icon {
              localFile {
                childImageSharp {
                  gatsbyImageData(placeholder: BLURRED)
                }
              }
            }
          }
          ladingImage {
            localFile {
              childImageSharp {
                gatsbyImageData(placeholder: BLURRED)
              }
            }
          }
          paymentIcons {
            localFile {
              childImageSharp {
                gatsbyImageData(placeholder: BLURRED)
              }
            }
          }
          product {
            locale
            title
            title_short
            tab1 {
              heading
              section {
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
                image_desktop {
                  localFile {
                    childImageSharp {
                      gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
                    }
                    url
                  }
                }
                image_mobile {
                  localFile {
                    childImageSharp {
                      gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
                    }
                    url
                  }
                }
                background_color
                background_image {
                  localFile {
                    childImageSharp {
                      gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
                    }
                    url
                  }
                }
                icon_image1 {
                  localFile {
                    childImageSharp {
                      gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
                    }
                  }
                }
                icon_image2 {
                  localFile {
                    childImageSharp {
                      gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
                    }
                  }
                }
                icon_text1 {
                  data {
                    icon_text1
                  }
                }
                icon_text2 {
                  data {
                    icon_text2
                  }
                }
                columns_reverse
                variant_id
              }
            }
            tab2 {
              heading
              table_row {
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
                table_header
              }
            }
            tab3 {
              heading
            }
            description
            shopifyID
            bundle_content {
              product {
                title_short
                tab2 {
                  heading
                  table_row {
                    table_header
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
              }
            }
            reviews {
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
          }
        }
        ladingImageText {
          order
          imageAndText {
            title
            description {
              data {
                description
              }
            }
            image {
              localFile {
                childImageSharp {
                  gatsbyImageData(placeholder: BLURRED)
                }
              }
            }
          }
        }
        ladingCompare {
          order
          title
          video
          videoUrl
          copareIconText {
            description {
              data {
                description
              }
            }
            icon {
              localFile {
                childImageSharp {
                  gatsbyImageData(placeholder: BLURRED)
                }
              }
            }
          }
          image {
            localFile {
              childImageSharp {
                gatsbyImageData(placeholder: BLURRED)
              }
            }
          }
          bgDesktop {
            url
            localFile {
              childImageSharp {
                gatsbyImageData(placeholder: BLURRED)
              }
            }
          }
          bgMobile {
            url
            localFile {
              childImageSharp {
                gatsbyImageData(placeholder: BLURRED)
              }
            }
          }
          left
        }
        ladingVideo {
          order
          title
          videoUrl
        }
        ladingReview {
          order
          title
          bg {
            url
            localFile {
              childImageSharp {
                gatsbyImageData(placeholder: BLURRED)
              }
            }
          }
          singleLadingReview {
            title {
              data {
                title
              }
            }
            reviewText {
              data {
                reviewText
              }
            }
            reviewerName
            score
            image {
              localFile {
                childImageSharp {
                  gatsbyImageData(placeholder: BLURRED)
                }
              }
            }
          }
        }
        ladingFooter {
          footerLogo {
            localFile {
              childImageSharp {
                gatsbyImageData(placeholder: BLURRED)
              }
            }
          }
        }
      }
    }
  }
`
