'use client'

import { IconButton, Skeleton, Box } from '@chakra-ui/react'
import { ThemeProvider, useTheme } from 'next-themes'
import * as React from 'react'
import { LuMoon, LuSun } from 'react-icons/lu'

// Theme wrapper
export function ColorModeProvider(props) {
  return (
    <ThemeProvider attribute='class' disableTransitionOnChange {...props} />
  )
}

// Custom hook for color mode
export function useColorMode() {
  const { resolvedTheme, setTheme, forcedTheme } = useTheme()
  const colorMode = forcedTheme || resolvedTheme
  const toggleColorMode = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }
  return {
    colorMode: colorMode,
    setColorMode: setTheme,
    toggleColorMode,
  }
}

// Hook to get value based on color mode
export function useColorModeValue(light, dark) {
  const { colorMode } = useColorMode()
  return colorMode === 'dark' ? dark : light
}

// Icon for color mode
export function ColorModeIcon() {
  const { colorMode } = useColorMode()
  return colorMode === 'dark' ? <LuMoon /> : <LuSun />
}

// Button to toggle color mode
export const ColorModeButton = React.forwardRef(function ColorModeButton(
  props,
  ref,
) {
  const { toggleColorMode } = useColorMode()

  return (
    <IconButton
      onClick={toggleColorMode}
      variant='ghost'
      aria-label='Toggle color mode'
      size='sm'
      ref={ref}
      {...props}
    >
      <ColorModeIcon />
    </IconButton>
  )
})

// LightMode wrapper
export const LightMode = React.forwardRef(function LightMode(props, ref) {
  return (
    <Box
      as='span'
      className='chakra-theme light'
      ref={ref}
      {...props}
    />
  )
})

// DarkMode wrapper
export const DarkMode = React.forwardRef(function DarkMode(props, ref) {
  return (
    <Box
      as='span'
      className='chakra-theme dark'
      ref={ref}
      {...props}
    />
  )
})
