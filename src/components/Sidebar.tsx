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
import { useTranslations } from "next-intl"

const managerMenu = [
  { link: "/", label: "Draft operations", icon: IconTools },
  { link: "/operation/expired", label: "Expired operations", icon: IconTools },
  { link: "/operation/request", label: "Operation requests", icon: IconTools },
  { link: "/operation/approved", label: "Approved operations", icon: IconTools },
  { link: "/operation/completed", label: "Completed operations", icon: IconTools },
]

const technicianMenu = [
  { link: "/operation/approved", label: "Approved operations", icon: IconTools },
  { link: "/operation/completed", label: "Completed operations", icon: IconTools },
]

const bureauMenu = [
  ...managerMenu,
  { link: "/users", label: "User management", icon: IconTools },
]

export function Sidebar() {
  const pathname = usePathname()
  const [active, setActive] = useState(pathname)
  const [currentMenu, setCurrentMenu] = useState<any>([])

  const t = useTranslations("OperationForm")

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
        if (data.role === 3) {
          setCurrentMenu(bureauMenu)
        } else if (data.role === 1) {
          setCurrentMenu(managerMenu)
        } else {
          setCurrentMenu(technicianMenu)
        }
      }
    }
  })

  useEffect(() => {
    if (currentMenu.map((m: any) => m.link).includes(pathname)) {
      setActive(pathname)
    }
  }, [pathname, currentMenu])

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
          <span>{ t("changeAccount") }</span>
        </Link>

        <Link href="#" onClick={() => signOut()} className={classes.link}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>{ t("logout") }</span>
        </Link>
      </div>
    </nav>
  )
}
