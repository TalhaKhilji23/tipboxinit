'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const isStandalone = () => window.matchMedia('(display-mode: standalone)').matches

const useStandaloneMode = () => {
  const [standalone, setStandalone] = useState(isStandalone())

  console.log('standalone>>>>>', standalone)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(display-mode: standalone)')

    const handleChange = () => {
      setStandalone(mediaQuery.matches)
    }
    handleChange()
    mediaQuery.addEventListener('change', handleChange)
    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])
  return standalone
}

export default function Home({ children }) {
  const standalone = useStandaloneMode()
  const router = useRouter()

  useEffect(() => {
    if (standalone) {
      router.push('/restaurantmain')
    } else {
      router.push('/home')
    }
  }, [standalone, router])

  return <>{children}</>
}