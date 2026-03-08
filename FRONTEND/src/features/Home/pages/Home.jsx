import React from 'react'
import FaceExpression from '../../Expression/pages/FaceExpression'
import Player from '../componets/Player'
import './Home.scss'

const Home = () => {
  return (
    <div className="home-layout">
      <div className="home-top">
        <FaceExpression />
      </div>
      <div className="home-bottom">
        <Player />
      </div>
    </div>
  )
}

export default Home