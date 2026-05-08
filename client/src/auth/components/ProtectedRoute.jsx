import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const { user, checkingAuth } = useAuth()

  if (checkingAuth) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    )
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  return children
}

export default ProtectedRoute
