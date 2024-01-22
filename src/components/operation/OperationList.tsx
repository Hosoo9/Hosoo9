"use client"

/* Todo list/Memo 
1. Email zasna
2. Select button uudiin data oruulna
3. Cash - Payment method Lease- Signature
4. 
*/

import "dayjs/locale/ja"

import { type OperationType } from "@/contexts/operation"
import { getOperationStateName } from "@/lib/enum/operation-state"
import { getOperationType } from "@/lib/enum/operation-type"
import { formatDate, formatDay } from "@/utils/date-helper"
import {
  ActionIcon,
  Box,
  Button,
  Grid,
  LoadingOverlay,
  MultiSelect,
  Stack,
  TextInput,
} from "@mantine/core"
import { DatePicker, type DatesRangeValue } from "@mantine/dates"
import { useDebouncedValue } from "@mantine/hooks"
import { IconSearch, IconX } from "@tabler/icons-react"
import { useQuery } from "@tanstack/react-query"
import { DataTable, DataTableColumn, type DataTableSortStatus } from "mantine-datatable"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { useEffect, useState } from "react"
import CompanySelectNoForm from "../form/CompanySelectNoForm"

const PAGE_SIZES = [10, 15, 20]

export type Operation = {
  code: string
  status: string
  operationType: OperationType
  createdAt: string
}

function OperationList({
  statuses,
  className,
  isExpired = false,
  customerNumber,
  selectedRecords,
  setSelectedRecords,
  count,
}: {
  statuses?: number[]
  className?: string
  isExpired?: boolean
  customerNumber?: string
  setSelectedRecords?: (selectedRecords: Operation[]) => void
  selectedRecords?: Operation[]
  count: number
}) {
  const [sorting, setSorting] = useState<DataTableSortStatus<Operation>>({
    columnAccessor: "createdAt",
    direction: "desc",
  })
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [assignedWorkerFilter, setAssignedWorkerFilter] = useState("")
  const [companyIdFilter, setCompanyIdFilter] = useState<string | null>(null)
  const [debouncedAssignedWorker] = useDebouncedValue(assignedWorkerFilter, 300)
  const [createdAtRange, setCreatedAtRange] = useState<DatesRangeValue>()
  const [operationTypes, setOperationTypes] = useState<string[] | undefined>()

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: [
      `operations`,
      statuses,
      page,
      pageSize,
      `${sorting.columnAccessor}-${sorting.direction}`,
      debouncedAssignedWorker,
      createdAtRange,
      operationTypes,
      companyIdFilter,
    ],
    queryFn: () => {
      const params = new URLSearchParams()

      for (const status of statuses || []) {
        params.append("statuses", status.toString())
      }

      // if (sorting.length > 0) {
      //   params.set('sort', JSON.stringify(sorting))
      // }

      params.set("page", page.toString())
      params.set("limit", pageSize.toString())
      params.set("sort", `${sorting.columnAccessor}-${sorting.direction}`)

      if (debouncedAssignedWorker) {
        params.set("assignedWorkerId", debouncedAssignedWorker)
      }

      if (createdAtRange) {
        if (createdAtRange[0]) {
          params.set("createdAtFrom", createdAtRange[0].toISOString())
        }
        if (createdAtRange[1]) {
          params.set("createdAtTo", createdAtRange[1].toISOString())
        }
      }

      if (operationTypes) {
        for (const operationType of operationTypes) {
          params.append("operationType", operationType)
        }
      }

      if (isExpired) {
        params.append("isExpiredExchange", "true")
      }

      if (customerNumber) {
        params.append("customerNumber", customerNumber)
      }

      if (companyIdFilter) {
        params.append("companyId", companyIdFilter)
      }

      return fetch(`/api/operation?${params.toString()}`).then((res) => res.json())
    },
  })

  useEffect(() => {
    if (count > 0) {
      refetch()
    }
  }, [count, refetch])

  const t = useTranslations("OperationForm")

  const columns: DataTableColumn<Operation>[] = [
    {
      accessor: "code",
      title: t("id"),
      sortable: true,
      render: ({ code }) => <Link href={`/jp/operation/${code}`}>{code}</Link>,
    },
    {
      accessor: "status",
      title: t("status"),
      // filter: (
      //   <Select
      //     placeholder={t("status")}
      //     clearable={true}
      //     value={status}
      //     onChange={(e) => setStatus(e)}
      //     data={[
      //       { value: "1", label: t("draft") },
      //       { value: "2", label: t("requested") },
      //       { value: "3", label: t("approved") },
      //       { value: "4", label: t("rejected") },
      //       { value: "5", label: t("ongoing") },
      //       { value: "6", label: t("completed") },
      //     ]}
      //   ></Select>
      // ),
      // filtering: assignedWorkerFilter !== "",
    },
    {
      accessor: "operationType",
      title: t("operationType"),
      render: ({ operationType }) => operationType,
      sortable: true,
      filter: (
        <MultiSelect
          placeholder={t("operationType")}
          clearable={true}
          value={operationTypes}
          onChange={(e) => setOperationTypes(e)}
          data={[
            { value: "1", label: t("operationType1") },
            { value: "2", label: t("operationType2") },
            { value: "3", label: t("operationType3") },
            { value: "4", label: t("operationType4") },
            { value: "5", label: t("operationType5") },
          ]}
        ></MultiSelect>
      ),
      filtering: operationTypes && operationTypes.length > 0,
    },
    {
      accessor: "assignedWorkerId",
      title: t("assignedWorker"),
      filter: (
        <TextInput
          placeholder="search..."
          leftSection={<IconSearch size={16} />}
          rightSection={
            <ActionIcon
              size="sm"
              variant="transparent"
              c="dimmed"
              onClick={() => setAssignedWorkerFilter("")}
            >
              <IconX size={14} />
            </ActionIcon>
          }
          value={assignedWorkerFilter}
          onChange={(e) => setAssignedWorkerFilter(e.currentTarget.value)}
        />
      ),
      filtering: assignedWorkerFilter !== "",
    },
    {
      accessor: "company.name",
      title: t("company"),
      filter: ({ close }) => (
        <Stack>
          <CompanySelectNoForm
            name={"companyId"}
            value={companyIdFilter}
            onChange={(value) => setCompanyIdFilter(value)}
            label={t("company")}
          />
        </Stack>
      ),
      filtering: companyIdFilter !== null,
    },
    {
      accessor: "createdBy",
      title: t("createdBy"),
    },
    {
      accessor: "createdAt",
      title: t("createdAt"),
      textAlign: "right",
      sortable: true,
      filter: ({ close }) => (
        <Stack>
          <DatePicker
            maxDate={new Date()}
            type="range"
            value={createdAtRange}
            onChange={setCreatedAtRange}
          />
          <Button
            disabled={!createdAtRange}
            variant="light"
            onClick={() => {
              setCreatedAtRange(undefined)
              close()
            }}
          >
            Clear
          </Button>
        </Stack>
      ),
      filtering: Boolean(createdAtRange),
    },
    {
      accessor: "customerNumber",
      title: t("customerNumber"),
    },
    {
      accessor: "memo",
      title: t("memo"),
    },
    {
      accessor: "scheduledDate",
      title: t("scheduledDate"),
    },
    {
      accessor: "scheduledTime",
      title: t("scheduledTime"),
    },
    {
      accessor: "postcardStartDate",
      title: t("postcardStartDate"),
    },
    {
      accessor: "postcardEndDate",
      title: t("postcardEndDate"),
    },
    {
      accessor: "attendance",
      title: t("attendance"),
    },
    {
      accessor: "removingMeterNumber",
      title: t("removingMeterNumber"),
    },
    {
      accessor: "removingMeterInspectionDate",
      title: t("removingMeterInspectionDate"),
    },
    {
      accessor: "referenceDate",
      title: t("referenceDate"),
    },
    {
      accessor: "installingMeterSize",
      title: t("installingMeterSize"),
    },
    {
      accessor: "installingMeterModel",
      title: t("installingMeterModel"),
    },
    {
      accessor: "installingMeterNumber",
      title: t("installingMeterNumber"),
    },
  ]

  const records = (data?.data || []).map((item: any) => ({
    ...item,
    code: item.code,
    status: t(getOperationStateName(item.status).toLowerCase()),
    assignedWorkerId: item.assignedWorkerId,
    operationType: getOperationType(item.operationType),
    isExpiredExchange: item.isExpiredExchange ? "✓" : "✗",
    createdAt: formatDate(item.createdAt),
    scheduledDate: formatDay(item.scheduledDate),
    postcardStartDate: formatDay(item.postcardStartDate),
    postcardEndDate: formatDay(item.postcardEndDate),
    removingMeterInspectionDate: formatDay(item.removingMeterInspectionDate),
    // updatedAt: formatDate(item.updatedAt),
  }))

  return (
    <>
      <Grid className={className}>
        <Grid.Col span={12}>
          <Box pos="relative">
            <LoadingOverlay
              visible={isLoading}
              zIndex={1000}
              overlayProps={{ radius: "sm", blur: 2 }}
            />

            <DataTable
              idAccessor="code"
              withColumnBorders={true}
              withTableBorder={true}
              striped
              paginationActiveBackgroundColor="grape"
              borderRadius="sm"
              highlightOnHover
              records={records}
              totalRecords={data?.total || 0}
              columns={columns}
              page={page}
              recordsPerPage={pageSize}
              onPageChange={(p) => setPage(p)}
              recordsPerPageOptions={PAGE_SIZES}
              onRecordsPerPageChange={setPageSize}
              sortStatus={sorting}
              {...(selectedRecords && {
                selectedRecords: selectedRecords,
                onSelectedRecordsChange: setSelectedRecords,
              })}
            />
          </Box>
        </Grid.Col>
      </Grid>
    </>
  )
}

export default OperationList
