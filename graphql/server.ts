import {ApolloServer, gql} from 'apollo-server-micro'
import * as resolvers from './resolvers'



const typeDefs = gql`
  scalar DateTime
  
  type Project {
    id: Int!
    name: String!
    description: String!
    icon_url: String!
    users: [User!]!
  }

  type User {
    id: Int!
    name: String!
    bio: String!
    avatar_url: String!
    fellowship: String!
    projects: [Project!]!
  }

  type Announcement {
    id: Int!
    fellowship: String!
    title: String!
    body: String!
    created_ts: DateTime!
    updated_ts: DateTime!
  }

  type Query {
    project(id: Int!): Project!
    user(id: Int!): User!
    users(limit: Int!, page: Int!, fellowships: [String!]!): [User]!
    announcements(limit: Int!, page: Int!, fellowships: [String!]!): [Announcement]!
  }
`;

export const server = new ApolloServer({typeDefs, resolvers})
