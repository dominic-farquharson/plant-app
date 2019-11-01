import React, { useState } from 'react'

const Comment = ({
  content,
  createdAt,
  creatorId,
  id,
  User: user,
  profile,
  deleteComment,
  editComment,
}) => {
  const userId = profile && profile.id
  const firstName = user && user.firstName
  const lastName = user && user.lastName
  const isCreator = creatorId === userId
  const fullName = isCreator
    ? 'You'
    : `${firstName} ${lastName}`
  const dateObj = createdAt && new Date(createdAt)
  console.log({ createdAt, dateObj })
  const time = dateObj && dateObj.toLocaleTimeString()
  const date = dateObj && dateObj.toLocaleDateString()
  console.log({
    id,
  })

  const [editedContent, setEditedContent] = useState(content)
  const [displayEditComment, setDisplayEditComment] = useState(false)
  const toggleEditComment = () => setDisplayEditComment(!displayEditComment)

  if (displayEditComment) return (
    <li className="comment is-edit-comment">
      <textarea name="content" value={editedContent} onChange={e => setEditedContent(e.target.value)}>{content}</textarea>
      <button type="button" onClick={async () => {
        await editComment(editedContent, id)
        toggleEditComment()
      }}>Edit</button>
      <button type="button" onClick={toggleEditComment}>Cancel</button>
    </li>
  )

  return (
    <li className="comment">
      <p>
        <span className="comment__creator">{fullName}</span>{` `}
        <span className="comment__date">{date} {time}</span>
      </p>
      {content}
      <div className="comment__buttons">
        {isCreator && <i className="fa fa-pencil" onClick={toggleEditComment} />}
        {isCreator && <i className="fa fa-trash" onClick={async () => {
          const confirm = window.confirm('Are you sure you would like to delete this comment?')
          if (confirm) deleteComment(id)
        }} />}
      </div>
    </li>
  )
}

export default Comment
