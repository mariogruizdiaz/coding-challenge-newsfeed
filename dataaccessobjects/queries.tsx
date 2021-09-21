import { gql } from '@apollo/client'
import { Announcement, Project, User } from './types'

export const PROJECT_QUERY = gql`
  query project($id: Int!) {
    project(id: $id) {
      id
      name
      description
      icon_url
      users {
        id
        name
        avatar_url
      }
    }
  }
`

export type ProyectQueryData = {
    project: Project;
}

export type ProyectQueryVars = {
    id: number;
}

export const USER_QUERY = gql`
  query user($id: Int!) {
    user(id: $id) {
      id
      name
      bio
      fellowship
      avatar_url
      projects {
        id
        name
        icon_url
      }
    }
  }
`

export type UserQueryData = {
    user: User;
}

export type UserQueryVars = {
    id: number;
}



export const USERS_QUERY = gql`
  query users($limit: Int!, $page: Int!, $fellowships: [String!]!) {
    users(limit: $limit, page: $page, fellowships: $fellowships) {
      id
      name
      bio
      fellowship
      avatar_url
      projects {
        id
        name
        icon_url
      }
    }
  }
`

export type UsersQueryData = {
    users: User[];
}

export type UsersQueryVars = {
    limit: number;
    page: number;
    fellowships: string[];

}


export const ANNOUNCEMENTS_QUERY = gql`
  query announcements($limit: Int!, $page: Int!, $fellowships: [String!]!) {
    announcements(limit: $limit, page: $page, fellowships: $fellowships) {
      id
      fellowship
      title
      body
      created_ts
      updated_ts
    }
  }
`

export type AnnouncementsQueryData = {
    announcements: Announcement[];
}


export type AnnouncementsQueryVars = {
    limit: number;
    page: number;
    fellowships: string[];

}

export type GenericQueryData<T> = {
    rows: T[];
}


export type GenericQueryVars = {
    limit: number;
    page: number;
    fellowships: string[];

}

