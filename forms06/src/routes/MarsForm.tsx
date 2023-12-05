import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { marsActions, useAppDispatch } from '../store/MarsSlice'
import countries from '../utils/countries.json'

interface KeywordType {
  [key: string]: string
}

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required('Please, enter your name')
    .matches(/^[A-Z]/, 'First letter should be capitalized'),
  lastName: yup
    .string()
    .required('Please, enter your last name')
    .matches(/^[A-Z]/, 'First letter should be capitalized'),
  age: yup
    .number()
    .required('Please, enter your age')
    .positive('Please, enter a valid number')
    .integer('Please. enter a number'),
  email: yup.string().required('Please, enter your e-mail address').email(),
  password: yup
    .string()
    .required('Please, enter a password')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password should contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character',
    ),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
  gender: yup
    .string()
    .oneOf(['Male', 'Female'], 'Please, make your choice')
    .required('Please, make your choice'),
  termsAndConditions: yup
    .boolean()
    .oneOf([true], 'You must accept the terms and conditions')
    .required('You must accept the terms and conditions'),
  picture: yup
    .mixed<FileList>()
    .required('Please upload a picture')
    .test('fileSize', 'The file is too large', (_, { originalValue }) => {
      const file = originalValue[0]

      if (file) {
        return file.size <= 2000000
      }
    })
    .test(
      'type',
      'Only the following formats are accepted: .jpeg, .jpg, .png',
      (_, { originalValue }) => {
        const file = originalValue[0]

        if (file) {
          return ['image/jpg', 'image/jpeg', 'image/png'].includes(file.type)
        }
      },
    )
    .transform((value: FileList) => {
      if (value.length === 0) return value
      return URL.createObjectURL(value[0])
    }),

  country: yup.string().required('You should choose a country'),
})

export function MarsForm() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [errors, setErrors] = useState<Errors>({})

  const [_passwordSt, setPassword] = useState('')
  const [passwordStrength, setPasswordStrength] = useState(0)
  const firstName = useRef<HTMLInputElement>(null)
  const lastName = useRef<HTMLInputElement>(null)
  const age = useRef<HTMLInputElement>(null)
  const email = useRef<HTMLInputElement>(null)
  const password = useRef<HTMLInputElement>(null)
  const confirmPassword = useRef<HTMLInputElement>(null)
  const gender = useRef<HTMLInputElement>(null)
  const termsAndConditions = useRef<HTMLInputElement>(null)
  const picture = useRef<HTMLInputElement>(null)
  const country = useRef<HTMLSelectElement>(null)

  function handlePasswordChange(event: { target: { value: string } }) {
    const newPassword = event.target.value
    setPassword(newPassword)

    if (!newPassword) {
      setPasswordStrength(0)
      return
    }

    let strength = 0
    if (newPassword.length <= 2 && newPassword.length > 0) {
      strength = 1
    } else if (newPassword.length <= 4) {
      strength = 2
    } else if (newPassword.length <= 6) {
      strength = 3
    } else if (newPassword.length === 7) {
      strength = 4
    } else if (newPassword.length > 7) {
      strength = 5
    }

    setPasswordStrength(strength)
  }
  const keywords: KeywordType = {
    0: '',
    1: 'Very weak',
    2: 'Weak',
    3: 'Medium',
    4: 'Strong',
    5: 'Very Strong',
  }

  const keyword = keywords[passwordStrength]

  const onSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    const values = {
      firstName: firstName.current?.value,
      lastName: lastName.current?.value,
      age: age.current?.value,
      email: email.current?.value,
      password: password.current?.value,
      confirmPassword: confirmPassword.current?.value,
      gender: gender.current?.value,
      termsAndConditions: termsAndConditions.current?.checked,
      picture: picture.current?.files,
      country: country.current?.value,
    }

    try {
      const _values = await schema.validate(values, {
        abortEarly: false,
      })
      console.log(_values)
      dispatch(marsActions.setMarsState(_values))
      dispatch(marsActions.setMarsTilesNumber(1))
      navigate('/')
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errors = error.inner.reduce<Record<string, string>>(
          (acc, cur) => {
            if (cur.path) {
              const key = cur.path
              acc[key] = cur.message
            }
            return acc
          },
          {},
        )

        setErrors(errors)
      }
    }
  }
  return (
    <div className="mars">
      <form onSubmit={onSubmit} className="moon-form">
        <input ref={firstName} placeholder="First Name" />
        {errors.firstName && (
          <p className="errorFieldMars">{errors.firstName}</p>
        )}
        <input ref={lastName} placeholder="Last Name" />
        {errors.lastName && <p className="errorFieldMars">{errors.lastName}</p>}
        <input type="number" ref={age} placeholder="Age" />
        {errors.age && <p className="errorFieldMars">{errors.age}</p>}
        <input ref={email} placeholder="E-mail" />
        {errors.email && <p className="errorFieldMars">{errors.email}</p>}
        <input
          ref={password}
          type="password"
          placeholder="Password"
          onChange={handlePasswordChange}
        />

        {Boolean(passwordStrength) && (
          <>
            <div className="password-strength-indicator">
              {Array.from({ length: 15 }).map((_, i) => {
                return _passwordSt.length > i ? (
                  <div key={i} className="cell" />
                ) : null
              })}
            </div>
            <div className="password-strength">
              Password strength: {keyword}
            </div>
          </>
        )}
        {errors.password && <p className="errorFieldMars">{errors.password}</p>}
        <input
          ref={confirmPassword}
          type="password"
          placeholder="Confirm Password"
        />
        {errors.confirmPassword && (
          <p className="errorFieldMars">{errors.confirmPassword}</p>
        )}
        <div className="radio-buttons">
          <input
            type="radio"
            id="male"
            name="gender"
            value="Male"
            ref={gender}
            className="radioButton"
          />
          {errors.gender && <p>{errors.gender}</p>}
          <label htmlFor="male">Male</label>

          <input
            type="radio"
            id="female"
            name="gender"
            value="Female"
            ref={gender}
            className="radioButton"
          />
          {errors.gender && <p className="errorFieldMars">{errors.gender}</p>}
          <label htmlFor="female">Female</label>
        </div>
        <label>
          <input
            type="checkbox"
            ref={termsAndConditions}
            className="radioButton"
          />
          I accept the terms and conditions
        </label>
        {errors.termsAndConditions && (
          <p className="errorFieldMars">
            You must accept the Terms and Conditions
          </p>
        )}

        <input type="file" ref={picture} placeholder="Picture" />
        {errors.picture && (
          <p className="errorFieldMars">Please, upload a picture</p>
        )}
        <select name="country" ref={country}>
          <option value="">Select the country</option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
        {errors.country && (
          <p className="errorFieldMars">Please select your country</p>
        )}
        <input type="submit" className="submitButton" />
      </form>
    </div>
  )
}

interface Errors {
  firstName?: string
  lastName?: string
  age?: string
  email?: string
  password?: string
  confirmPassword?: string
  gender?: string
  termsAndConditions?: string
  picture?: string
  country?: string
}
