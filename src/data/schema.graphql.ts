import { gql } from "apollo-server-core";

const { buildSchema } = require("graphql");

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`)

// The root provides a resolver function for each API endpoint
var root = {
  hello() {
    return "Hello world!"
  },
}

export default {
  schema, root
}
// const { gql } require('apollo-server-express');
// input ArticleInput{
//     id: ID
//     title: String
//     slug: String
//     description: String
// }

export const typeDefs = gql`

    type Article{
        id:ID
        title:String
        slug:String
        description:String
    }

    type ArticleResponse{
      id: String!
      title: String!
      slug:String!
      description:String!
      createdAt: String!
      updatedAt: String!
    }


    type Query{
        auth:[Article]
    }

    type Mutation{
      Auth():ArticleResponse
    }
`;


// # /**         getAllArticle:[Article]
// #         findAArticle(id:ID):Article
// # */