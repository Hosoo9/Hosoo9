import { Card } from "@mantine/core"
import { IconBuildingFactory, IconGauge, IconRuler, IconUsers } from "@tabler/icons-react"
import { useTranslations } from "next-intl"
import Link from "next/link"

export default function MaintenancePage({}: {}) {
  const t = useTranslations("OperationForm")

  return (
    <div className="mt-5 grid grid-cols-3 gap-3">
      <Card component={Link} href="/jp/users" withBorder={true}>
        <div className="flex flex-col items-center justify-center gap-5 py-5">
          <IconUsers />
          <div className="text-base text-gray-700">{t("userManagement")}</div>
        </div>
      </Card>
      <Card component={Link} href="/jp/meter_manufacturers" withBorder={true}>
        <div className="flex flex-col items-center justify-center gap-5 py-5">
          <IconBuildingFactory />
          <div className="text-base text-gray-700">
            {t("meterManufacturerManagement")}
          </div>
        </div>
      </Card>
      <Card component={Link} href="/jp/meter_models" withBorder={true}>
        <div className="flex flex-col items-center justify-center gap-5 py-5">
          <IconGauge />
          <div className="text-base text-gray-700">
            {t("meterModelManagement")}
          </div>
        </div>
      </Card>
      <Card component={Link} href="/jp/meter_sizes" withBorder={true}>
        <div className="flex flex-col items-center justify-center gap-5 py-5">
          <IconRuler />
          <div className="text-base text-gray-700">{t("meterSizeManagement")}</div>
        </div>
      </Card>
    </div>
  )
}
