"use client"

import { useLoadingContext } from "@/utils/loadingProvider"
import { SessionProvider } from "next-auth/react"
import { Loader } from "@mantine/core"

const Provider = ({ children }: { children: any }) => {
  const { loading } = useLoadingContext()

  return <SessionProvider>{loading ? LoaderComponent() : children}</SessionProvider>
}

export const LoaderComponent = () => {
  return (
    <div className="fixed left-0 top-0 z-[100] flex h-screen w-screen items-center justify-center bg-black/60">
      <Loader></Loader>
    </div>
  )
}

export default Provider
