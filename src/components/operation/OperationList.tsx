"use client"

/* Todo list/Memo 
1. Email zasna
2. Select button uudiin data oruulna
3. Cash - Payment method Lease- Signature
4. 
*/

import "dayjs/locale/ja"

import { Box, Button, Grid, LoadingOverlay, Table } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { getOperationStateName } from "@/lib/enum/operation-state"
import { useTranslations } from "next-intl"
import { formatDate } from "@/utils/date-helper"

function OperationList({ statuses, className }: { statuses?: number[], className?: string }) {
  const { isLoading, error, data } = useQuery({
    queryKey: [`operations${(statuses || [[]]).sort().join(",")}`],
    queryFn: () => { 

      const params = new URLSearchParams();

      for (const status of statuses || []) {
        params.append('statuses', status.toString());
      }

      return fetch(`/api/operation?${params.toString()}`).then((res) => res.json()) 
    },
  })
  
  const t = useTranslations("OperationForm")

  // const { data } = useQuery({
  //   queryKey: ["operations"],
  //   console.log(data);
  //   queryFn: () => get("/api/operation").then((res) => res.json()),
  // })

  // if (error) return "An error has occurred: " + error.message

  const rows = (data || []).map((o: any) => (
    <Table.Tr key={o.code} className="w-100">
      <Table.Td>
        <Link href={`/operation/${o.code}`}>{o.code}</Link>
      </Table.Td>
      <Table.Td>{getOperationStateName(o.status)}</Table.Td>
      <Table.Td>{t(`operationType${o.operationType}`)}</Table.Td>
      <Table.Td>{o.createdByUser.name}</Table.Td>
      <Table.Td>{o.assignedWorkerId}</Table.Td>
      <Table.Td>{formatDate(o.createdAt)}</Table.Td>
    </Table.Tr>
  ))

  return (
    <Grid className={className}>
      <Grid.Col span={12}>
        <Box pos="relative">
          <LoadingOverlay
            visible={isLoading}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
          />
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>ID</Table.Th>
                <Table.Th>{ t("status") }</Table.Th>
                <Table.Th>{ t("operationType") }</Table.Th>
                <Table.Th>{ t("createdBy") }</Table.Th>
                <Table.Th>{ t("assignedWorker") }</Table.Th>
                <Table.Th>{ t("createdAt") }</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <tbody>{rows}</tbody>
          </Table>
        </Box>
      </Grid.Col>
    </Grid>
  )
}

export default OperationList

//To do comment
