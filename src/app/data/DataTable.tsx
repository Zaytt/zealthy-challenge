'use client'
import React, { useEffect, useState } from 'react'

interface User {
  id: string
  email: string
  aboutMe: string | null
  street: string | null
  city: string | null
  state: string | null
  zip: string | null
  birthdate: string | null
  progress: number
  createdAt: string
}

const DataTable = () => {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/users')
      const data = await response.json()
      setUsers(data)
    }
    fetchUsers()
  }, [])

  return (
    <div className="p-4 ">
      <div className="overflow-x-auto">
        <table className="min-w-full  border border-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                About
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Address
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Progress
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Created
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-[#edfff3]">
            {users.map(user => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4">{user.aboutMe || '-'}</td>
                <td className="px-6 py-4">
                  {user.street && user.city
                    ? `${user.street}, ${user.city}, ${user.state} ${user.zip}`
                    : '-'}
                </td>
                <td className="px-6 py-4">{user.progress !== -1 ? 'In Progress' : 'Completed'}</td>
                <td className="px-6 py-4">{new Date(user.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DataTable
