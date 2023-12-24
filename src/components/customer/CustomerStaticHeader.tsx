import { formatDay } from "@/utils/date-helper"
import { tp } from "@/utils/render"
import { Paper, Table } from "@mantine/core"
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
        <div className="flex flex-grow flex-col gap-2">
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
        {customer && (
          <Table highlightOnHover withRowBorders={true} style={{ width: "18rem" }}>
            <Table.Thead>
              <Table.Tr>
                <Table.Td>取付日</Table.Td>
                <Table.Td>{tp(customer.meterPutKbn)}</Table.Td>
                <Table.Td>{formatDay(customer.meterPutYmd)}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>開栓日</Table.Td>
                <Table.Td>
                  {tp(
                    customer.meterInfoKbn &&
                      customer.meterTurnOnYmd &&
                      `${customer.meterInfoKbn}-${customer.meterTurnOnKbn}`,
                  )}
                </Table.Td>
                <Table.Td>{formatDay(customer.meterTurnOnYmd)}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>閉栓日</Table.Td>
                <Table.Td>{tp(customer.meterTurnOffKbn)}</Table.Td>
                <Table.Td>{formatDay(customer.meterTurnOffYmd)}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>取外日</Table.Td>
                <Table.Td>{tp(customer.meterRemoveKbn)}</Table.Td>
                <Table.Td>{formatDay(customer.meterRemoveYmd)}</Table.Td>
              </Table.Tr>
            </Table.Thead>
          </Table>
        )}
      </div>
    </Paper>
  )
}
