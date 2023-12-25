import { IconLogout, IconSwitchHorizontal, IconTools } from "@tabler/icons-react"
import { signOut } from "next-auth/react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import classes from "./Sidebar.module.css"
import { useQuery } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { Burger } from "@mantine/core"

export function Sidebar({ onBurgerClick, opened }: { onBurgerClick: () => void, opened: boolean }) {
  const router = useRouter()

  const pathname = usePathname()
  const [active, setActive] = useState(pathname)
  const [currentMenu, setCurrentMenu] = useState<any>([])

  const t = useTranslations("OperationForm")

  const managerMenu = [
    {
      link: "/jp/customer-search",
      label: t("customerSearch"),
      icon: IconTools,
    },
    { link: "/jp/operations", label: `${t("operations")}`, icon: IconTools },
  ]

  const technicianMenu = [
    { link: "/jp/operations", label: `${t("operations")}`, icon: IconTools },
  ]

  const bureauMenu = [
    ...managerMenu,
    { link: "/jp/management", label: "保守メニュー", icon: IconTools },
  ]

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
    },
  })

  useEffect(() => {
    if (currentMenu.map((m: any) => m.link).includes(pathname)) {
      setActive(pathname)
    }
  }, [pathname, currentMenu])

  const onLinkClick = (link: string) => {
    setActive(link)

    if (opened) {
      router.push(link)
      onBurgerClick()
    }
  }

  const links = currentMenu.map((item: any) => (
    <Link
      className={classes.link}
      data-active={item.link === active || undefined}
      href={item.link}
      key={item.label}
      onClick={() => onLinkClick(item.link)}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ))

  return (
    <nav className={classes.navbar}>
      { opened &&
        <div className={classes.burger}>
          <Burger
            color="white"
            opened={opened}
            onClick={onBurgerClick}
            hiddenFrom="sm"
            size="sm"
          />
        </div>
      }
      <div className={classes.navbarMain} style={{ paddingTop: opened ? "12px" : "0px" }}>
        {/* <Group className={classes.header} justify="space-between"> */}
        {/*  <Code fw={700} className={classes.version}> */}
        {/*     v3.1.2 */}
        {/*   </Code> */}
        {/* </Group> */}
        {links}
      </div>

      <div className={classes.footer}>
        <Link href={`/api/auth/signin?callbackUrl=/`} className={classes.link}>
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>{t("changeAccount")}</span>
        </Link>

        <Link href="#" onClick={() => signOut()} className={classes.link}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>{t("logout")}</span>
        </Link>
      </div>
    </nav>
  )
}
