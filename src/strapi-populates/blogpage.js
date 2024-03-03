const blog_page = {
  singularName: "blog-page",
  pluginOptions: {
    i18n: {
      locale: "all",
    },
  },
  queryParams: {
    populate: {
      latest_article_button_text: "*",
      articles_grid_heading: "*",
      articles_grid_button_text: "*",
      articles_grid_button_text2:"*",
      related_articles_heading:"*",
      icons_section: {
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
      // latest_article: {
      //   populate: {
      //     article: {
      //       id: "*",
      //       title: "*",
      //       date: "*",
      //       author: "*",
      //       handle: "*",
      //       main_image: "*",
      //       text_content_1: "*",
      //     },
      //   },
      // },
    },
  },
}

module.exports = blog_page
