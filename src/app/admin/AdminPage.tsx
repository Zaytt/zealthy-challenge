import React from 'react'
import { OnboardingComponent } from '@/types/OnboardingComponent.type'

interface AdminPageProps {
  isSaving: boolean
  components: OnboardingComponent[]
  onPageChange: (componentId: string, newPage: number) => void
  handleSubmit: (e: React.FormEvent) => void
}

const AdminPage = ({ components, onPageChange, handleSubmit, isSaving }: AdminPageProps) => {
  const pageOptions = [2, 3]

  return (
    <div className="w-full">
      <h2 className="text-xl mb-6">Component Page Assignment</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          {components
            .toSorted((a, b) => a.pageNumber - b.pageNumber)
            .map(component => (
              <React.Fragment key={component.id}>
                {/* Left column */}
                <div className="flex items-center">
                  <span className="font-medium capitalize">
                    {component.name}{' '}
                    <span className="text-gray-600">({component.componentType})</span>
                  </span>
                </div>

                {/* Right column */}
                <div className="flex items-center justify-center">
                  <select
                    value={component.pageNumber}
                    onChange={e => onPageChange(component.id, Number(e.target.value))}
                    className="border-2 border-[#1b1b1b] rounded-md px-2 py-1 bg-white"
                  >
                    {pageOptions.map(page => (
                      <option key={page} value={page}>
                        Page {page}
                      </option>
                    ))}
                  </select>
                </div>
              </React.Fragment>
            ))}
          <div className="col-span-2">
            <button
              disabled={isSaving}
              type="submit"
              className="px-4 py-2 bg-[#00531b] text-white rounded-lg hover:bg-[#004016] transition-colors font-bold w-full mt-8 
                disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AdminPage
