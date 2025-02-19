'use client'

import { useEffect, useState } from 'react'
import { OnboardingComponent } from '@/types/OnboardingComponent.type'
import OnboardingPage from './OnboardingPage'
import { usePageStore } from '@/store/PageStore'
import { ONBOARDING_STATUS_KEY, fetchStoredUserData } from '@/store/UserStore'

export default function OnboardingPageWrapper() {
  const [components, setComponents] = useState<OnboardingComponent[]>([])
  const [error, setError] = useState<string | null>(null)
  const { currentPage, lastPage, setCurrentPage, setLastPage, isLoading, setIsLoading } =
    usePageStore()
  const [showWelcomeBack, setShowWelcomeBack] = useState(false)
  const [returningUser, setReturningUser] = useState('')

  const fetchComponents = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/onboarding-components')

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      // Only include active components and sort by order
      const activeComponents = data
        .filter((comp: OnboardingComponent) => comp.isActive)
        .sort((a: OnboardingComponent, b: OnboardingComponent) => a.order - b.order)

      const lastPageofComponents = activeComponents.reduce(
        (prev: number, curr: OnboardingComponent) => {
          return curr.pageNumber > prev ? curr.pageNumber : prev
        },
        0
      )
      setLastPage(lastPageofComponents)
      setComponents(activeComponents)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch components')
      console.error('Error fetching components:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const initializeOnboarding = async () => {
    try {
      setIsLoading(true)
      const { page, email } = await fetchStoredUserData()
      setCurrentPage(page)
      setReturningUser(email)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (localStorage.getItem(ONBOARDING_STATUS_KEY)) {
      initializeOnboarding().then(() => {
        fetchComponents()
        setShowWelcomeBack(true)
      })
      setTimeout(() => setShowWelcomeBack(false), 5000)
    } else {
      fetchComponents()
    }
  }, [])

  // Get components f or the current page
  const currentPageComponents = components.filter(component => component.pageNumber === currentPage)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <>
      {showWelcomeBack && (
        <div className="fixed bottom-10 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-md flex items-center">
          <span className="mr-2">✓</span>
          {`Welcome back ${returningUser}: your progress has been stored`}
        </div>
      )}
      <div className="flex flex-col items-center p-6 font-semibold bg-[#edfff3] text-[#1b1b1b] mb-6 text-center border-2 border-[#1b1b1b] rounded-lg min-h-[300px] min-w-[480px] justify-between px-8">
        {currentPage <= lastPage && (
          <div className="w-full">
            <OnboardingPage components={currentPageComponents} />
          </div>
        )}
        {currentPage > lastPage && (
          <div className="h-full w-full flex justify-center items-center align-center flex-col pt-10">
            <h2 className="w-full py-4 text-2xl mb-8">Sign up complete</h2>
            <h3>Check your email to confirm your account and enjoy your benefits</h3>
          </div>
        )}
      </div>
    </>
  )
}
