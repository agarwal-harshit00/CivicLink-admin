"use client"

import { createContext } from "react"

// Auto-authenticated context - users are always "logged in"
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return {
    user: {
      id: "admin-1",
      name: "Municipal Administrator",
      email: "admin@civiclink.gov",
      role: "admin",
    },
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    isAuthenticated: true, // Always authenticated
  }
}

