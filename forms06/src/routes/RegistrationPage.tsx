import { Link } from "react-router-dom";

export const RegistrationPage = () => {
  return (
   
   <div className="wrapper">
     <h1>Welcome to the registration page!</h1>
     <h2> Where would you like to go?</h2>
     <div className="buttons">
    <Link to="/moon"> <button className="moonButton"><div className="moonIcon"/><div className="button-text">I want to go to the Moon</div></button></Link>
    <Link to="/mars"><button className="marsButton"><div className="marsIcon"/><div className="button-text">I want to go to Mars</div></button></Link>
    
   
   </div>
   </div>
  );
}