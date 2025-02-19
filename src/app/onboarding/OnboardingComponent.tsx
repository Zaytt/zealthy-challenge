'use client'

import { UserData } from '@/types/UserData.type'
import { UserState, useUserStore } from '@/store/UserStore'

interface OnboardingComponentProps {
  type: 'datepicker' | 'textfield' | 'textarea' | 'password'
  id: string
  name: keyof UserData // This will ensure name matches user data fields
  label?: string
}

export default function OnboardingComponent({ type, id, name, label }: OnboardingComponentProps) {
  const value = useUserStore(state => state[name])
  const setterName = `set${name.charAt(0).toUpperCase() + name.slice(1)}`
  const setValue = useUserStore(state => {
    const setter = state[setterName as keyof UserState] as (value: string) => void
    if (typeof setter === 'function') {
      return setter
    }
    throw new Error(`Setter ${setterName} is not a function`)
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value)
  }

  const baseInputStyles =
    'w-full py-2 pl-4 border-2 border-[#1b1b1b] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00531b] focus:border-[#00531b] transition-all' +
    ' required:border-red-500 required:border-2'
  const labelStyles =
    'block text-left mb-2 font-medium text-[#1b1b1b] after:content-["*"] after:ml-0.5 after:text-red-500'
  const formFieldStyles = 'w-full max-w-md mb-4'

  switch (type) {
    case 'datepicker':
      return (
        <div className={formFieldStyles}>
          {label && (
            <label htmlFor={id} className={labelStyles}>
              {label}
            </label>
          )}
          <input
            required
            type="date"
            id={id}
            name={name}
            value={value || ''}
            onChange={handleChange}
            className={baseInputStyles}
          />
        </div>
      )

    case 'textarea':
      return (
        <div className={formFieldStyles}>
          {label && (
            <label htmlFor={id} className={labelStyles}>
              {label}
            </label>
          )}
          <textarea
            id={id}
            name={name}
            value={value || ''}
            onChange={handleChange}
            className={`${baseInputStyles} min-h-[120px] resize-none`}
          />
        </div>
      )

    case 'textfield':
      return (
        <div className={formFieldStyles}>
          {label && (
            <label htmlFor={id} className={labelStyles}>
              {label}
            </label>
          )}
          <input
            type="text"
            id={id}
            name={name}
            value={value || ''}
            onChange={handleChange}
            className={baseInputStyles}
          />
        </div>
      )
    case 'password':
      return (
        <div className={formFieldStyles}>
          {label && (
            <label htmlFor={id} className={labelStyles}>
              {label}
            </label>
          )}
          <input
            type="password"
            id={id}
            name={name}
            value={value}
            onChange={handleChange}
            className={baseInputStyles}
          />
        </div>
      )

    default:
      return null
  }
}
