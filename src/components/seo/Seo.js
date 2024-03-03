import React from "react"
import Helmet from "react-helmet"

const Seo = ({ data, children }) => {
  return (
    <Helmet>
      {data?.canonicalTag && <link rel="canonical" href={data?.canonicalTag} />}
      {data?.title && <title>{data?.title}</title>}

      {data?.description && (
        <meta name="description" content={data?.description} />
      )}

      {data?.metaImage && <meta name="image" content={data?.metaImage?.url} />}
      {data?.metaImage && <meta name="og:image" content={data?.metaImage?.url} />}
      {data?.altImageText && (
        <meta name="image-alt" content={data?.altImageText} />
      )}
      {data?.metaAuthor && <meta name="author" content={data?.metaAuthor} />}
      {data?.metaKeywords && (
        <meta name="keywords" content={data?.metaKeywords} />
      )}

      {data?.ogTitle && <meta name="og:title" content={data?.ogTitle} />}
      {data?.ogDescription && (
        <meta name="og:description" content={data?.ogDescription} />
      )}
      {data?.ogType && <meta name="og:type" content={data?.ogType} />}
      {children}
    </Helmet>
  )
}

export default Seo
