import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import Error from '../util/Error'
import Loading from '../util/Loading'
import { createPlant } from '../../redux/actions/plants'
import { plantInputs as inputs, plantSchema } from '../../utils'
import './CreatePlant.scss'

class CreatePlant extends Component {
  state = {
    title: '',
    description: '',
    imageUrl: '',
    errors: {},
    serverError: '',
  }

  componentDidUpdate(prevProps) {
    const { profile, isUserFetchComplete, history } = this.props
    if (!prevProps.isUserFetchComplete && isUserFetchComplete && !profile) {
      history.push('/login')
    }
  }

  handleChange = ({
    target: {
      name,
      value,
    }
  }) => this.setState({ [name]: value})

  handleSubmit = async (e) => {
    e.preventDefault()

    this.setState({
      errors: {},
      serverError: '',
    }, async () => {
      try {
        const { errors, serverError, ...body } = this.state

        await plantSchema.validate(body, { abortEarly: false })

        const { dispatch, history } = this.props

        const plantId = await dispatch(createPlant(body))
        history.push(`/plants/${plantId}`)
      } catch (e) {
        console.error(e)
        if (e.name == 'ValidationError') {
          const errorObject = e.errors.reduce((prev, curr) => {
            const { code, error } = curr
            prev[code] = error
            return prev
          }, {})
          return this.setState({ errors: errorObject})
        }
        this.setState({
          serverError: 'Error creating plant'
        })
      }
    })
  }

  renderInputs = () => {
    const { errors } = this.state
    return inputs.map(({
      type,
      name,
      placeHolder,
    }) => {
    const error = errors[name]
    return (
      <>
        {!!error && <Error error={error} />}
        <input type={type} name={name} placeholder={placeHolder} onChange={this.handleChange} />
      </>
    )
    })
  }

  render() {
    const { serverError } = this.state
    const { isUserFetchComplete } = this.props

    if (!isUserFetchComplete) return <Loading />
    return (
      <form className="create-plant" onSubmit={this.handleSubmit}>
        <h2 className="create-plant__heading">Create a plant</h2>
        {this.renderInputs()}
        <button type="submit">Create Plant</button>
        {!!serverError && <Error error={serverError} />}
      </form>
    )
  }
}

const mapStateToProps = ({
  user: {
    isUserFetchComplete,
    profile,
  },
}) => ({
  isUserFetchComplete,
  profile,
})

export default withRouter(connect(mapStateToProps)(CreatePlant))
