import React from "react"

import { graphql } from "gatsby"

import Layout from "../components/layout"

const SinglePost = ({ data }) => {
  const post = data.contentfulBlogPost
  return (
    <Layout>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.body }} />
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      publishedDate(formatString: "MMMM Do, YYYY")
    }
  }
`
export default SinglePost
