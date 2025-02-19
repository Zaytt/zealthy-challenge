'use client'

import { UserData } from '@/types/UserData.type'
import OnboardingComponent from './OnboardingComponent'
import { OnboardingComponent as OnboardingComponentType } from '@/types/OnboardingComponent.type'
import { usePageStore } from '@/store/PageStore'
import { useUserStore, ONBOARDING_STATUS_KEY, ONBOARDING_USER_ID_KEY } from '@/store/UserStore'

interface OnboardingPageProps {
  components: OnboardingComponentType[]
}

export default function OnboardingPage({ components }: OnboardingPageProps) {
  const { currentPage, setCurrentPage, lastPage } = usePageStore()
  const { id, email, password, setId } = useUserStore()
  const store = useUserStore()

  const userData = {
    aboutMe: store.aboutMe,
    street: store.street,
    city: store.city,
    state: store.state,
    zip: store.zip,
    birthdate: store.birthdate,
    progress: currentPage === lastPage ? -1 : currentPage + 1,
  }
  const sortedComponents = [...components].sort((a, b) => a.order - b.order)

  const enableContinue = sortedComponents.every(component => {
    const { name } = component
    return !!store[name as keyof typeof store]
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      let response
      if (currentPage === 1) {
        // Create new user with email and password
        response = await fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email,
            password: password,
            progress: 2,
          }),
        })
        const newUser = await response.json()
        setId(newUser.id)

        // Persist user id on local memory for returning user before completion
        localStorage.setItem(ONBOARDING_STATUS_KEY, 'in_progress')
        localStorage.setItem(ONBOARDING_USER_ID_KEY, newUser.id)
      } else {
        // Update user data for pages 2 and 3
        response = await fetch(`/api/users/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...userData, progress: currentPage === 3 ? -1 : currentPage + 1 }),
        })

        if (currentPage === lastPage) {
          localStorage.removeItem(ONBOARDING_STATUS_KEY)
          localStorage.removeItem(ONBOARDING_USER_ID_KEY)
        }
      }

      if (response.ok) {
        setCurrentPage(currentPage + 1)
      }
    } catch (error) {
      console.error('Failed to save onboarding progress:', error)
    }
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit}>
        {sortedComponents.map(component => (
          <OnboardingComponent
            key={component.name}
            id={component.id}
            type={component.componentType}
            name={component.name as keyof UserData}
            label={component.label}
          />
        ))}
        <button
          disabled={!enableContinue}
          type="submit"
          className="px-4 py-2 bg-[#00531b] text-white rounded-lg hover:bg-[#004016] transition-colors font-bold w-full mt-8
            disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:cursor-not-allowed"
        >
          {currentPage === 3 ? 'Finish' : 'Continue'}
        </button>
      </form>
    </div>
  )
}
