import * as types from '../../constants/actions'
import { getJWT } from '../../utils'


export const fetchPlantsRequest = () => ({
  type: types.FETCH_PLANTS,
})

export const fetchPlantsSuccess = plants => ({
  type: types.FETCH_PLANTS_SUCCESS,
  payload: { plants }
})

export const fetchPlantsFailure = error => ({
  type: types.FETCH_PLANTS_FAILURE,
  payload: { error }
})

export const fetchPlants = () => async dispatch => {
  dispatch(fetchPlantsRequest())
  try {
    const req = await fetch('/api/plants')
    const res = await req.json()
    dispatch(fetchPlantsSuccess(res.plants))
  } catch (err) {
    console.error(err)
    dispatch(fetchPlantsFailure('Error fetching plants'))
  }
}

export const fetchPlantRequest = () => ({
  type: types.FETCH_PLANT,
})

export const fetchPlantSuccess = plant => ({
  type: types.FETCH_PLANT_SUCCESS,
  payload: { plant }
})

export const fetchPlantFailure = error => ({
  type: types.FETCH_PLANT_FAILURE,
  payload: { error }
})

export const fetchPlant = (id) => async dispatch => {
  dispatch(fetchPlantRequest())
  try {
    const req = await fetch(`/api/plants/${id}`)
    const res = await req.json()
    dispatch(fetchPlantSuccess(res.plant))
  } catch (err) {
    console.error(err)
    dispatch(fetchPlantFailure('Error fetching plants'))
  }
}

export const addPlant = plant => ({
  type: types.ADD_PLANT,
  payload: { plant }
})

export const removePlant = plantId => ({
  type: types.REMOVE_PLANT,
  payload: { plantId }
})

export const updatePlant = (plant, plantId) => ({
  type: types.UPDATE_PLANT,
  payload: { plant, plantId }
})

export const createPlant = body => async dispatch => {
  try {
    const req = await fetch('/api/plants', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${getJWT()}`,
      }
    })
    const { plant, success, errors } = await req.json()
    if (!success) throw new Error(errors)
    dispatch(addPlant(plant))
    return plant.id
  } catch (err) {
    console.error(err)
    dispatch(fetchPlantFailure('Error creating plant'))
    throw err
  }
}

export const favoritePlant = plantId => async dispatch => {
  try {
    const req = await fetch('/api/plants/favorite', {
      method: 'PUT',
      body: JSON.stringify({
        plantId,
      }),
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${getJWT()}`,
      }
    })
    const { plant, success, error } = await req.json()
    if (!success) throw new Error(error)
    dispatch(updatePlant(plant, plantId))
    return plant.id
  } catch (err) {
    console.error(err)
    alert(err)
  }
}

export const deletePlant = plantId => async dispatch => {
  try {
    const req = await fetch(`/api/plants/${plantId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${getJWT()}`,
      }
    })
    const { success, error } = await req.json()
    if (!success) throw new Error(error)
    dispatch(removePlant(plantId))
    return true
  } catch (err) {
    console.error(err)
    alert(err)
    return false
  }
}


export const editPlant = (body, plantId) => async dispatch => {
  try {
    const req = await fetch(`/api/plants/${plantId}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${getJWT()}`,
      }
    })
    const { plant, success, error } = await req.json()
    if (!success) throw new Error(error)
    dispatch(updatePlant(plant))
    return plant.id
  } catch (err) {
    console.error(err)
    // alert(err)
    throw err
  }
}
