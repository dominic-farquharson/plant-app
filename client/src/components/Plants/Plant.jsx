import React from 'react'
import LazyLoad from 'react-lazyload'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import CreateComment from '../Comments/CreateComment'
import Comments from '../Comments/Comments'
import { withRouter } from "react-router"
import './Plant.scss'

const Plant = ({
  title,
  imageUrl,
  description,
  id,
  history,
  isViewPlant = false,
  profile,
  isUserFetchComplete,
  addComment,
  favoritePlant,
  creatorId,
  favorites = null,
  deletePlant,
  users,
}) => {
  const isCreator = (profile && profile.id) === creatorId
  const hasUserFavorited = favorites && favorites.includes(profile && profile.id)
  const hasAFavorite = !hasUserFavorited && favorites
  const onHeartIconClick = async () => {
    if (!profile) return alert('You must be logged in to favorite a plant')
    if (hasAFavorite) return alert('another user has favorited this plant')
    favoritePlant(id)
  }
  const favoritedById = hasAFavorite ? favorites[0] : hasUserFavorited ? profile.id : null
  const favoritedBy = users && users.find(user => user.id === favoritedById)

  return (
    <div className={cx("plant", {
      'view-plant': isViewPlant,
    })}>
      <section className="plant__image-title">
        <LazyLoad height={200}>
          <img className="plant__img" src={imageUrl} onClick={() => history.push(`/plants/${id}`)} />
        </LazyLoad>
        {true && (
          <div className="plant__buttons">
            {hasUserFavorited && <i className="fa fa-heart red-background" aria-hidden="true" onClick={onHeartIconClick} />}
            {(hasAFavorite || !hasUserFavorited) && <i className={cx("fa fa-heart-o", {
              'red-border': hasAFavorite
            })} aria-hidden="true" onClick={onHeartIconClick} />}
            {isCreator && (
              <>
                <Link to={`/plants/${id}/edit`}>
                  <i className="fa fa-pencil" />
                </Link>
                <i
                  className="fa fa-trash"
                  onClick={async () => {
                    const confirm = window.confirm('Are you sure you would like to delete this plant?')
                    if (confirm) {
                      await deletePlant(id)
                      history.push('/')
                    }
                  }}
                />
              </>
            )}
          </div>
        )}
        <h2>{title}</h2>
      </section>
      <section className="view-plant__comments-description">
        {((hasAFavorite || hasUserFavorited) && isViewPlant)  && <h2>{!!favoritedBy && favoritedBy.firstName}'s Favorite Plant</h2>}
        <p className="plant__description">{description}</p>
        {isViewPlant && (
          <>
            <CreateComment postId={id} addComment={addComment} postTitle={title} isLoggedIn={!!profile} isUserFetchComplete={isUserFetchComplete} />
            <Comments postId={id} />
          </>
        )}
      </section>
    </div>
  )
}

export default withRouter(Plant)
