import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PlantsList from '../components/Plants/PlantsList'
import Loading from '../components/util/Loading'
import { fetchPlants, favoritePlant } from '../redux/actions/plants'

const HomeContainer = ({
  plants,
  isFetchComplete,
  error,
  dispatch,
  profile,
  users,
}) => {
  useEffect(() => {
    dispatch(fetchPlants())
  }, [])

  console.log({ plants })

  if (!isFetchComplete) return <Loading />
  if (error) return <p>{error}</p>
  if (!plants.length) return 'there are no plants'

  return (
    <PlantsList
      favoritePlant={plantId => dispatch(favoritePlant(plantId, true))}
      plants={plants}
      users={users}
      profile={profile}
    />
  )
}

const mapStateToProps = ({
  plants: {
    plants,
    isFetchComplete,
    error,
  },
  user: {
    profile,
    users,
  }
}) => ({ plants, isFetchComplete, error, profile, users })

export default connect(mapStateToProps)(HomeContainer)
