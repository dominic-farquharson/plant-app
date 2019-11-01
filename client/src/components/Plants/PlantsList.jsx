import React from 'react'
import { Link } from 'react-router-dom'
import Plant from './Plant'
import './PlantsList.scss'

const PlantsList = ({
  plants,
  profile,
  users,
  favoritePlant,
}) => (
  <section className="plants-list">
    {!!profile && <Link to="/plants/new" className="plants-list__create">Create a plant</Link>}
    <ul>
      {plants.map(plant => (
        <li>
          <Plant
            {...plant}
            users={users}
            profile={profile}
            favoritePlant={() => favoritePlant(plant.id)}
          />
        </li>
      ))}
    </ul>
  </section>
)

export default PlantsList
