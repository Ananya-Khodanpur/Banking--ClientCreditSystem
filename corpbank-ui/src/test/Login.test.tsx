import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import Login from '../auth/Login'
import authSlice from '../features/auth/authSlice'

// Test setup for freshers - Simple and easy to understand
const createTestStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice
    }
  })
}

// Helper function to render components with providers
const renderWithProviders = (component: React.ReactElement) => {
  const store = createTestStore()
  return render(
    <Provider store={store}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </Provider>
  )
}

describe('Login Component Tests for Freshers', () => {
  beforeEach(() => {
    // Reset any mocks before each test
    vi.clearAllMocks()
  })

  it('renders login form elements', async () => {
    // Arrange - Render component
    renderWithProviders(<Login />)
    
    // Wait for Fade animation to complete
    await new Promise(resolve => setTimeout(resolve, 100))
    
    // Act - No action needed, just checking initial render
    
    // Assert - Check if all elements are present
    expect(screen.getByRole('heading', { name: /Corporate Banking/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  it('username input accepts text', async () => {
    // Arrange
    renderWithProviders(<Login />)
    const usernameInput = screen.getByLabelText(/username/i)
    
    // Act
    await userEvent.type(usernameInput, 'testuser')
    
    // Assert
    expect(usernameInput).toHaveValue('testuser')
  })

  it('password input accepts text', async () => {
    // Arrange
    renderWithProviders(<Login />)
    const passwordInput = screen.getByLabelText(/password/i)
    
    // Act
    await userEvent.type(passwordInput, 'password123')
    
    // Assert
    expect(passwordInput).toHaveValue('password123')
  })

  it('login button is enabled when form is filled', async () => {
    // Arrange
    renderWithProviders(<Login />)
    const usernameInput = screen.getByLabelText(/username/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const loginButton = screen.getByRole('button', { name: /sign in/i })
    
    // Act - Fill form
    await userEvent.type(usernameInput, 'testuser')
    await userEvent.type(passwordInput, 'password123')
    
    // Assert - Button should be enabled when form is filled
    expect(loginButton).not.toBeDisabled()
  })
})
