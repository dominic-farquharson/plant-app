import React from 'react'
import { withRouter } from "react-router"
import './ViewPlantHeading.scss'

const ViewPlantHeading = ({
  history,
}) => (
  <header className="view-plant-heading">
    <h1>
      <button type="button" onClick={() => history.push('/')}>
        <i
          className="back-button fa fa-chevron-left fa-3x"
          aria-label="Return to home page"
        />
      </button>
      <span>Big Plants</span>
    </h1>
  </header>
)

export default withRouter(ViewPlantHeading)
