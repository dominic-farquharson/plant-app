import * as yup from 'yup'

export const getJWT = () => localStorage.getItem('token')

export const errorCb = (code, error) => () => ({
  code,
  error,
})

export const imagePattern = new RegExp(
  '(http(s?):)|([/|.|w|s])*.(?:jpg|gif|jpeg|png)',
)

export const plantSchema = yup.object().shape({
  title: yup.string().required(errorCb('title', 'Title can not be blank')),
  description: yup
    .string()
    .required(errorCb('description', 'Description can not be blank')),
  imageUrl: yup
    .string()
    .matches(
      imagePattern,
      errorCb(
        'imageUrl',
        'Please enter a valid image url. Ex: https://www.flowerpicturegallery.com/d/3435-3/dark+orange+tulips+with+yellow+tone.jpg',
      ),
    )
    .required(errorCb('imageUrl', 'imageUrl can not be blank')),
})

export const userSchema = yup.object().shape({
  email: yup
    .string()
    .email(errorCb('email', 'Please enter a valid email address'))
    .required(errorCb('email', 'Email can not be blank')),
  password: yup
    .string()
    .required(errorCb('password', 'Password is invalid'))
    .min(6, errorCb('password', 'Password must be at least 6 characters')),
})

export const registerUserSchema = yup.object().shape({
  firstName: yup
    .string()
    .required(errorCb('firstName', 'First name can not be blank')),
  lastName: yup
    .string()
    .required(errorCb('lastName', 'Last name can not be blank')),
  email: yup
    .string()
    .email(errorCb('email', 'Please enter a valid email address'))
    .required(errorCb('email', 'Email can not be blank')),
  password: yup
    .string()
    .required(errorCb('password', 'Password is invalid'))
    .min(6, errorCb('password', 'Password must be at least 6 characters')),
})

export const plantInputs = [
  {
    type: 'text',
    name: 'title',
    placeHolder: 'Title',
  },
  {
    type: 'text',
    name: 'description',
    placeHolder: 'Description',
  },
  {
    type: 'tet',
    name: 'imageUrl',
    placeHolder: 'Image Url',
  },
]

export const registerInputs = [
  {
    type: 'text',
    name: 'firstName',
    placeHolder: 'First name',
  },
  {
    type: 'text',
    name: 'lastName',
    placeHolder: 'Last name',
  },
  {
    type: 'email',
    name: 'email',
    placeHolder: 'Email',
  },
  {
    type: 'password',
    name: 'password',
    placeHolder: 'Password',
  },
]
