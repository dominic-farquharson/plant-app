const yup = require('yup')

const imagePattern = new RegExp('(http(s?):)|([/|.|w|s])*.(?:jpg|gif|jpeg|png)')

const errorCb = (code, error) => () => ({
  code,
  error,
})

const plantSchema = yup.object().shape({
  title: yup
    .string()
    .required(errorCb('INVALID_TITLE', 'Title is required'))
    .max(
      250,
      errorCb('INVALID_TITLE', 'Length must not exceed 250 characters'),
    ),
  description: yup
    .string()
    .required(errorCb('INVALID_DESCRIPTION', 'Description is required'))
    .max(
      500,
      errorCb('INVALID_DESCRIPTION', 'Length must not exceed 500 characters'),
    ),
  imageUrl: yup
    .string()
    .required(errorCb('INVALID_IMAGE', 'Image is required'))
    .matches(imagePattern, errorCb('INVALID_IMAGE', 'Image is not valid')),
})

const createCommentSchema = yup.object().shape({
  content: yup
    .string()
    .required(errorCb('INVALID_CONTENT', 'Content is required'))
    .max(
      500,
      errorCb('INVALID_CONTENT', 'Length must not exceed 500 characters'),
    ),
  creatorId: yup
    .number()
    .required(errorCb('INVALID_CREATOR_ID', 'Creator id is required')),
  postId: yup
    .number()
    .required(errorCb('INVALID_POST_ID', 'Post id is required')),
})

const updateCommentSchema = yup.object().shape({
  content: yup
    .string()
    .required(errorCb('INVALID_CONTENT', 'Content is required'))
    .max(
      500,
      errorCb('INVALID_Content', 'Length must not exceed 500 characters'),
    ),
})

const userSchema = yup.object().shape({
  firstName: yup
    .string()
    .required(errorCb('INVALID_FIRST_NAME', 'First name can not be blank')),
  lastName: yup
    .string()
    .required(errorCb('INVALID_LAST_NAME', 'Last name can not be blank')),
  email: yup
    .string()
    .email(errorCb('INVALID_EMAIL', 'Please enter a valid email address'))
    .required(errorCb('INVALID_EMAIL', 'Email can not be blank')),
  password: yup
    .string()
    .required(errorCb('INVALID_PASSWORD', 'Password is invalid'))
    .min(
      6,
      errorCb('INVALID_PASSWORD', 'Password must be at least 6 characters'),
    ),
})

const updateUserSchema = yup.object().shape({
  firstName: yup
    .string()
    .required(errorCb('INVALID_FIRST_NAME', 'First name can not be blank')),
  lastName: yup
    .string()
    .required(errorCb('INVALID_LAST_NAME', 'Last name can not be blank')),
})

module.exports = {
  plantSchema,
  createCommentSchema,
  updateCommentSchema,
  userSchema,
  updateUserSchema,
}
