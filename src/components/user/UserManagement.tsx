"use client"

import { LoaderComponent } from "@/components/Provider"
import UserForm from "@/components/user/UserForm"
import { ActionIcon, Box, Button, Center, Container, Drawer, Grid, Group, Text, Title } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { modals } from '@mantine/modals'
import { IconClick, IconEdit, IconLock } from "@tabler/icons-react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { DataTable, DataTableColumn } from "mantine-datatable"
import { useTranslations } from "next-intl"
import { useState } from "react"

type User = {
  id: string
  name: string
  nameKana: string
  role: number
}

export default function UserManagament() {
  const { isLoading, error, data, refetch } = useQuery<User[]>({
    queryKey: [],
    queryFn: async () => {
      const response = await fetch(`/api/admin/users`)
      return response.json()
    },
  })

  const [opened, { open, close }] = useDisclosure(false)
  const [user, setUser] = useState<User | null>(null)

  const t = useTranslations("OperationForm")

  const {
    isLoading: isResetLoading,
    isSuccess: isResetSuccess,
    error: isResetError,
    mutateAsync: resetPassword,
  } = useMutation({
    mutationFn: (userId: string) => {
      return fetch(`/api/admin/users/${userId}/reset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }
      })
    },
  })

  const openResetModal = (record: User) => {
    modals.openConfirmModal({
      title: 'Reset user password',
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to reset this user password?
        </Text>
      ),
      labels: { confirm: 'Reset password', cancel: "Cancel" },
      confirmProps: { color: 'red' },
      onConfirm: () => resetPassword(record.id),
    })
  }

  const renderActions: DataTableColumn<User>['render'] = (record) => (
    <Group gap={4} justify="right" wrap="nowrap">
      <ActionIcon
        size="sm"
        variant="transparent"
        onClick={(e) => {
          e.stopPropagation()

          setUser(record)
          open()
        }}
      >
        <IconEdit size={16} />
      </ActionIcon>
      <ActionIcon
        // loading={isResetLoading}
        size="sm"
        color="red"
        variant="transparent"
        onClick={(e) => {
          e.stopPropagation()

          openResetModal(record)
        }}
      >
        <IconLock size={16} />
      </ActionIcon>
    </Group>
  );

  const columns = [
    {
      accessor: "id",
      title: t("username"),
    },
    {
      accessor: "name",
      title: t("name"),
    },
    {
      accessor: "nameKana",
      title: t("nameKana"),
    },

    {
      accessor: "role",
      title: t("role"),
      render: ({ role }: { role: number }) => t(`role${role}`),
    },
    {
      accessor: 'actions',
      title: (
        <Center>
          <IconClick size={16} />
        </Center>
      ),
      width: '0%', // 👈 use minimal width
      render: renderActions,
    }
  ]

  const createUser = () => {
    setUser(null)
    open()
  }

  const onSave = async () => {
    await refetch()
    close()
  }

  return (
    <Container fluid>
      {isLoading ? (
        <LoaderComponent />
      ) : (
        <div className="py-5">
          <div className="flex items-center justify-between pb-5">
            <Title order={1} size="h4">
              User management
            </Title>

            <Button onClick={createUser}>Create</Button>
          </div>

          <Drawer opened={opened} onClose={close} title={user ? "Edit user" : "Create user"} position="right">
            <UserForm user={user} onSave={onSave} />
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
                />
              </Box>
            </Grid.Col>
          </Grid>
        </div>
      )}
    </Container>
  )
}
