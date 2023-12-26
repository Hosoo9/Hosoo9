import { protectPage } from "@/lib/session"
import { Card } from "@mantine/core"
import { IconGauge, IconTools, IconUsers } from "@tabler/icons-react"
import { getTranslations } from "next-intl/server"
import Link from "next/link"

export default async function MaintenancePage({}: {}) {
  await protectPage()

  const t = await getTranslations("OperationForm")

  const cards = [
    { link: "/jp/users", label: t("userManagement"), icon: IconUsers },
    { link: "/jp/meter_management", label: "メーター情報管理", icon: IconGauge },
    { link: "/jp/labor-cost-management", label: "労務費単価管理", icon: IconTools },
  ]

  return (
    <div className="mt-5 grid grid-cols-3 gap-3">
      {cards.map((card) => (
        <Card component={Link} href={card.link} withBorder={true} key={card.link}>
          <div className="flex flex-col items-center justify-center gap-5 py-5">
            <card.icon />
            <div className="text-base text-gray-700">{card.label}</div>
          </div>
        </Card>
      ))}
    </div>
  )
}
