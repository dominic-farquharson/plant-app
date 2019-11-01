import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchComments, deleteComment, editComment } from '../../redux/actions/comments'
import Comment from './Comment'
import Loading from '../util/Loading'
import './Comments.scss'

const Comments = ({
  postId ,
  isFetching,
  comments,
  dispatch,
  isUserFetchComplete,
  profile,
}) => {
  useEffect(() => {
    dispatch(fetchComments(postId))
  }, [])

  if (isFetching) return <Loading />
  return (
    <section className="comments-list">
      {!!comments.length && <h2 className="heading">Comments</h2>}
      <ul>
        {comments.map(comment => (
          <Comment {...comment} editComment={(content, commentId) => dispatch(editComment(content, commentId))}  isUserFetchComplete={isUserFetchComplete} profile={profile} deleteComment={id => dispatch(deleteComment(id))} />
        ))}
      </ul>
    </section>
  )
}

const mapStateToProps = ({
  comments: {
    isFetching,
    comments,
  },
  user: {
    isUserFetchComplete,
    profile,
  }
}) => ({
  comments,
  isFetching,
  isUserFetchComplete,
  profile,
})

export default connect(mapStateToProps)(Comments)
