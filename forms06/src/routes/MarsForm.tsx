import { useRef, useState } from 'react';
import * as yup from 'yup';
import { marsActions } from '../store/MarsSlice';
import countries from '../utils/countries.json';
import { useAppDispatch } from '../store/MarsSlice';
import { useNavigate } from 'react-router-dom';



const schema = yup.object().shape({
  firstName: yup.string().required().matches(/^[A-Z]/, 'First letter should be capitalized'),
  lastName: yup.string().required().matches(/^[A-Z]/, 'First letter should be capitalized'),
  age: yup.number().required().positive().integer(),
  email: yup.string().required().email(),
  password: yup.string().required().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password should contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Confirm Password is required'),
  gender: yup.string().required(),
  termsAndConditions: yup.boolean().oneOf([true], 'You must accept the terms and conditions').required('You must accept the terms and conditions'),
  picture: yup
    .mixed<FileList>()
    .required("Please upload a picture")
    /*.transform((value: FileList) => {
      if (!value.length) return value
      return URL.createObjectURL(value[0]);
    }),*/,
  country: yup.string().required('You should choose a country'),
});

export function MarsForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [errors, setErrors] = useState<Errors>({});

  const firstName = useRef<HTMLInputElement>(null);
  const lastName = useRef<HTMLInputElement>(null);
  const age = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);
  const gender = useRef<HTMLInputElement>(null);
  const termsAndConditions = useRef<HTMLInputElement>(null);
  const picture = useRef<HTMLInputElement>(null);
  const country = useRef<HTMLSelectElement>(null);




  const onSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    /*const formData = new FormData();

    if (firstName.current?.value) {
      formData.append('firstName', firstName.current.value);
    }
    if (lastName.current?.value) {
      formData.append('lastName', lastName.current.value);
    }
    if (age.current?.value) {
      formData.append('age', age.current.value);
    }
    if (email.current?.value) {
      formData.append('email', email.current.value);
    }
    if (password.current?.value) {
      formData.append('password', password.current.value);
    }
    if (confirmPassword.current?.value) {
      formData.append('confirmPassword', confirmPassword.current.value);
    }
    if (gender.current?.value) {
      formData.append('gender', gender.current.value);
    }

    if (termsAndConditions.current?.checked) {
      formData.append('termsAndConditions', termsAndConditions.current.checked.toString());
    }
    if (picture.current?.files?.[0]) {
      formData.append('picture', picture.current.files[0]);
    }
    if (country.current?.value) {
      formData.append('country', country.current.value);
    }

    // Convert FormData to a plain object
    const values = Object.fromEntries(formData.entries());*/




    const values = {
      firstName: firstName.current?.value,
      lastName: lastName.current?.value,
      age: age.current?.value,
      email: email.current?.value,
      password: password.current?.value,
      confirmPassword: confirmPassword.current?.value,
      gender: gender.current?.value,
      termsAndConditions: termsAndConditions.current?.checked,
      picture: URL.createObjectURL(picture.current?.files?.[0] ?? new File(["ellie"], "ellie.png")),
      country: country.current?.value,
    };



    schema
      .validate(values)
      .then(() => {
        dispatch(marsActions.setMarsState(values));
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setErrors(error.inner.reduce((errors: Errors, err: yup.ValidationError) => {
          if (err.path !== undefined) {
            errors[err.path as keyof Errors] = err.message;
          }
          return errors;
        }, {} as Errors));
      });
  };

  return (
    <div className="mars">
      <form onSubmit={onSubmit} className="moon-form">
        <input ref={firstName} placeholder="First Name" />
        {errors.firstName && <p>{errors.firstName}</p>}
        <input ref={lastName} placeholder="Last Name" />
        {errors.lastName && <p>{errors.lastName}</p>}
        <input type="number" ref={age} placeholder="Age" />
        {errors.age && <p>{errors.age}</p>}
        <input ref={email} placeholder="E-mail" />
        {errors.email && <p>{errors.email}</p>}
        <input ref={password} type="password" placeholder="Password" />
        {errors.password && <p>{errors.password}</p>}
        <input ref={confirmPassword} type="password" placeholder="Confirm Password" />
        {errors.confirmPassword && <p>The password should match</p>}
        <div>
          <input
            type="radio"
            id="male"
            name="gender"
            value="Male"
            ref={gender}
          />
          {errors.gender && <p>{errors.gender}</p>}
          <label htmlFor="male">Male</label>

          <input
            type="radio"
            id="female"
            name="gender"
            value="Female"
            ref={gender}
          />
          {errors.gender && <p>{errors.gender}</p>}
          <label htmlFor="female">Female</label>
        </div>
        <label>
          <input type="checkbox" ref={termsAndConditions} />
          I accept the terms and conditions
        </label>
        {errors.termsAndConditions && <p>You must accept the Terms and Conditions</p>}

        <input type="file" ref={picture} placeholder="Picture" />
        {errors.picture && <p className="errorField">Please, upload a picture</p>}
        <select name="country" ref={country}>
          <option value="">Select the country</option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>{country.name}</option>
          ))}
        </select>
        {errors.country && <p className="errorField">Please select your country</p>}
        <input type="submit" className="submitButton" />
      </form>
    </div>
  );
}

interface Errors {
  firstName?: string;
  lastName?: string;
  age?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  gender?: string;
  termsAndConditions?: string;
  picture?: string;
  country?: string;
}