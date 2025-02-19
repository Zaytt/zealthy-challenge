'use client'

import { usePageStore } from '@/store/PageStore'
import Link from 'next/link'

export default function OnboardingHeader() {
  const { currentPage, lastPage, isLoading } = usePageStore()
  const setCurrentPage = usePageStore(state => state.setCurrentPage)

  const message =
    currentPage <= lastPage ? `Step ${currentPage} of ${lastPage}` : `Done ${lastPage}/${lastPage}`

  if (isLoading) return <div></div>
  return (
    <div className="flex items-center gap-4 h-[120px] border-b-2 border-black w-full justify-around bg-[#edfff3] relative">
      {currentPage > 2 && currentPage < lastPage + 1 && (
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          className="absolute left-8 px-4 py-2 border-2 border-black hover:border-[#00531b] rounded-lg hover:bg-[#00531b] hover:text-white transition-colors font-bold"
        >
          Back
        </button>
      )}
      <div className="text-center">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <h2 className="text-xl font-medium">{message}</h2>
        <div className="w-full flex justify-between gap-10 mt-2">
          <Link href={'/admin'} className="underline color hover:text-[#00531b]">
            Go to Admin Page
          </Link>
          <Link href={'/data'} className="underline hover:text-[#00531b]">
            Go to Data Page
          </Link>
        </div>
      </div>
    </div>
  )
}
