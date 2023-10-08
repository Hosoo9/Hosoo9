"use client"

import {
  Icon2fa,
  IconBellRinging,
  IconDatabaseImport,
  IconFingerprint,
  IconKey,
  IconLogout,
  IconReceipt2,
  IconSettings,
  IconSwitchHorizontal,
  IconTools,
} from "@tabler/icons-react"
import { useState } from "react"
import classes from "./Sidebar.module.css"
import Link from "next/link"
import { signOut, useSession } from "next-auth/react"

const data = [
  { link: "/en", label: "Operations", icon: IconTools },
  // { link: "", label: "Billing", icon: IconReceipt2 },
  // { link: "", label: "Security", icon: IconFingerprint },
  // { link: "", label: "SSH Keys", icon: IconKey },
  // { link: "", label: "Databases", icon: IconDatabaseImport },
  // { link: "", label: "Authentication", icon: Icon2fa },
  // { link: "", label: "Other Settings", icon: IconSettings },
]

export function Sidebar() {
  const [active, setActive] = useState("Billing")

  const links = data.map((item) => (
    <Link
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={() => {
        setActive(item.label)
      }}
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
