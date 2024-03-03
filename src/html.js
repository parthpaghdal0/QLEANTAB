import React from "react"
import PropTypes from "prop-types"

export default function HTML(props) {
  const isBrowser = typeof window !== "undefined"
  return (
    <html {...props.htmlAttributes}>
      <head>
        {/* {isBrowser && (
          <script>
            {(function (w, d, s, l, i) {
              w[l] = w[l] || []
              w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" })
              var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s),
                dl = l != "dataLayer" ? "&l=" + l : ""
              j.async = true
              j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl
              f.parentNode.insertBefore(j, f)
            })(window, document, "script", "dataLayer", "GTM-M5C4BGF")}
          </script>
        )} */}
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/qleantab/image/upload/v1669627360/Cleaning_products_that_QLEAN_our_planet_740ad7b8dc.png"
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/qleantab/image/upload/v1669627360/Cleaning_products_that_QLEAN_our_planet_740ad7b8dc.png"
        />
        {/* <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        /> */}
        {props.headComponents}

        <meta
          name="google-site-verification"
          content="-zLJc6s8XCbZCwkIYLH81SxjWa7J31b4FPPxVktwCeA"
        />

        <meta
          name="facebook-domain-verification"
          content="snb4o0wnoui38u7k6nfz13jpds41zj"
        />

        {/* {process.env.GATSBY_LANG === "en" && (
          <meta
            name="google-site-verification"
            content="-zLJc6s8XCbZCwkIYLH81SxjWa7J31b4FPPxVktwCeA"
          />
        )}
        {process.env.GATSBY_LANG === "sv" && (
          <meta
            name="google-site-verification"
            content="NpnevEnMdKmk7y4K17o6brLakiP8SWqwSsR8rJgiE5Y"
          />
        )}
        {process.env.GATSBY_LANG === "en" && (
          <meta
            name="facebook-domain-verification"
            content="snb4o0wnoui38u7k6nfz13jpds41zj"
          />
        )}
        {process.env.GATSBY_LANG === "sv" && (
          <meta
            name="facebook-domain-verification"
            content="a3uqrn0tt2v54mg1l4oh6987l8igu0"
          />
        )} */}
        <script
          async
          defer
          src="https://tools.luckyorange.com/core/lo.js?site-id=00dce97f"
        ></script>
        <script
          type="text/javascript"
          async=""
          src="https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=pk_392050a159efc2f7ffc0db0d57cb7a5e94"
        ></script>
        <script
          id="ze-snippet"
          src="https://static.zdassets.com/ekr/snippet.js?key=2d61b38e-1b65-4f8c-bb42-b5eb63e0e7ec"
        >
          {" "}
        </script>
      </head>
      <body {...props.bodyAttributes}>
        {/* <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M5C4BGF"
            height="0"
            width="0"
            style="display:none;visibility:hidden"
          ></iframe>
        </noscript> */}
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
        <script
          async
          type="text/javascript"
          src="https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=RvHc4G"
        ></script>
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
