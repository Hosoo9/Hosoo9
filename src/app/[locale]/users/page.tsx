"use client"

import { useLoadingContext } from "@/utils/loadingProvider"
import { useEffect } from "react"

export default function Users() {
  const { setLoading } = useLoadingContext()

  //   useEffect(() => {
  //     setLoading(true)

  //     const timer = setTimeout(() => {
  //       setLoading(false)
  //     }, 300)

  //     return clearTimeout(timer)
  //   }, [])

  return <div>TODO : Users List here</div>
}
