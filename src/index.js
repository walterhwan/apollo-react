import 'dotenv/config'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App/index'
import * as serviceWorker from './serviceWorker'

import { ApolloProvider } from 'react-apollo'
import { ApolloLink, execute } from 'apollo-link'
import { onError } from 'apollo-link-error'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
// import GraphiQL from 'graphiql'
// import { parse } from 'graphql'
// import './style.css'

const GITHUB_BASE_URL = 'https://api.github.com/graphql'

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    // do something with graphql error
    console.log('graphql error:')
    console.log(graphQLErrors)
  }
  if (networkError) {
    // do something with network error
    console.log('network error:')
    console.log(networkError)
  }
})

const httpLink = new HttpLink({
  uri: GITHUB_BASE_URL,
  headers: {
    authorization: `Bearer ${process.env.REACT_APP_PERSONAL_ACCESS_TOKEN}`,
  },
})

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, httpLink]),
  cache: new InMemoryCache(),
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
