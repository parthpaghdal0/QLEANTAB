const landing = {
  singularName: "landing",
  pluginOptions: {
    i18n: {
      locale: "all",
    },
  },
  queryParams: {
    id: "*",
    handle: "*",
    populate: {
      //header
      ladingHeader: {
        populate: {
          heading: "*",
        },
      },
      //banner
      ladingBanner: {
        populate: {
          logo: "*",
          mainHeading: "*",
          description: "*",
          ladingIconText: {
            populate: {
              icon: "*",
              description: "*",
            },
          },
          ladingButton: {
            populate: {
              title: "*",
              url: "*",
            },
          },
          bgDesktop: "*",
          bgMobile: "*",
          order: "*",
        },
      },
      //icon-section
      ladingIconSection: {
        populate: {
          heading: "*",
          icon: "*",
          order: "*",
        },
      },
      //product
      ladingProduct: {
        populate: {
          shortDescription: "*",
          fullDescription: "*",
          bgDesktop: "*",
          bgMobile: "*",
          ladingImage: "*",
          paymentIcons: "*",
          landingQuestion: {
            populate: {
              icon: "*",
              text: "*",
              btnTitle: "*",
              btnUrl: "*",
            },
          },
          order: "*",
          //RELATION
          product: {
            populate: {
              title: "*",
              shopifyID: "*",
              description: "*",
            },
          },
        },
      },
      //image-text
      ladingImageText: {
        populate: {
          imageAndText: {
            populate: {
              title: "*",
              description: "*",
              image: "*",
            },
          },
          order: "*",
        },
      },
      //compare
      ladingCompare: {
        populate: {
          title: "*",
          image: "*",
          bgDesktop: "*",
          bgMobile: "*",
          left: "*",
          order: "*",
          copareIconText: {
            populate: {
              icon: "*",
              description: "*",
            },
          },
        },
      },
      //video
      ladingVideo: {
        populate: {
          videoUrl: "*",
          title: "*",
          order: "*",
        },
      },
      //reviews
      ladingReview: {
        populate: {
          title: "*",
          singleLadingReview: {
            populate: {
              title: "*",
              reviewText: "*",
              reviewerName: "*",
              image: "*",
              score: "*",
            },
          },
          bg: "*",
          order: "*",
        },
      },
      //footer
      ladingFooter: {
        populate: {
          footerLogo: "*",
        },
      },
    },
  },
}

module.exports = landing
