import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import Error from '../components/util/Error'
import { register } from '../redux/actions/user'
import {
  registerUserSchema as userSchema,
  registerInputs as inputs,
} from '../utils'
import './Register.scss'

class RegisterContainer extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    errors: {},
    error: '', // rename serverError
  }

  componentDidUpdate(prevProps) {
    const { profile, isUserFetchComplete, history } = this.props
    if (!prevProps.isUserFetchComplete && isUserFetchComplete && profile) {
      history.push('/')
    }
  }

  handleSubmit = async e => {
    e.preventDefault()
    this.setState(
      {
        errors: {},
        error: '',
      },
      async () => {
        try {
          const { errors, error, ...body } = this.state

          await userSchema.validate(body, { abortEarly: false })

          const { dispatch } = this.props
          await dispatch(register(body))
          this.props.history.push('/')
        } catch (e) {
          if (e.name == 'ValidationError') {
            const errorObject = e.errors.reduce((prev, curr) => {
              const { code, error } = curr
              prev[code] = error
              return prev
            }, {})
            return this.setState({ errors: errorObject })
          }
          const error =
            (Array.isArray(e) && e[0].error) || 'Error registering user'
          console.error({ e })
          this.setState({ error })
        }
      },
    )
  }

  handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value })

  renderInputs = () =>
    inputs.map(({ type, name, placeHolder }) => {
      const { errors } = this.state
      const error = errors[name]
      return (
        <>
          {!!error && <Error error={error} />}
          <input
            type={type}
            name={name}
            placeholder={placeHolder}
            onChange={this.handleChange}
          />
        </>
      )
    })

  render() {
    const { isFetching } = this.props
    const { error } = this.state

    return (
      <form className="register" onSubmit={this.handleSubmit}>
        <h2>Create an account.</h2>
        {this.renderInputs()}
        {!!error && <Error error={error} />}
        <button type="submit" disabled={isFetching}>
          Register
        </button>
        <p className="cta">
          Already a member? <Link to="/login">Sign in</Link>.
        </p>
      </form>
    )
  }
}

const mapStateToProps = ({
  user: { isFetching, isUserFetchComplete, profile },
}) => ({
  isFetching,
  isUserFetchComplete,
  profile,
})

export default withRouter(connect(mapStateToProps)(RegisterContainer))
