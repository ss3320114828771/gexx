'use client'

import { useState, useEffect } from 'react'

interface WindowSize {
  width: number
  height: number
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isSmallScreen: boolean
  isMediumScreen: boolean
  isLargeScreen: boolean
  isExtraLargeScreen: boolean
}

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isSmallScreen: false,
    isMediumScreen: false,
    isLargeScreen: false,
    isExtraLargeScreen: false
  })

  useEffect(() => {
    // Handler to call on window resize
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      setWindowSize({
        width,
        height,
        // Device type
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
        // Screen size breakpoints
        isSmallScreen: width < 640,
        isMediumScreen: width >= 640 && width < 768,
        isLargeScreen: width >= 768 && width < 1024,
        isExtraLargeScreen: width >= 1024
      })
    }

    // Add event listener
    window.addEventListener('resize', handleResize)

    // Call handler right away so state gets updated with initial window size
    handleResize()

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, []) // Empty array ensures effect runs only once on mount

  return windowSize
}

// Simple version - just width and height
export function useSimpleWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return size
}

// Breakpoint specific hooks
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener('resize', checkMobile)
    checkMobile()

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return isMobile
}

export function useIsTablet() {
  const [isTablet, setIsTablet] = useState(false)

  useEffect(() => {
    const checkTablet = () => {
      const width = window.innerWidth
      setIsTablet(width >= 768 && width < 1024)
    }

    window.addEventListener('resize', checkTablet)
    checkTablet()

    return () => window.removeEventListener('resize', checkTablet)
  }, [])

  return isTablet
}

export function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }

    window.addEventListener('resize', checkDesktop)
    checkDesktop()

    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

  return isDesktop
}

// Orientation hook
export function useOrientation() {
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait')

  useEffect(() => {
    const checkOrientation = () => {
      setOrientation(
        window.innerHeight > window.innerWidth ? 'portrait' : 'landscape'
      )
    }

    window.addEventListener('resize', checkOrientation)
    checkOrientation()

    return () => window.removeEventListener('resize', checkOrientation)
  }, [])

  return orientation
}

// Responsive value hook - returns different values based on screen size
export function useResponsiveValue<T>({
  mobile,
  tablet,
  desktop,
  defaultValue
}: {
  mobile?: T
  tablet?: T
  desktop?: T
  defaultValue: T
}): T {
  const { isMobile, isTablet, isDesktop } = useWindowSize()

  if (isMobile && mobile !== undefined) return mobile
  if (isTablet && tablet !== undefined) return tablet
  if (isDesktop && desktop !== undefined) return desktop

  return defaultValue
}