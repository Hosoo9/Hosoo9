"use client"

import { LoaderComponent } from "@/components/Provider"
import MeterSizeForm from "@/components/meter_size/MeterSizeForm"
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

type MeterSize = {
  id: string
  code: string
}

export default function MeterSizeManagement() {
  const { isLoading, error, data, refetch } = useQuery<MeterSize[]>({
    queryKey: [],
    queryFn: async () => {
      const response = await fetch(`/api/meter_sizes`)
      return response.json()
    },
  })

  const [opened, { open, close }] = useDisclosure(false)
  const [meterSize, setMeterSize] = useState<MeterSize | null>(
    null,
  )

  const t = useTranslations("OperationForm")

  const {
    isLoading: isResetLoading,
    isSuccess: isResetSuccess,
    error: isResetError,
    mutateAsync: resetPassword,
  } = useMutation({
    mutationFn: (meterSizeId: string) => {
      return fetch(`/api/meter_sizes/${meterSizeId}`, {
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

  const renderActions: DataTableColumn<MeterSize>["render"] = (record) => (
    <Group gap={4} justify="right" wrap="nowrap">
      <ActionIcon
        size="sm"
        variant="transparent"
        onClick={(e) => {
          e.stopPropagation()

          setMeterSize(record)
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

  const createMeterSize = () => {
    setMeterSize(null)
    open()
  }

  const onSave = async () => {
    await refetch()

    close()
  }

  const openDeleteModal = (record: MeterSize) => {
    modals.openConfirmModal({
      title: `${t("delete")} ${t("meterSize")}`,
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
              {t("meterSizeManagement")}
            </Title>

            <Button onClick={createMeterSize}>{t("create")}</Button>
          </div>

          <Drawer
            opened={opened}
            onClose={close}
            title={meterSize ? t("edit") : t("create")}
            position="right"
          >
            <MeterSizeForm
              meterSize={meterSize}
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
