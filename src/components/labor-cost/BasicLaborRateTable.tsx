import {
  getBlrMeterType,
  getBlrOperationType,
  getBlrDistrictType,
  getBlrExchangeType,
  getBlrMeterSizeType,
  getBlrWorkingTime,
} from "@/lib/enum/basic-labor-rate"
import { ActionIcon, Button, Center, Drawer, Group, Text } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { modals } from "@mantine/modals"
import { notifications } from "@mantine/notifications"
import { IconClick, IconEdit, IconTrash } from "@tabler/icons-react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { DataTable, DataTableColumn } from "mantine-datatable"
import { useTranslations } from "next-intl"
import { useState } from "react"
import BasicLaborRateForm from "./BasicLaborRateForm"
import { LoaderComponent } from "../Provider"

type BasicLaborRate = {
  code: string
  operationType: number
  meterType: number | null
  exchangeType: number | null
  workingTime: number | null
  meterSizeType: number | null
  districtType: number | null
  rate: number
  createdAt: string
  updatedAt: string
}

export default function BasicLaborRateTable({}: {}) {
  const t = useTranslations("OperationForm")

  const [page, setPage] = useState(1)
  const pageSize = 10
  const [opened, { open, close }] = useDisclosure(false)

  const [basicLaborRate, setBasicLaborRate] = useState<BasicLaborRate | null>(null)

  const { isLoading, error, data, refetch } = useQuery<{
    total: number
    data: BasicLaborRate[]
  }>({
    queryKey: ["basic-labor-rate", page],
    queryFn: async () => {
      const params = new URLSearchParams()
      params.set("page", page.toString())

      const response = await fetch(`/api/basic-labor-rate?${params.toString()}`)
      return response.json()
    },
  })

  const {
    isLoading: isDeleteLoading,
    isSuccess: isDeleteSuccess,
    error: isDeleteError,
    mutateAsync: deleteRecord,
  } = useMutation({
    mutationFn: (code: string) => {
      return fetch(`/api/basic-labor-rate/${code}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
    },
    onSuccess: async () => {
      await refetch()
      notifications.show({
        message: t("deleted"),
      })
    },
    onError: () => {
      notifications.show({
        message: t("deleteFailed"),
        color: "red",
      })
    },
  })

  const renderActions: DataTableColumn<BasicLaborRate>["render"] = (record) => (
    <Group gap={4} justify="right" wrap="nowrap">
      <ActionIcon
        size="sm"
        variant="transparent"
        onClick={(e) => {
          e.stopPropagation()

          setBasicLaborRate(record)
          // setMeterSize(record)
          open()
        }}
      >
        <IconEdit size={16} />
      </ActionIcon>
      <ActionIcon
        size="sm"
        color="red"
        variant="transparent"
        onClick={(e) => {
          e.stopPropagation()

          openDeleteModal(record)
        }}
      >
        <IconTrash size={16} />
      </ActionIcon>
    </Group>
  )

  const openDeleteModal = (record: BasicLaborRate) => {
    modals.openConfirmModal({
      title: `${t("delete")}`,
      centered: true,
      children: <Text size="sm">{t("areYouSureToDelete")}</Text>,
      labels: { confirm: t("delete"), cancel: t("cancel") },
      confirmProps: { color: "red" },
      onConfirm: () => deleteRecord(record.code),
    })
  }

  const columns: DataTableColumn<BasicLaborRate>[] = [
    { accessor: "code", title: "単価コード" },
    {
      accessor: "operationType",
      title: t("blrOperationType"),
      render: ({ operationType }) => getBlrOperationType(operationType),
    },
    {
      accessor: "meterType",
      title: t("blrMeterType"),
      render: ({ meterType }) => getBlrMeterType(meterType),
    },
    {
      accessor: "exchangeType",
      title: t("blrExchangeType"),
      render: ({ exchangeType }) => getBlrExchangeType(exchangeType),
    },
    {
      accessor: "workingTime",
      title: t("blrWorkingTime"),
      render: ({ workingTime }) => getBlrWorkingTime(workingTime),
    },
    {
      accessor: "meterSizeType",
      title: t("blrMeterSizeType"),
      render: ({ meterSizeType }) => getBlrMeterSizeType(meterSizeType),
    },
    {
      accessor: "districtType",
      title: t("blrDistrictType"),
      render: ({ districtType }) => getBlrDistrictType(districtType),
    },
    { accessor: "rate", title: t("blrRate") },
    {
      accessor: "actions",
      title: (
        <Center>
          <IconClick size={16} />
        </Center>
      ),
      width: "0%", // 👈 use minimal width
      render: renderActions,
    },
  ]

  const onSave = async () => {
    await refetch()

    close()
  }

  const createNew = () => {
    setBasicLaborRate(null)
    open()
  }

  return (
    <div className="py-5">
      {isLoading ? (
        <LoaderComponent />
      ) : (
        <>
          <div className="flex justify-between">
            <div></div>
            <Button onClick={createNew}>{t("create")}</Button>
          </div>

          <DataTable
            idAccessor={(record) => record.code}
            totalRecords={data?.total || 0}
            page={page}
            recordsPerPage={pageSize}
            className="py-5"
            withTableBorder={false}
            striped
            borderRadius="sm"
            highlightOnHover
            records={data?.data || []}
            onPageChange={setPage}
            columns={columns}
          />

          <Drawer
            opened={opened}
            onClose={close}
            title={basicLaborRate ? t("edit") : t("create")}
            position="right"
          >
            <BasicLaborRateForm basicLaborRate={basicLaborRate} onSave={onSave} />
          </Drawer>
        </>
      )}
    </div>
  )
}
