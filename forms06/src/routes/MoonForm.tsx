import * as yup from 'yup';
//import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { moonActions } from '../store/MoonSlice';
import countries from '../utils/countries.json';
//import { Link } from 'react-router-dom';
import { useAppDispatch } from '../store/MarsSlice';
import { useNavigate } from 'react-router-dom';



type FormValues = {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
 termsAndConditions: boolean;
 // picture: FileList;
  country: string;
 };

const schema = yup.object().shape({
  firstName: yup.string().required().matches(/^[A-Z]/, 'First letter should be capitalized'),
  lastName: yup.string().required().matches(/^[A-Z]/, 'First letter should be capitalized'),
  age: yup.number().required().positive().integer(),
  email: yup.string().required().email(),
 password: yup.string().required().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password should contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character'),
 confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Confirm Password is required'),
  gender: yup.string().required(),
  termsAndConditions: yup.boolean().oneOf([true], 'You must accept the terms and conditions').required('You must accept the terms and conditions'),
 // picture: yup.mixed().required('Please upload a picture'),
   country: yup.string().required(),
});


export function MoonForm() {
  const dispatch = useAppDispatch()
  const { register, handleSubmit, formState: { errors, isDirty, isValid }} = useForm<FormValues>({ resolver: yupResolver(schema) });
  
 const navigate = useNavigate();
 
  //const onFileChange = (_event: React.ChangeEvent<HTMLInputElement>) => {
    const onSubmit = (data: FormValues) => {
      console.log(data)
      dispatch(moonActions.setMoonState(data));
    
     /* dispatch(moonActions.setLastName(data.lastName));
      dispatch(moonActions.setAge(data.age));
      dispatch(moonActions.setEmail(data.email));
      dispatch(moonActions.setPassword(data.password));
      dispatch(moonActions.setConfirmPassword(data.confirmPassword));
      dispatch(moonActions.setTermsAndConditions(data.termsAndConditions));
      dispatch(moonActions.setGender(data.gender));
      dispatch(moonActions.setCountry(data.country));*/
      setTimeout(() => {
        navigate("/");
      }, 2000);
      
    };
 
  return (
    <div className="moon">
      <form onSubmit={handleSubmit(onSubmit)} className="moon-form">
      <input {...register("firstName", { required: true })} placeholder="First Name" />
       {errors.firstName && <p>First Name is required</p>}
  
       <input {...register("lastName", { required: true })} placeholder="Last Name" />
       {errors.lastName && <p>Last Name is required</p>}
  
       <input {...register("age", { required: true, valueAsNumber: true })} placeholder="Age" />
       {errors.age && <p>Age is required</p>}
        <input {...register("email")} placeholder="Email" />
        {errors.email && <p>Email is invalid</p>}
 
        <input {...register("password")} type="password" placeholder="Password" />
        {errors.password && <p>{errors.password.message}</p>}
 
        <input {...register("confirmPassword")} type="password" placeholder="Confirm Password" />
        {errors.confirmPassword && <p>Passwords must match</p>}
 
        <label>
          <input {...register("gender")} type="radio" value="male" /> Male
        </label>
        <label>
          <input {...register("gender")} type="radio" value="female" /> Female
        </label>
        {errors.gender && <p>Please select your gender</p>}
 
        <label>
          <input {...register("termsAndConditions")} type="checkbox" /> I accept the terms and conditions
        </label>
        {errors.termsAndConditions && <p>You must accept the terms and conditions</p>}
 
       {/* <input type="file" onChange={onFileChange} />
        {errors.picture && <p>{errors.picture.message}</p>}*/}
 
 <select {...register("country")}>
 <option value="">Select country</option>
 {countries.map((country) => (
   <option key={country.code} value={country.code}>
     {country.name}
   </option>
 ))}
</select>
        {errors.country && <p>Please select your country</p>}
 
     
 <button type="submit" disabled={!isDirty || !isValid} className="submitButton">Submit</button>

      </form>
    </div>
  );
 }
export default MoonForm;


