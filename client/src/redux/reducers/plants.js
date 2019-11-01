import * as types from '../../constants/actions'

const initialState = {
  error: null,
  plants: [],
  isFetching: false,
  isFetchComplete: false,
  viewPlant: {
    isFetching: false,
    isFetchComplete: false,
    plant: null,
    error: null,
  },
}

const plants = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.FETCH_PLANT:
      return {
        ...state,
        viewPlant: {
          ...state.viewPlant,
          plant: null,
          isFetchComplete: false,
          isFetching: true,
          error: null,
        }
      }
    case types.FETCH_PLANT_SUCCESS:
      return {
        ...state,
        viewPlant: {
          ...state.viewPlant,
          plant: action.payload.plant,
          isFetchComplete: true,
          isFetching: false,
          error: null,
        }
      }
    case types.FETCH_PLANT_FAILURE:
      return {
        ...state,
        viewPlant: {
          ...state.viewPlant,
          isFetchComplete: true,
          isFetching: false,
          error: action.payload.error,
        }
      }
    case types.FETCH_PLANTS:
      return {
        ...state,
        isFetchComplete: false,
        isFetching: true,
        error: null,
      }
    case types.FETCH_PLANTS_SUCCESS:
      return {
        ...state,
        error: null,
        isFetchComplete: true,
        isFetching: false,
        plants: action.payload.plants,
      }
    case types.FETCH_PLANTS_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        isFetchComplete: true,
        isFetching: false,
      }
    case types.UPDATE_PLANT:
      return {
        ...state,
        plants: state.plants.map(plant => {
          if (plant.id === action.payload.plantId) {
            return {
              ...plant,
              ...action.payload.plant,
            }
          }
          return plant
        }),
        viewPlant: {
          ...state.viewPlant,
          plant: {
            ...state.viewPlant.plant,
            ...action.payload.plant,
          }
        }
      }
    case types.REMOVE_PLANT:
      return {
        ...state,
        plants: state.plants.filter(plant => plant !== action.payload.plantId),
      }
    default:
      return state
  }
}

export default plants
