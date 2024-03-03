const homepage = {
  singularName: "home",
  pluginOptions: {
    i18n: {
      locale: "all",
    },
  },
  queryParams: {
    populate: {
      banner: {
        populate: {
          heading: "*",
          description: "*",
          background_image_desktop: "*",
          background_image_mobile: "*",
          product_image_desktop: "*",
          product_image_mobile: "*",
          button: {
            populate: {
              url: "*",
              title: "*",
              title_mobile: "*",
              icon: "*",
            },
          },
        },
      },
      icons_collection: {
        populate: {
          single_icon: {
            populate: {
              heading: "*",
              description: "*",
              icon_image: "*",
            },
          },
        },
      },
      how_it_works: {
        populate: {
          heading: "*",
          description: "*",
          how_it_works_step: {
            populate: {
              step_image: "*",
              step_description: "*",
            },
          },
          how_it_works_time: {
            populate: {
              time_icon: "*",
              icon_text: "*",
              heading: "*",
              description: "*",
            },
          },
        },
      },
      review: {
        populate: {
          heading: "*",
          description: "*",
          single_review: {
            populate: {
              name: "*",
              text: "*",
              image: "*",
              color_code: "*",
            },
          },
        },
      },
      instagram: {
        populate: {
          heading: "*",
          description: "*",
          instagram_post: {
            populate: {
              heading: "*",
              description: "*",
              post_url: "*",
              likes_counter: "*",
              comments_counter: "*",
              image: "*",
              in_image_heading: "*",
              in_image_description: "*",
              logo_postion: "*",
              image_text_position: "*",
              image_text_alignment: "*",
              in_image_text_background_color: "*",
              show_logo: "*",
              half_screen_image: "*",
            },
          },
        },
      },
      faq: {
        populate: {
          heading: "*",
          button: {
            populate: {
              url: "*",
              title: "*",
            },
          },
          questions: {
            populate: {
              heading: "*",
              description: "*",
            },
          },
        },
      },
      planet_cleaning: {
        populate: {
          heading: "*",
          description: "*",
          planet_media: {
            populate: {
              icon: "*",
              title: "*",
              info: "*",
            },
          },
        },
      },
      seo: {
        populate: {
          title: "*",
          // metaTitle: "*",
          // metaKeywords: "*",
          // metaAuthor: "*",
          description: "*",
          // metaDescription: "*",
          // ogTitle: "*",
          // ogType: "*",
          // ogDescription: "*",
          // canonicalTag: "*",
          // altImageText: "*",
          // jsonLD: "*",
        },
      },
      homepageCollection: {
        populate: {
          heading: "*",
          background: "*",
          mobileBackground: "*",
          layoutClass: "*",
          handle: "*",
          order: "*",
          button: {
            populate: {
              title: "*",
              url: "*",
              title_mobile: "*",
            },
          },
          content: {
            populate: {
              pargraph: "*",
            },
          },
          imageOnLeft: "*",
          buttonClass: "*",
          productId: "*",
        },
      },
    },
  },
}
module.exports = homepage
