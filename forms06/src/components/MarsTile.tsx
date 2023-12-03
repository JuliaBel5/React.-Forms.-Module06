
export interface MoonState {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  termsAndConditions: boolean;
  picture: string;
  country: string;
}
export interface TileProps {
  data: MoonState;
}

export const MarsTile = ({ data }: TileProps) => {
  return (
    <div className="mars-tile">
      <div className="tile-title">{data.firstName + ' ' + data.lastName}</div>
      <div className="tile-subtitle">Destination: Mars</div>
      <div className="tile-line">
        <div >Age: {data.age}</div>
      </div>
      <img src={data.picture} className="tile-img" />
      <div className="tile-line">
        <div>Email: {data.email}</div>
        <div>Gender: {data.gender}</div>
        <div>Terms and Cond.: {data.termsAndConditions ? 'Ok' : 'No'}</div>
        <div>Country: {data.country}</div>
      </div>
    </div>
  );
}
