import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import RepositoryList from '../Repository/RepositoryList'
import ErrorMessage from '../Error'
import Loading from '../Loading'

const GET_CURRENT_USER = gql`
  query {
    viewer {
      login
      name
    }
  }
`

const REPOSITORY_FRAGMENT = gql`
  fragment repository on Repository {
    id
    name
    url
    descriptionHTML
    primaryLanguage {
      name
    }
    owner {
      login
      url
    }
    stargazers {
      totalCount
    }
    viewerHasStarred
    watchers {
      totalCount
    }
    viewerSubscription
  }
`

const GET_REPOSITORIES_OF_CURRENT_USER = gql`
  {
    viewer {
      repositories(first: 5, orderBy: { direction: DESC, field: STARGAZERS }) {
        edges {
          node {
            ...repository
          }
        }
      }
    }
  }

  ${REPOSITORY_FRAGMENT}
`

// const Profile = () => {
//   return (
//     <Query query={GET_REPOSITORIES_OF_CURRENT_USER}>
//       {({ data, loading, error }) => {
//         if (error) {
//           return <ErrorMessage error={error} />
//         }

//         const { viewer } = data
//         if (loading || !viewer) {
//           return <Loading />
//         }

//         return <RepositoryList repositories={viewer.repositories} />
//       }}
//     </Query>
//   )
// }

const Profile = ({ data, loading, error }) => {
  if (error) {
    return <ErrorMessage error={error} />
  }

  const { viewer } = data
  if (loading || !viewer) {
    return <Loading />
  }

  return <RepositoryList repositories={viewer.repositories} />
}

export default graphql(GET_REPOSITORIES_OF_CURRENT_USER)(Profile)
