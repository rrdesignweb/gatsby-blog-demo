import React from "react"
import { graphql } from "gatsby"
import { BLOCKS } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

import Layout from "../components/layout"
import SEO from "../components/seo"

export const query = graphql`
  query($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      publishedDate(formatString: "MMMM Do, YYYY")
      body {
        json
      }
    }
  }
`

const SinglePost = ({ data }) => {
  const post = data.contentfulBlogPost
  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: node => {
        const { title, file } = node.data.target.fields
        const alt = title["en-US"]
        const url = file["en-US"].url
        return <img alt={alt} src={url} />
      },
    },
  }
  return (
    <Layout>
      <SEO title={post.title} />
      <h1>{post.title}</h1>
      <p>{post.publishedDate}</p>
      {documentToReactComponents(post.body.json, options)}
    </Layout>
  )
}

export default SinglePost
