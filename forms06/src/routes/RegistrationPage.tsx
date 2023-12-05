import { Link } from 'react-router-dom'
import { MarsTile } from '../components/MarsTile'
import { MoonState, Tile } from '../components/MoonTile'
import { useAppSelector } from '../store/MarsSlice'

export const RegistrationPage = () => {
  const moonState = useAppSelector((state) => state.moon.moonData)
  const marsState = useAppSelector((state) => state.mars.marsData)
  const key = useAppSelector((state) => state.mars.marsTilesNumber)

  return (
    <div className="wrapper">
      <h1 className="main-title">Welcome to the registration page!</h1>
      <h2> Where would you like to go?</h2>
      <div className="buttons">
        <Link to="/moon">
          {' '}
          <button className="moonButton">
            <div className="moonIcon" />
            <div className="button-text">I want to go to the Moon</div>
          </button>
        </Link>
        <Link to="/mars">
          <button className="marsButton">
            <div className="marsIcon" />
            <div className="button-text">I want to go to Mars</div>
          </button>
        </Link>
      </div>
      <h2>Our passengers:</h2>
      <div className="tile-container">
        {key === 1 ? (
          <>
            {moonState.map((data: MoonState, index: number) => (
              <Tile key={index} data={data} />
            ))}
            {marsState.map((data: MoonState, index: number) => (
              <MarsTile key={index} data={data} />
            ))}
          </>
        ) : (
          <>
            {marsState.map((data: MoonState, index: number) => (
              <MarsTile key={index} data={data} />
            ))}
            {moonState.map((data: MoonState, index: number) => (
              <Tile key={index} data={data} />
            ))}
          </>
        )}
      </div>
    </div>
  )
}
