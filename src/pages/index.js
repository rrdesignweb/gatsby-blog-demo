import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogLink = styled(Link)`
  text-decoration: none;
`

const BlogTitle = styled.h3`
  margin-bottom: 20;
  color: blue;
`

const BlogPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulBlogPost(sort: { fields: publishedDate, order: DESC }) {
        totalCount
        edges {
          node {
            id
            title
            slug
            publishedDate(formatString: "MMMM Do, YYYY")
          }
        }
      }
    }
  `)
  const posts = data.allContentfulBlogPost;
  return (
    <Layout>
      <SEO title="Home" />
      <div>
        <h1>Posts</h1>
        <h4>Total Posts - {posts.totalCount}</h4>
        {posts.edges.map(edge => (
          <div key={edge.node.id}>
            <BlogLink to={edge.node.slug}>
              <BlogTitle>
                {edge.node.title} - {edge.node.publishedDate}
              </BlogTitle>
            </BlogLink>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export default BlogPage