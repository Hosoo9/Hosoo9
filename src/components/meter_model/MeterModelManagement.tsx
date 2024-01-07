"use client"

import { LoaderComponent } from "@/components/Provider"
import MeterModelForm from "@/components/meter_model/MeterModelForm"
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

type MeterModel = {
  id: string
  code: string
}

export default function MeterModelManagament() {
  const { isLoading, error, data, refetch } = useQuery<MeterModel[]>({
    queryKey: [],
    queryFn: async () => {
      const response = await fetch(`/api/meter_models`)
      return response.json()
    },
  })

  const [opened, { open, close }] = useDisclosure(false)
  const [meterModel, setMeterModel] = useState<MeterModel | null>(
    null,
  )

  const t = useTranslations("OperationForm")

  const {
    isLoading: isResetLoading,
    isSuccess: isResetSuccess,
    error: isResetError,
    mutateAsync: resetPassword,
  } = useMutation({
    mutationFn: (meterModelId: string) => {
      return fetch(`/api/meter_models/${meterModelId}`, {
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

  const renderActions: DataTableColumn<MeterModel>["render"] = (record) => (
    <Group gap={4} justify="right" wrap="nowrap">
      <ActionIcon
        size="sm"
        variant="transparent"
        onClick={(e) => {
          e.stopPropagation()

          setMeterModel(record)
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
      accessor: "name",
      title: t("name"),
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

  const createMeterModel = () => {
    setMeterModel(null)
    open()
  }

  const onSave = async () => {
    await refetch()

    close()
  }

  const openDeleteModal = (record: MeterModel) => {
    modals.openConfirmModal({
      title: `${t("delete")} ${t("meterModel")}`,
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
              {t("meterModelManagement")}
            </Title>

            <Button onClick={createMeterModel}>{t("create")}</Button>
          </div>

          <Drawer
            opened={opened}
            onClose={close}
            title={meterModel ? t("edit") : t("create")}
            position="right"
          >
            <MeterModelForm
              meterModel={meterModel}
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
