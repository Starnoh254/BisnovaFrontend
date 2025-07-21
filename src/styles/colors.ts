// Central color configuration for Bisnova Supplies Limited
export const colors = {
  // Primary Brand Colors
  primary: {
    blue: {
      50: '#eff6ff',
      100: '#dbeafe', 
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6', // Main blue
      600: '#2563eb', // Darker blue
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    green: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e', // Main green
      600: '#16a34a', // Darker green
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },
    white: '#ffffff',
  },
  
  // Secondary Colors
  secondary: {
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
    yellow: {
      50: '#fefce8',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    }
  },

  // Semantic Colors
  semantic: {
    success: '#22c55e', // Green
    warning: '#f59e0b', // Yellow
    error: '#ef4444',   // Red
    info: '#3b82f6',    // Blue
  },

  // Background Colors
  background: {
    primary: '#ffffff',    // White
    secondary: '#f9fafb',  // Light gray
    accent: '#eff6ff',     // Very light blue
  },

  // Text Colors
  text: {
    primary: '#111827',    // Dark gray
    secondary: '#6b7280',  // Medium gray
    accent: '#2563eb',     // Blue
    white: '#ffffff',      // White
    green: '#16a34a',      // Green
  },

  // Border Colors
  border: {
    light: '#e5e7eb',
    medium: '#d1d5db',
    dark: '#9ca3af',
    accent: '#3b82f6',
  }
} as const

// CSS Custom Properties for easy access in components
export const cssVariables = {
  '--color-primary-blue': colors.primary.blue[600],
  '--color-primary-green': colors.primary.green[600],
  '--color-primary-white': colors.primary.white,
  '--color-bg-primary': colors.background.primary,
  '--color-bg-secondary': colors.background.secondary,
  '--color-text-primary': colors.text.primary,
  '--color-text-secondary': colors.text.secondary,
} as const

// Tailwind color classes for consistent usage
export const tailwindColors = {
  // Primary colors
  primaryBlue: 'blue-600',
  primaryBlueLight: 'blue-500',
  primaryBlueDark: 'blue-700',
  primaryGreen: 'green-600',
  primaryGreenLight: 'green-500',
  primaryGreenDark: 'green-700',
  
  // Background colors
  bgPrimary: 'white',
  bgSecondary: 'gray-50',
  bgAccent: 'blue-50',
  
  // Text colors
  textPrimary: 'gray-900',
  textSecondary: 'gray-600',
  textAccent: 'blue-600',
  textWhite: 'white',
  textGreen: 'green-600',
  
  // Border colors
  borderLight: 'gray-200',
  borderMedium: 'gray-300',
  borderAccent: 'blue-600',
} as const
