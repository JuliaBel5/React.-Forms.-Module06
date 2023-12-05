/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import './Autocomplete.css'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { ControllerRenderProps } from 'react-hook-form'
import { FormValues } from '../routes/MoonForm'
import countries from '../utils/countries.json'

type UseOutsideClick = (callback: () => void) => {
  refOutsideElement: React.RefObject<HTMLDivElement>
}

const useOutsideClick: UseOutsideClick = (callback) => {
  const refOutsideElement = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        refOutsideElement.current &&
        !refOutsideElement.current.contains(event.target as Node)
      ) {
        callback()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [refOutsideElement, callback])

  return { refOutsideElement }
}

const countryNames = countries.map((country) => country.name)

export const Select = ({
  onChange,
  value: selectedValue,
}: ControllerRenderProps<FormValues, 'country'>) => {
  const [show, setShow] = useState<boolean>(false)
  const [value, setValue] = useState<string>(selectedValue)

  const { refOutsideElement } = useOutsideClick(() => setShow(false))

  const filtred = useMemo(() => {
    if (!value) return countryNames

    return countryNames.filter((item) =>
      item.toLowerCase().includes(value.toLocaleLowerCase()),
    )
  }, [value])

  return (
    <div ref={refOutsideElement} className="autocomplete">
      <input
        className="select"
        type="text"
        value={value}
        onFocus={() => setShow(true)}
        onChange={(event) => {
          setValue(event.target.value)
          onChange(event)
        }}
      />
      {show &&
        (filtred.length > 0 ? (
          <ul>
            {filtred.map((item) => {
              return (
                <li
                  key={item}
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    onChange(item)
                    setValue(item)
                    setShow(false)
                  }}
                >
                  {item}
                </li>
              )
            })}
          </ul>
        ) : (
          <div>country not in list</div>
        ))}
    </div>
  )
}
