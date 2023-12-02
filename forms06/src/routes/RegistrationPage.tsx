import { Link } from "react-router-dom";
import {  MoonState, Tile } from "../components/MoonTile";
//import { useEffect } from "react";
import {  useAppSelector } from "../store/MarsSlice";
// import { moonActions } from "../store/MoonSlice";
// import { useState } from "react";

export const RegistrationPage = () => {

   
   const moonState = useAppSelector((state) => state.moon.moonData);
   // const moonTilesNumber = useAppSelector((state) => state.moon.moonTilesNumber);
  // const dispatch = useAppDispatch()
   console.log(1, moonState)
   



 // moonTilesNumber === moonState.length ? dispatch(moonActions.setMoonTilesNumber(moonTilesNumber+1)) : moonTilesNumber + 0



   
  return (
   
   <div className="wrapper">
     <h1>Welcome to the registration page!</h1>
     <h2> Where would you like to go?</h2>
     <div className="buttons">
    <Link to="/moon"> <button className="moonButton"><div className="moonIcon"/><div className="button-text">I want to go to the Moon</div></button></Link>
    <Link to="/mars"><button className="marsButton"><div className="marsIcon"/><div className="button-text">I want to go to Mars</div></button></Link>
    
   
   </div>
   <div className="tile-container">
   {moonState.map((data: MoonState, index: number) => (
       <Tile key={index} data={data}  />
    ))}
    </div>
   </div>
  );
}