import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { Select } from '../components/Autocomplete'
import { marsActions, useAppDispatch } from '../store/MarsSlice'
import { moonActions } from '../store/MoonSlice'

export interface FormValues {
  firstName: string
  lastName: string
  age: number
  email: string
  password: string
  confirmPassword: string
  gender: string
  termsAndConditions: boolean
  picture: FileList
  country: string
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
    .positive('Please, enter valid a number')
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
  gender: yup.string().required('Please, make your choice'),
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

export function MoonForm() {
  const dispatch = useAppDispatch()
  const [_passwordSt, setPassword] = useState('')
  const [passwordStrength, setPasswordStrength] = useState(0)
  function handlePasswordChange(event: { target: { value: string } }) {
    const newPassword = event.target.value
    setPassword(newPassword)

    let strength = 0
    if (newPassword.length <= 2 && newPassword.length > 0) {
      strength = 1
    } else if (newPassword.length <= 4) {
      strength = 2
    } else if (newPassword.length <= 6) {
      strength = 3
    } else if (newPassword.length === 7) {
      strength = 4
    } else {
      strength = 5
    }

    setPasswordStrength(strength)
  }
  const keyword =
    passwordStrength === 0
      ? ''
      : passwordStrength === 1
        ? 'Very weak'
        : passwordStrength === 2
          ? 'Weak'
          : passwordStrength === 3
            ? 'Medium'
            : passwordStrength === 4
              ? 'Strong'
              : 'Very Strong'

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  })
  const navigate = useNavigate()

  const onSubmit = (data: FormValues) => {
    console.log(data)
    dispatch(moonActions.setMoonState(data))
    dispatch(marsActions.setMarsTilesNumber(0))
    navigate('/')
  }

  return (
    <div className="moon">
      <form onSubmit={handleSubmit(onSubmit)} className="moon-form">
        <input
          {...register('firstName', { required: true })}
          placeholder="First Name"
        />
        {errors.firstName && (
          <p className="errorField">First Name is required</p>
        )}

        <input
          {...register('lastName', { required: true })}
          placeholder="Last Name"
        />
        {errors.lastName && <p className="errorField">Last Name is required</p>}

        <input
          type="number"
          {...register('age', { required: true, valueAsNumber: true })}
          placeholder="Age"
        />
        {errors.age && <p className="errorField">Age is required</p>}
        <input {...register('email')} placeholder="Email" />
        {errors.email && <p className="errorField">Email is invalid</p>}

        <input
          {...register('password')}
          type="password"
          placeholder="Password"
          onChange={handlePasswordChange}
        />
        <div className="password-strength-indicator">
          {Array.from({ length: 8 }).map((_, i) => {
            return _passwordSt.length > i ? (
              <div key={i} className="cell" />
            ) : null
          })}
        </div>
        <div className="password-strength">Password strength: {keyword}</div>
        {errors.password && (
          <p className="errorField">Please, enter a valid password</p>
        )}

        <input
          {...register('confirmPassword')}
          type="password"
          placeholder="Confirm Password"
        />
        {errors.confirmPassword && (
          <p className="errorField">Passwords must match</p>
        )}
        <div className="radio-buttons">
          <label>
            <input
              {...register('gender')}
              type="radio"
              value="male"
              className="radioButton"
            />{' '}
            Male
          </label>
          <label>
            <input
              {...register('gender')}
              type="radio"
              value="female"
              className="radioButton"
            />{' '}
            Female
          </label>
          {errors.gender && (
            <p className="errorField">Please select your gender</p>
          )}
        </div>
        <label>
          <input
            {...register('termsAndConditions')}
            type="checkbox"
            className="radioButton"
          />{' '}
          I accept the terms and conditions
        </label>
        {errors.termsAndConditions && (
          <p className="errorField">You must accept the terms and conditions</p>
        )}
        <input type="file" {...register('picture')} />
        {errors.picture && (
          <p className="errorField">{errors.picture.message}</p>
        )}

        <Controller<FormValues, 'country'>
          render={({ field }) => {
            return <Select {...field} />
          }}
          name="country"
          control={control}
        />
        {errors.country && (
          <p className="errorField">{errors.country.message}</p>
        )}

        {/* <select
          {...register('country', { required: 'You should choose a country' })}
        >
          <option value="">Select the country</option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
        {errors.country && (
          <p className="errorField">{errors.country.message}</p>
        )}*/}
        <button
          type="submit"
          disabled={!isDirty || !isValid}
          className="submitButton"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default MoonForm
