import { Paper } from "@mantine/core"
import { useTranslations } from "next-intl"

export default function CustomerStaticHeader({
  customer,
  meter,
}: {
  customer: any
  meter?: any
}) {
  const t = useTranslations("OperationForm")

  return (
    <Paper withBorder shadow="xs" p="lg" mb="xl">
      <div className="flex">
        <div className="flex flex-grow flex-col gap-2 text-sm">
          <div className="mb-2">
            <span className="font-semibold">{customer.customerNumber}</span>
          </div>
          <div className="flex gap-3">
            <div>{customer.postalCode}</div>
            <div>{customer.municipality}</div>
          </div>
          <div>{customer.address}</div>
          <div className="flex gap-3">
            {customer.buildingNameRoomNumber && (
              <div>{customer.buildingNameRoomNumber}</div>
            )}
            {customer.housingType && <div>{t(`housingType${customer.housingType}`)}</div>}
          </div>
          <div>
            {customer.name && customer.nameKana && (
              <div className="flex gap-3">
                <div>{customer.name}</div>
                <div>{customer.nameKana}</div>
              </div>
            )}
          </div>
          <div className="flex gap-3">
            {customer.phoneNumber && <div>{customer.phoneNumber}</div>}
            {customer.phoneNumberType && (
              <div>{t(`phoneNumberType${customer.phoneNumberType}`)}</div>
            )}
          </div>
          <div>{customer.mailAddress}</div>
        </div>
        {meter && (
          <div className="grid grid-cols-3">
            <div className="font-semibold">取付日</div>
            <div>{meter.meterPutKbn}</div>
            <div>{meter.meterPutYmd}</div>
            <div className="font-semibold">開栓日</div>
            <div>{meter.meterPutKbn}</div>
            <div>{meter.meterPutYmd}</div>
          </div>
        )}
      </div>
    </Paper>
  )
}
