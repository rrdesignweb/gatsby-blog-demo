const path = require(`path`)

//Create Blog Post Single Page from Slug
module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    {
      allContentfulBlogPost {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)
  result.data.allContentfulBlogPost.edges.forEach(edge => {
    createPage({
      path: edge.node.slug,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: {
        slug: edge.node.slug, 
      },
    })
  })
}
