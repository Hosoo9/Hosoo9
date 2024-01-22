import { renderGasSupKei, renderTatemonoKbn } from "@/utils/converters"
import { formatDay } from "@/utils/date-helper"
import { tp } from "@/utils/render"
import { Paper, Table } from "@mantine/core"
import { useTranslations } from "next-intl"

type CustomerStatic = {
  customerNumber?: string | null
  postalCode?: string | null
  municipality?: string | null
  address?: string | null
  buildingNameRoomNumber?: string | null
  name?: string | null
  nameKana?: string | null
  userTel?: string | null
  contactTel?: string | null
  mailAddress?: string | null
  meterPutKbn?: string | null
  meterPutYmd?: string | null
  meterInfoKbn?: string | null
  meterTurnOnKbn?: string | null
  meterTurnOnYmd?: string | null
  meterTurnOffKbn?: string | null
  meterTurnOffYmd?: string | null
  meterRemoveKbn?: string | null
  meterRemoveYmd?: string | null
  kiguChosaYmd?: string | null
  gasSupKeiCd?: string | null
  tatemonoKbn?: string | null
}

export default function CustomerStaticHeader({ customer }: { customer: CustomerStatic }) {
  const t = useTranslations("OperationForm")

  return (
    <Paper withBorder shadow="xs" p="lg" mb="xl">
      <>
        <div className="mb-3 flex gap-3">
          <span className="font-semibold">
            {t("customerNumber")}: {customer.customerNumber}
          </span>
          <span className="font-semibold">事業者: 10000</span>
          {customer.userTel && (
            <span className="font-semibold">使用場所: {customer.userTel} </span>
          )}
          {customer.contactTel && (
            <span className="font-semibold">連絡先: {customer.contactTel}</span>
          )}
          {customer.gasSupKeiCd && (
            <span className="font-semibold">
              {" "}
              供給: {renderGasSupKei(customer.gasSupKeiCd)} {customer.tatemonoKbn}{" "}
              {renderTatemonoKbn(customer.tatemonoKbn)}
            </span>
          )}
        </div>
        <div className="flex">
          <div className="flex flex-grow flex-col gap-2">
            <div className="flex gap-3">
              <div>{customer.postalCode}</div>
              <div>{customer.municipality}</div>
            </div>
            <div>{customer.address}</div>
            {customer.buildingNameRoomNumber && (
              <div className="flex gap-3">
                <div>{customer.buildingNameRoomNumber}</div>
              </div>
            )}
            {(customer.name || customer.nameKana) && (
              <div className="flex gap-3">
                <div>{customer.name}</div>
                <div>{customer.nameKana}</div>
              </div>
            )}
            {/* {customer.userTel && ( */}
            {/*   <div className="flex gap-3"> */}
            {/*     <div>{customer.userTel}</div> */}
            {/*   </div> */}
            {/* )} */}
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
                  <Table.Td>{tp(formatDay(customer.meterTurnOnYmd))}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>閉栓日</Table.Td>
                  <Table.Td>{tp(customer.meterTurnOffKbn)}</Table.Td>
                  <Table.Td>{tp(formatDay(customer.meterTurnOffYmd))}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>取外日</Table.Td>
                  <Table.Td>{tp(customer.meterRemoveKbn)}</Table.Td>
                  <Table.Td>{tp(formatDay(customer.meterRemoveYmd))}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>器具調査日</Table.Td>
                  <Table.Td></Table.Td>
                  <Table.Td>{tp(formatDay(customer.kiguChosaYmd))}</Table.Td>
                </Table.Tr>
              </Table.Thead>
            </Table>
          )}
        </div>
      </>
    </Paper>
  )
}
