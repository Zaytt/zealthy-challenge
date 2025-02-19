import React from 'react'
import AdminPageWrapper from './AdminPageWrapper'
import AdminHeader from './AdminHeader'

const AdminPage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-[#fffc]">
      <AdminHeader />
      <AdminPageWrapper />
    </div>
  )
}

export default AdminPage
