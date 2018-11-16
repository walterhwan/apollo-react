import React from 'react'
import Link from '../../Link'
import Button from '../../Button'
// import '../style.css'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

const STAR_REPOSITORY = gql`
  mutation($id: ID!) {
    addStar(input: { starrableId: $id }) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`

const RepositoryItem = ({
  id,
  name,
  url,
  descriptionHTML,
  primaryLanguage,
  owner,
  stargazers,
  watchers,
  viewerSubscription,
  viewerHasStarred,
}) => {
  return (
    <div>
      <div className="RepositoryItem-title">
        <h2>
          <Link href={url}> {name} </Link>
        </h2>
        <Mutation mutation={STAR_REPOSITORY} variables={{ id }}>
          {(addStar) => (
            <Button className={'RepositoryItem-title-action'} onClick={addStar}>
              {stargazers.totalCount} Star
            </Button>
          )}
        </Mutation>
      </div>
      <div className="RepositoryItem-description">
        <div
          className="RepositoryItem-description-info"
          dangerouslySetInnerHTML={{ __html: descriptionHTML }}
        />
        <div className="RepositoryItem-description-details">
          <div> {primaryLanguage && <span>Language : {primaryLanguage.name}</span>}</div>
          <div>
            {owner && (
              <span>
                Owner : <a href={owner.url}> {owner.login} </a>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RepositoryItem
