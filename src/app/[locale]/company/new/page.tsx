"use client"

import { Button, Table, TextInput } from "@mantine/core"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { useState } from "react"

export default function creatingCompany({ params }: { params: { code: string } }) {
  const t = useTranslations("OperationForm")

  const queryClient = useQueryClient()

  const [code, setCode] = useState<string | null>("")
  const [name, setName] = useState<string | null>("")

  type CompanyItem = {
    code: null
    name: null
  }



  // POST DATA TO DB
  const handleSubmit = () => {
    const createCompany = {
      code,
      name,
    }
    console.log(createCompany, "CREATE COMPANY")
    createCompanyMutateAsync(createCompany)
  }

  
  const {
    isLoading,
    isSuccess,
    error,
    mutateAsync: createCompanyMutateAsync,
  } = useMutation({
    mutationFn: (createCompany: CompanyItem) => {
      return fetch("/api/admin/company", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createCompany),
      })
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["company"])
    },
  })

  if (isLoading) {
    ;<h1>Loading....</h1>
  } else if (isSuccess) {
    ;<h1>Successed</h1>
  } else if (error) {
    ;<h1>"Error occured:", error</h1>
  }


  // GET DATA FROM DB
  const {
    isLoading: loadingCompany,
    error: errorCompany,
    data: dataCompany,
  } = useQuery({
    queryKey: ["company"],
    queryFn: () => fetch(`/api/admin/company`).then((res) => res.json()),
  })

  if (loadingCompany) return <div>Loading...</div>
  if (errorCompany) return "An error has occurred: " + errorCompany

  // console.log(dataContact)
  // const { mutate: }

  const rows = dataCompany.map((dataCompany: any, index: number) => (
    <tr key={index}>
      <td>{dataCompany.code}</td>
      <td>{dataCompany.name}</td>
    </tr>
  ))

  return (
    <div>
      <Table striped withColumnBorders>
        <thead>
          <tr>
            <th>{t("companyCode")}</th>
            <th>{t("companyName")}</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-1">
          <TextInput
            label={t("companyCode")}
            // value = {companyCode}
            onChange={(event) => setCode(event.currentTarget.value)}
          />
        </div>
        <div className="col-span-1">
          <TextInput
            label={t("companyName")}
            // value={companyName}
            onChange={(event) => setName(event.currentTarget.value)}
          />
        </div>
        <div className="flex items-end">
          <Button onClick={handleSubmit}>Button</Button>
        </div>
      </div>
    </div>
  )
}

function mutateAsync(values: { code: string; name: string }) {
  throw new Error("Function not implemented.")
}
