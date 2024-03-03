import { graphql } from "gatsby"

export const query = graphql`
  fragment SiteInformation on Site {
    siteMetadata {
        description
        title
    }
  }
`