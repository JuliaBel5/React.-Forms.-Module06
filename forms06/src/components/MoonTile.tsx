
export interface MoonState {
  length: number;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  termsAndConditions: boolean;
  country: string;
 }
 export interface TileProps {
  data: MoonState;
 }

 export const Tile = ({data, highlightedTile, index}: TileProps & {highlightedTile: number | null, index: number}) => {
  return (
    <div className={`tile ${index === highlightedTile ? 'highlighted' : ''}`}>
     <h2>Name: {data.firstName + ' ' + data.lastName}</h2>
     <p>Age: {data.age}</p>
     <p>Email: {data.email}</p>
     <p>Gender: {data.gender}</p>
     <p>Terms and Conditions: {data.termsAndConditions ? 'Accepted' : 'Not Accepted'}</p>
     <p>Country: {data.country}</p>
    
   </div>
  );
 }
 
