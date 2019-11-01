import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import Plant from '../components/Plants/Plant'
import Loading from '../components/util/Loading'
import { fetchPlant, favoritePlant, deletePlant } from '../redux/actions/plants'
import NotFound from '../components/NotFound/NotFound'
import ViewPlantHeading from '../components/Plants/ViewPlantHeading'
import EditPlant from '../components/Plants/EditPlant'
import Error from '../components/util/Error'
import { createComment } from '../redux/actions/comments'

const ViewPlant = ({
  dispatch,
  error,
  isFetchComplete,
  plant,
  profile,
  isUserFetchComplete,
  isEditPlant,
  users,
}) => {
  const { id } = useParams()
  useEffect(() => {
    dispatch(fetchPlant(id))
  }, [])
  if (!isFetchComplete) return <Loading />
  if (error) return <Error error={error} />
  if (!plant) return <NotFound />
  if (isEditPlant) return <EditPlant {...plant} profile={profile} isUserFetchComplete={isUserFetchComplete} />
  return (
    <>
      <ViewPlantHeading />
      <Plant
        {...plant}
        isViewPlant
        profile={profile}
        isUserFetchComplete={isUserFetchComplete}
        addComment={(content, postId) => dispatch(createComment({ content, postId }))}
        favoritePlant={plantId => dispatch(favoritePlant(plantId))}
        deletePlant={plantId => dispatch(deletePlant(plantId))}
        users={users}
      />
    </>
  )
}

const mapStateToProps = ({
  plants: {
    viewPlant: {
      error,
      isFetchComplete,
      plant,
    }
  },
  user: {
    profile,
    isUserFetchComplete,
    users,
  },
}) => ({ plant, isFetchComplete, error, profile, isUserFetchComplete, users })

export default connect(mapStateToProps)(ViewPlant)
