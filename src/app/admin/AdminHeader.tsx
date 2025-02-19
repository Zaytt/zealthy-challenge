'use client'

import Link from 'next/link'

export default function AdminHeader() {
  return (
    <div className="flex items-center flex-col gap-4 h-[120px] border-b-2 border-black w-full justify-around bg-[#edfff3] relative mb-8">
      <div className="text-center">
        <div className="text-black text-3xl font-bold">Admin Page</div>
        <div className="w-full flex justify-between gap-10 mt-2">
          <Link href={'/onboarding'} className="underline color hover:text-[#00531b]">
            Go to Onboarding Page
          </Link>
          <Link href={'/data'} className="underline hover:text-[#00531b]">
            Go to Data Page
          </Link>
        </div>
      </div>
    </div>
  )
}
