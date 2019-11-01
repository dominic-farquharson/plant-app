import React, { Component }from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import Error from '../components/util/Error'
import { login } from '../redux/actions/user'
import './Login.scss'
import { userSchema } from '../utils'

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {},
  }

  componentDidUpdate(prevProps) {
    const { profile, isUserFetchComplete, history } = this.props
    if (!prevProps.isUserFetchComplete && isUserFetchComplete && profile) {
      history.push('/')
    }
  }

  handleChange = ({
    target: {
      name,
      value,
    }
  }) => this.setState({ [name]: value})

  handleSubmit = async e => {
    e.preventDefault()
    this.setState({ errors: {}, error: '' }, async () => {
      try {
        const {
          email,
          password
        } = this.state
        const body = {
          email,
          password,
        }

        await userSchema.validate(body, { abortEarly: false })

        const { dispatch } = this.props
        await dispatch(login(body))
        this.props.history.push('/')
      } catch (e) {
        if (e.name == 'ValidationError') {
          const errorObject = e.errors.reduce((prev, curr) => {
            const { code, error } = curr
            prev[code] = error
            return prev
          }, {})
          return this.setState({ errors: errorObject})
        }
        console.error({ e })
        this.setState({ error: 'Invalid email or password'})
      }
    })
  }

  render() {
    const { errors, error } = this.state
    const { isUserFetching } = this.props
    const isEmailInvalid = errors.email
    const isPasswordInvalid = errors.password

    return (
      <form className="login" onSubmit={this.handleSubmit}>
        <h1>Welcome back.</h1>
        {error && <Error error={error} />}
        {isEmailInvalid && <Error error={errors.email} />}
        <input type="text" name="email" onChange={this.handleChange} placeholder="Email" />
        {isPasswordInvalid && <Error error={errors.password} />}
        <input type="password" name="password" placeholder="Password" onChange={this.handleChange}  />
        <button type="submit">Login</button>
        <p className="cta">Not a member? <Link to="/register">Sign up</Link> now.</p>
      </form>
    )
  }
}

const mapStateToProps = ({
  user: {
    isUserFetchComplete,
    isUserFetching,
    profile,
    errors: fetchErrors,
  },
}) => ({
  isUserFetchComplete,
  isUserFetching,
  profile,
  fetchErrors,
})

export default withRouter(connect(mapStateToProps)(Login))
