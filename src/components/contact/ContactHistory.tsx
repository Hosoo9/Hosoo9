"use client"

import { Table } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import ContactForm from "./ContactForm"
import { LoaderComponent } from "../Provider"

type ContactItem = {
  contactType: string
  liaisonWorker: string
  dateAndTimeOfContact: any
  detail: string
}

export default function ContactHistory({ code }: { code: string }) {
  const t = useTranslations("OperationForm")

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: [`${code}/contacts`],
    queryFn: () => fetch(`/api/operation/${code}/contacts`).then((res) => res.json()),
  })

  const rows = (data || []).map((data: any, index: number) => (
    <Table.Tr key={index}>
      <Table.Td>{data.contactType}</Table.Td>
      <Table.Td>{data.contactedBy}</Table.Td>
      <Table.Td>{data.contactedAt}</Table.Td>
      <Table.Td>{data.details}</Table.Td>
    </Table.Tr>
  ))

  return (
    <div>
      {isLoading ? (
        <LoaderComponent />
      ) : (
        <>
          <Table striped withColumnBorders className="pb-5 mb-5">
            { data.length === 0 && <Table.Caption>No data</Table.Caption> }
            <Table.Thead>
              <Table.Tr>
                <Table.Th>{t("contactType")}</Table.Th>
                <Table.Th>{t("contactedBy")}</Table.Th>
                <Table.Th>{t("contactedAt")}</Table.Th>
                <Table.Th>{t("details")}</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </>
      )}
      <ContactForm code={code} />
    </div>
  )
}
