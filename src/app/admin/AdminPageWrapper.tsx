'use client'
import { useOnboardingComponentsStore } from '@/store/OnboardingComponentsStore'
import React, { useEffect, useState, useCallback } from 'react'
import AdminPage from './AdminPage'
import { OnboardingComponent } from '@/types/OnboardingComponent.type'

const AdminPageWrapper = () => {
  const { isLoading, components, isSaving, setComponents, setIsLoading, setIsSaving } =
    useOnboardingComponentsStore()
  const [error, setError] = useState<string | null>(null)
  const [showWarning, setShowWarning] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const fetchComponents = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/onboarding-components')

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: OnboardingComponent[] = await response.json()
      // Only include active components and sort by order
      const activeComponents = data
        .filter(comp => comp.isActive)
        .sort((a, b) => a.pageNumber - b.pageNumber)

      setComponents(activeComponents.slice(2))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch components')
      console.error('Error fetching components:', err)
    } finally {
      setIsLoading(false)
    }
  }, [setIsLoading, setComponents, setError])

  const handlePageChange = (componentId: string, newPage: number) => {
    const proposedComponents = components.map(component =>
      component.id === componentId ? { ...component, pageNumber: newPage } : component
    )

    const hasComponentsInPage2 = proposedComponents.some(comp => comp.pageNumber === 2)
    const hasComponentsInPage3 = proposedComponents.some(comp => comp.pageNumber === 3)

    if (!hasComponentsInPage2 || !hasComponentsInPage3) {
      setShowWarning(true)
      setTimeout(() => setShowWarning(false), 3000) // Hide after 3 seconds
      return
    }

    setComponents(proposedComponents)
  }

  useEffect(() => {
    fetchComponents()
  }, [fetchComponents])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    try {
      const response = await fetch('/api/onboarding-components/update-pages', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ components }),
      })

      if (!response.ok) {
        throw new Error('Failed to update components')
      }

      // Show success message or handle successful update
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    } catch (error) {
      console.error('Error updating components:', error)
      alert('Failed to update components')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <>
      {showWarning && (
        <div className="fixed bottom-10 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-md flex items-center">
          <span className="mr-2">⚠️</span>
          Each page must have at least one component assigned to it
        </div>
      )}
      {showSuccess && (
        <div className="fixed bottom-10 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-md flex items-center">
          <span className="mr-2">✓</span>
          Pages updated successfully
        </div>
      )}
      <div className="flex flex-col items-center p-6 font-semibold bg-[#edfff3] text-[#1b1b1b] mb-6 text-center border-2 border-[#1b1b1b] rounded-lg min-h-[400px] min-w-[480px] justify-between px-8">
        <AdminPage
          components={components}
          onPageChange={handlePageChange}
          handleSubmit={handleSubmit}
          isSaving={isSaving}
        />
      </div>
    </>
  )
}

export default AdminPageWrapper
