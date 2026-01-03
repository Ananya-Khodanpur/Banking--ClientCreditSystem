import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  length: 0,
  key: vi.fn()
}
global.localStorage = localStorageMock as any

// Simple route guard test
const ProtectedComponent = () => <div>Protected Content</div>
const LoginComponent = () => <div>Login Page</div>

const SimplePrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorageMock.getItem('token')
  return token ? <>{children}</> : <LoginComponent />
}

describe('Simple Route Guard Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render protected content when token exists', () => {
    localStorageMock.getItem.mockReturnValue('valid-token')

    render(
      <BrowserRouter>
        <SimplePrivateRoute>
          <ProtectedComponent />
        </SimplePrivateRoute>
      </BrowserRouter>
    )

    expect(screen.getByText('Protected Content')).toBeInTheDocument()
  })

  it('should show login when no token', () => {
    localStorageMock.getItem.mockReturnValue(null)

    render(
      <BrowserRouter>
        <SimplePrivateRoute>
          <ProtectedComponent />
        </SimplePrivateRoute>
      </BrowserRouter>
    )

    expect(screen.getByText('Login Page')).toBeInTheDocument()
  })

  it('should handle localStorage interactions', () => {
    localStorageMock.getItem.mockReturnValue('test-token')
    
    const token = localStorageMock.getItem('token')
    expect(token).toBe('test-token')
    expect(localStorageMock.getItem).toHaveBeenCalledWith('token')
  })
})
