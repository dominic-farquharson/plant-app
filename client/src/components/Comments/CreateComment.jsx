import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Error from '../util/Error'
import './CreateComment.scss'

const handleSubmit = ({
  e,
  addComment,
  content,
  setError,
  postId,
  setContent
}) => {
  e.preventDefault()
  if (!content) return setError('Comment can not be blank')
  addComment(content, postId)
  setContent('')
  setTimeout(() => window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight), 100)
}

const CreateComment = ({
  postTitle,
  addComment,
  isLoggedIn,
  isUserFetchComplete,
  dispatch,
  errors: serverError,
  errors,
  isFetching,
  postId,
}) => {
  const [content, setContent] = useState('')
  const [error, setError] = useState('')

  return (
    <section className="create-comment">
      {isLoggedIn ? (
        <form onSubmit={(e) => handleSubmit({ e, addComment, content, setError, postId, setContent })}>
          {!isFetching && !!error && <Error error={error} />}
          <h3>Leave a comment:</h3>
          <textarea value={content} type="text" placeholder={`Ask about the ${postTitle}`} onChange={e => setContent(e.target.value)} required />
          <section className="create-comment__send-container">
            <button className="create-comment__btn" type="submit">
              Send
            </button>
          </section>
          {!isFetching && !!serverError && <Error error={serverError} />}
        </form>
      ): (
        isUserFetchComplete && <p className="create-comment__login"><Link to="/login">Login</Link> to leave a comment.</p>
      ) }
    </section>
  )
}

const mapStateToProps = ({
  comments: {
    isFetching,
    isFetchComplete,
    errors,
  },
}) => ({
  isFetching,
  isFetchComplete,
  errors,
})

export default connect(mapStateToProps)(CreateComment)
