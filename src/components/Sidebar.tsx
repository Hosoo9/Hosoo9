"use client"

import {
    IconLogout,
    IconSwitchHorizontal,
    IconTools
} from "@tabler/icons-react"
import { signOut } from "next-auth/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import classes from "./Sidebar.module.css"
import { useQuery } from "@tanstack/react-query"

const menuData = [
  { link: "/", label: "Draft operations", icon: IconTools },
  { link: "/operation/request", label: "Operation requests", icon: IconTools },
  { link: "/operation/approved", label: "Approved operations", icon: IconTools },
  { link: "/operation/completed", label: "Completed operations", icon: IconTools },
  // { link: "", label: "Billing", icon: IconReceipt2 },
  // { link: "", label: "Security", icon: IconFingerprint },
  // { link: "", label: "SSH Keys", icon: IconKey },
  // { link: "", label: "Databases", icon: IconDatabaseImport },
  // { link: "", label: "Authentication", icon: Icon2fa },
  // { link: "", label: "Other Settings", icon: IconSettings },
]

const technicianMenu = [
  { link: "/operation/approved", label: "Approved operations", icon: IconTools },
  { link: "/operation/completed", label: "Completed operations", icon: IconTools },
]

const paths = menuData.map((item) => item.link)

export function Sidebar() {
  const pathname = usePathname()
  const [active, setActive] = useState(pathname)
  const [currentMenu, setCurrentMenu] = useState<any>([])

  const {
    isLoading: isCurrentUserLoading,
    isError: isCurrentUserError,
    data: currentUser,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const result = await fetch(`/api/me`)
      return result.json()
    },
    onSettled: (data: any) => {
      if (data) {
        if (data.role === 2) {
          setCurrentMenu(technicianMenu)
        } else {
          setCurrentMenu(menuData)
        }
      }
    }
  })

  useEffect(() => {
    if (paths.includes(pathname)) {
      setActive(pathname)
    }
  }, [pathname])

  const links = currentMenu.map((item: any) => (
    <Link
      className={classes.link}
      data-active={item.link === active || undefined}
      href={item.link}
      key={item.label}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ))

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        {/* <Group className={classes.header} justify="space-between"> */}
        {/*  <Code fw={700} className={classes.version}> */}
        {/*     v3.1.2 */}
        {/*   </Code> */}
        {/* </Group> */}
        {links}
      </div>

      <div className={classes.footer}>
        <Link
          href={`/api/auth/signin?callbackUrl=/`}
          className={classes.link}
        >
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </Link>

        <Link href="#" onClick={() => signOut()} className={classes.link}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </Link>
      </div>
    </nav>
  )
}
