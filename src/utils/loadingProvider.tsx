"use client"

import React, { useContext, createContext, ReactNode, useState } from "react"

interface ILoadingContextType {
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

interface ILoadingProviderProps {
  children: ReactNode
}

const LoadingContext = createContext<ILoadingContextType | undefined>(undefined)

const LoadingProvider = ({ children }: ILoadingProviderProps) => {
  const [loading, setLoading] = useState<boolean>(false)

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  )
}

export const useLoadingContext = () => {
  const context = useContext(LoadingContext)
  if (context === undefined) {
    throw new Error("Use inside LoadingProvider")
  }
  return context
}

export default LoadingProvider
