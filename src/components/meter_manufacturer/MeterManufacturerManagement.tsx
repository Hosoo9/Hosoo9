"use client"

import { LoaderComponent } from "@/components/Provider"
import MeterManufacturerForm from "@/components/meter_manufacturer/MeterManufacturerForm"
import {
  ActionIcon,
  Box,
  Button,
  Center,
  Container,
  Drawer,
  Grid,
  Group,
  Text,
  Title,
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { modals } from "@mantine/modals"
import { notifications } from "@mantine/notifications"
import { IconClick, IconEdit, IconTrash } from "@tabler/icons-react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { DataTable, DataTableColumn } from "mantine-datatable"
import { useTranslations } from "next-intl"
import { useState } from "react"

type MeterManufacturer = {
  id: string
  code: string
}

export default function MeterManufacturerManagament() {
  const { isLoading, error, data, refetch } = useQuery<MeterManufacturer[]>({
    queryKey: [],
    queryFn: async () => {
      const response = await fetch(`/api/meter_manufacturers`)
      return response.json()
    },
  })

  const [opened, { open, close }] = useDisclosure(false)
  const [meterManufacturer, setMeterManufacturer] = useState<MeterManufacturer | null>(
    null,
  )

  const t = useTranslations("OperationForm")

  const {
    isLoading: isResetLoading,
    isSuccess: isResetSuccess,
    error: isResetError,
    mutateAsync: resetPassword,
  } = useMutation({
    mutationFn: (meterManufacturerId: string) => {
      return fetch(`/api/meter_manufacturers/${meterManufacturerId}`, {
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

  const renderActions: DataTableColumn<MeterManufacturer>["render"] = (record) => (
    <Group gap={4} justify="right" wrap="nowrap">
      <ActionIcon
        size="sm"
        variant="transparent"
        onClick={(e) => {
          e.stopPropagation()

          setMeterManufacturer(record)
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

  const columns = [
    {
      accessor: "code",
      title: t("code"),
    },
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

  const createMeterManufacturer = () => {
    setMeterManufacturer(null)
    open()
  }

  const onSave = async () => {
    await refetch()

    close()
  }

  const openDeleteModal = (record: MeterManufacturer) => {
    modals.openConfirmModal({
      title: `${t("delete")} ${t("meterManufacturer")}`,
      centered: true,
      children: (
        <Text size="sm">
          { t("areYouSureToDelete") }
        </Text>
      ),
      labels: { confirm: t("delete"), cancel: t("cancel")},
      confirmProps: { color: 'red' },
      onConfirm: () => resetPassword(record.id),
    })
  }

  return (
    <Container fluid>
      {isLoading ? (
        <LoaderComponent />
      ) : (
        <div className="py-5">
          <div className="flex items-center justify-between pb-5">
            <Title order={1} size="h4">
              {t("meterManufacturerManagement")}
            </Title>

            <Button onClick={createMeterManufacturer}>{t("create")}</Button>
          </div>

          <Drawer
            opened={opened}
            onClose={close}
            title={meterManufacturer ? t("edit") : t("create")}
            position="right"
          >
            <MeterManufacturerForm
              meterManufacturer={meterManufacturer}
              onSave={onSave}
            />
          </Drawer>

          <Grid className="py-5">
            <Grid.Col span={12}>
              <Box pos="relative">
                <DataTable
                  withTableBorder={false}
                  striped
                  borderRadius="sm"
                  highlightOnHover
                  records={data || []}
                  columns={columns}
                  idAccessor="id"
                />
              </Box>
            </Grid.Col>
          </Grid>
        </div>
      )}
    </Container>
  )
}
