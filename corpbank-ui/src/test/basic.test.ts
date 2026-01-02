import { describe, it, expect } from 'vitest'

// Simple test examples for freshers
describe('Basic Test Examples for Freshers', () => {
  it('should add two numbers correctly', () => {
    // Arrange
    const num1 = 2
    const num2 = 3
    
    // Act
    const result = num1 + num2
    
    // Assert
    expect(result).toBe(5)
  })

  it('should check if string contains text', () => {
    // Arrange
    const text = 'Corporate Banking System'
    
    // Act & Assert
    expect(text).toContain('Corporate')
    expect(text).toContain('Banking')
  })

  it('should work with objects', () => {
    // Arrange
    const user = {
      username: 'admin',
      role: 'ADMIN'
    }
    
    // Act & Assert
    expect(user.username).toBe('admin')
    expect(user.role).toBe('ADMIN')
    expect(user).toHaveProperty('username')
    expect(user).toHaveProperty('role')
  })

  it('should handle async operations', async () => {
    // Arrange
    const fetchData = () => {
      return new Promise(resolve => {
        setTimeout(() => resolve('data loaded'), 100)
      })
    }
    
    // Act
    const result = await fetchData()
    
    // Assert
    expect(result).toBe('data loaded')
  })
})

describe('Array Operations Tests', () => {
  it('should filter array correctly', () => {
    // Arrange
    const numbers = [1, 2, 3, 4, 5]
    
    // Act
    const evenNumbers = numbers.filter(n => n % 2 === 0)
    
    // Assert
    expect(evenNumbers).toEqual([2, 4])
    expect(evenNumbers).toHaveLength(2)
  })

  it('should map array correctly', () => {
    // Arrange
    const users = ['admin', 'rm', 'analyst']
    
    // Act
    const userRoles = users.map(user => user.toUpperCase())
    
    // Assert
    expect(userRoles).toEqual(['ADMIN', 'RM', 'ANALYST'])
  })
})

describe('String Operations Tests', () => {
  it('should validate email format', () => {
    // Arrange
    const email = 'admin@corpbank.com'
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    
    // Act & Assert
    expect(emailRegex.test(email)).toBe(true)
  })

  it('should format currency correctly', () => {
    // Arrange
    const amount = 1500.50
    
    // Act
    const formatted = `$${amount.toFixed(2)}`
    
    // Assert
    expect(formatted).toBe('$1500.50')
  })
})
