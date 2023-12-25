import { protectPage } from "@/lib/session"
import { Card } from "@mantine/core"
import {
  IconCalculator,
  IconExchange,
  IconGauge,
  IconStack,
  IconUsers,
} from "@tabler/icons-react"
import { getTranslations } from "next-intl/server"
import Link from "next/link"

export default async function MaintenancePage({}: {}) {
  await protectPage()

  const t = await getTranslations("OperationForm")

  const cards = [
    { link: "/jp/users", label: t("userManagement"), icon: IconUsers },
    { link: "/jp/meter_management", label: "メーター情報管理", icon: IconGauge },
    { link: "/jp/operation-aggregation", label: "作業集計", icon: IconStack },
    { link: "/jp/cost-calculator", label: "労務費算出", icon: IconCalculator },
    { link: "/jp/changed-list", label: "変更リスト", icon: IconExchange },
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
