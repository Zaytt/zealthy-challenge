import { create } from 'zustand'
import { UserData } from '@/types/UserData.type'

export interface UserState extends UserData {
  setId: (id: string) => void
  setEmail: (email: string) => void
  setPassword: (password: string) => void
  setAboutMe: (aboutMe: string) => void
  setStreet: (street: string) => void
  setCity: (city: string) => void
  setState: (state: string) => void
  setZip: (zip: string) => void
  setBirthdate: (birthdate: string) => void
  setProgress: (progress: number) => void
}

export const useUserStore = create<UserState>(set => ({
  id: '',
  email: '',
  password: '',
  aboutMe: '',
  street: '',
  city: '',
  state: '',
  zip: '',
  birthdate: '',
  progress: 0,
  setId: id => set({ id }),
  setEmail: email => set({ email }),
  setPassword: password => set({ password }),
  setAboutMe: aboutMe => set({ aboutMe }),
  setStreet: street => set({ street }),
  setCity: city => set({ city }),
  setState: state => set({ state }),
  setZip: zip => set({ zip }),
  setBirthdate: birthdate => set({ birthdate }),
  setProgress: progress => set({ progress }),
}))

export const ONBOARDING_STATUS_KEY = 'onboardingStatus'
export const ONBOARDING_USER_ID_KEY = 'onboardingUserId'

// Add to your store
export const fetchStoredUserData = async (): Promise<{ page: number; email: string }> => {
  const onboardingStatus = localStorage.getItem(ONBOARDING_STATUS_KEY)
  const userId = localStorage.getItem(ONBOARDING_USER_ID_KEY)

  if (onboardingStatus === 'in_progress' && userId) {
    try {
      // Fetch user data from your API
      const response = await fetch(`/api/users/${userId}`)
      const userData: UserData = await response.json()

      // Update Zustand store with fetched data
      useUserStore.setState({
        id: userData.id,
        email: userData.email,
        aboutMe: userData.aboutMe,
        street: userData.street,
        city: userData.city,
        state: userData.state,
        zip: userData.zip,
        birthdate: userData.birthdate,
        progress: userData.progress,
      })

      return {
        page: userData.progress,
        email: userData.email,
      }
    } catch (error) {
      console.error('Failed to fetch onboarding data:', error)
      return { page: 1, email: 'invalid user' }
    }
  }

  return { page: 1, email: 'invalid user' }
}
