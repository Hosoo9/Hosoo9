"use client"

import { Button, Select, Table, TextInput } from "@mantine/core"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { useId, useState } from "react"

export default function InviteUsers() {
  const t = useTranslations("OperationForm")
  const id = useId()

  const queryClient = useQueryClient()

  const [name, setName] = useState<string | null>("")
  const [email, setEmail] = useState<string | null>("")
  const [userRole, setUserRole] = useState<string | null>("")

  type inviteItem = {
    name: null
    email: null
    status: "Pending"
    userRole: null
  }

  //POST TO DB
  const handleSubmit = () => {
    const inviteUser = {
      name,
      email,
      status: "Pending",
      userRole,
    }
    console.log(inviteUser, "CREATE COMPANY")

    inviteUserMutateAsync(inviteUser)
  }

  const {
    isLoading,
    isSuccess,
    error,
    mutateAsync: inviteUserMutateAsync,
  } = useMutation({
    mutationFn: (inviteUser: inviteItem) => {
      return fetch("/api/auth/invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inviteUser),
      })
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["inviteUser"])
    },
  })

  // GETTING DATA FROM INVITED USER - INVITE TABLE
  const {
    isLoading: invitedLoading,
    error: invitedError,
    data: invitedData,
  } = useQuery({
    queryKey: ["invitedUser"],
    queryFn: () => fetch(`/api/auth/invite`).then((res) => res.json()),
  })

  // GETTING DATA FROM APPROVED USER - USERS TABLE
  const {
    isLoading: approvedLoading,
    error: approvedError,
    data: approvedData,
  } = useQuery({
    queryKey: ["approvedUser"],
    queryFn: () => fetch(`/api/admin/users`).then((res) => res.json()),
  })

  if (invitedLoading) return <h1> Invited User Loading</h1>
  //   if (invitedError) return <h1>"Invited User Error" + {invitedError} </h1>

  if (approvedLoading) return <h1> Approved User Loading</h1>
  //   if (approvedError) return <h1>"Invited User Error" + {approvedError} </h1>

  if (isLoading) {
    ;<h1>Loading....</h1>
  } else if (isSuccess) {
    ;<h1>Successed</h1>
  } else if (error) {
    ;<h1>"Error occured:", error</h1>
  }

  const InvitedRows = (invitedData || []).map((invitedData: any, index: number) => (
    <tr key={index}>
      <td>{invitedData.name}</td>
      <td>{invitedData.email}</td>
      <td>{invitedData.status}</td>
      <td>{invitedData.userRole}</td>
    </tr>
  ))
  const approvedRows = (approvedData || []).map((approvedData: any, index: number) => (
    <tr key={index}>
      <td>{approvedData.name}</td>
      <td>{approvedData.email}</td>
      <td>{approvedData.status}</td>
      <td>{approvedData.userRole}</td>
    </tr>
  ))

  return (
    <div>
      <div className="grid grid-cols-4 gap-3">
        <div className="col-span-1">
          <TextInput
            label="Your name"
            onChange={(event) => setName(event.currentTarget.value)}
          />
        </div>
        <div className="col-span-1">
          <TextInput
            label="Your email"
            onChange={(event) => setEmail(event.currentTarget.value)}
          />
        </div>
        <div className="col-span-1">
          <Select
            label="Role"
            data={[
              { value: "Manager", label: "Manager" },
              { value: "User", label: "User" },
            ]}
            // value={userRole}
            onChange={setUserRole}
          ></Select>
        </div>
        <div className="col-span-1 flex items-end">
          <Button onClick={handleSubmit}>Send Invite</Button>
        </div>
      </div>
      <h1> INVITED</h1>
      <Table striped withColumnBorders>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>{InvitedRows}</tbody>
      </Table>
      <h1> USERS</h1>
      <Table striped withColumnBorders>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>{approvedRows}</tbody>
      </Table>
    </div>
  )
}

function mutateAsync(values: { name: string; email: string }) {
  throw new Error("Function not implemented.")
}
