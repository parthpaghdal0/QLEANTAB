const contact_page = {
  singularName: "contact-us-page",
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
        },
      },
      contact_section: {
        populate: {
          heading: "*",
          address: "*",
          social_links: {
            populate: {
              title: "*",
              title_mobile: "*",
            },
          },
        },
      },
      simple_text: {
        populate: {
          heading: "*",
          description: "*",
          button: {
            populate: {
              title: "*",
              url: "*",
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
    },
  },
}

module.exports = contact_page
