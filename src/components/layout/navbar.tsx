import { Navbar } from "@mantine/core"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

interface INavbarType {
  path: string
  code: string
  name: string
}

interface ICustomNavbarProps {
  isClosed: boolean
}

export function CustomNavbar({ isClosed }: ICustomNavbarProps) {
  const pathName = usePathname()

  const navMenu: INavbarType[] = [
    { path: "/users", code: "users", name: "User List" },
    { path: "/company", code: "company", name: "Company List" },
    { path: "/operation/new", code: "operation", name: "Operation List" },
  ]

  return (
    <Navbar
      className="text-black"
      width={{ base: isClosed ? "5%" : "20%" }}
      height={"100vh"}
      p="xs"
    >
      {navMenu.map((element, index) => {
        return !isClosed ? (
          <Link
            className={`py-4 text-black no-underline ${
              pathName.split("/")[2] === element.code && "text-blue-500"
            }`}
            href={element.path}
            key={index}
          >
            {element.name}
          </Link>
        ) : (
          <div></div>
        )
      })}
    </Navbar>
  )
}
