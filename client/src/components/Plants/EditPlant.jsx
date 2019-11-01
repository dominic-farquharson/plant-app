import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Loading from '../util/Loading'
import Error from '../util/Error'
import { editPlant } from '../../redux/actions/plants'
import { plantInputs as inputs, plantSchema } from '../../utils'

class EditPlant extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: props.title,
      description: props.description,
      imageUrl: props.imageUrl,
      errors: {},
      serverError: '',
    }
  }
  componentDidMount() {
    const { creatorId, profile, history } = this.props
    if (profile && creatorId !== profile.id) {
      history.push('/')
    }
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

        const { dispatch, history, id } = this.props

        const plantId = await dispatch(editPlant(body, id))
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
          serverError: 'Error updating plant'
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
        <input type={type} name={name} value={this.state[name]} placeholder={placeHolder} onChange={this.handleChange} />
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
        <h2 className="create-plant__heading">Edit plant</h2>
        {this.renderInputs()}
        <button type="submit">Edit</button>
        {!!serverError && <Error error={serverError} />}
      </form>
    )
  }
}

export default withRouter(connect()(EditPlant))
