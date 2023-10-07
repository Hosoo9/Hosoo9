"use client"

import { Button, Select, Table, TextInput } from "@mantine/core"
import { DatePickerInput } from "@mantine/dates"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { useState } from "react"

export default function dataOfOperation({ params }: { params: { code: string } }) {
  const t = useTranslations("OperationForm")

  const queryClient = useQueryClient()

  const [contactType, setContactType] = useState<string | null>("")
  const [liaisonWorker, setLiaisonWorker] = useState<string | null>("")
  const [contactedAt, setContactedAt] = useState<Date | null>(null)
  const [details, setDetails] = useState("")

  type ContactItem = {
    contactType: string
    liaisonWorker: string
    contactedAt: any
    details: string
  }

  const {
    isLoading: loadingContact,
    error: errorContact,
    data: dataContact,
  } = useQuery({
    queryKey: ["contact"],
    queryFn: () =>
      fetch(`/api/contact?operationCode=${params.code}`).then((res) => res.json()),
  })

  const handleSubmit = () => {
    const operationId = dataOperation.id
    console.log(dataOperation, "DATA OP")
    const createContact = {
      operationId,
      contactType,
      contactedAt,
      details,
      liaisonWorker,
    }
    console.log(createContact, "CREATE CONT")
    createContactMutateAsync(createContact)
  }

  const {
    isLoading,
    isSuccess,
    error,
    mutateAsync: createContactMutateAsync,
  } = useMutation({
    mutationFn: (createContact: ContactItem) => {
      return fetch("/api/contact", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createContact),
      })
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["contact"])
    },
  })

  // const addContact = { setContactType, setDateAndTimeOfContact, setDetail, setLiaisonWorker }

  // const saveContact = async (values: ContactItem) => {
  //   const result = await mutateAsync(values)

  //   router.push("/dashboard")
  // }

  //using saveContact to fill table

  // const addRows = ()= >{}

  if (isLoading) {
    ;<h1>Loading....</h1>
  } else if (isSuccess) {
    ;<h1>Successed</h1>
  } else if (error) {
    ;<h1>"Error occured:", error</h1>
  }

  const {
    isLoading: loadingOperation,
    error: errorOperation,
    data: dataOperation,
  } = useQuery({
    queryKey: ["operation"],
    queryFn: () => fetch(`/api/operation/${params.code}`).then((res) => res.json()),
  })

  if (loadingContact || loadingOperation) return <div>Loading...</div>
  if (errorContact || errorOperation) return "An error has occurred: " + errorContact

  // console.log(dataContact)
  // const { mutate: }

  const rows = dataContact.map((dataContact: any, index: number) => (
    <tr key={index}>
      <td>{dataContact.contactType}</td>
      <td>{dataContact.liaisonWorker}</td>
      <td>{dataContact.createdAt}</td>
      <td>{dataContact.details}</td>
    </tr>
  ))

  return (
    // <h1>{JSON.stringify(data)}</h1>
    <div>
      <Table striped withColumnBorders>
        <thead>
          <tr>
            <th>{t("contactType")}</th>
            <th>{t("liaisonWorker")}</th>
            <th>{t("contactedAt")}</th>
            <th>{t("details")}</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      <div className="grid grid-cols-5 gap-3">
        <div className="col-span-1">
          <Select
            label={t("contactType")}
            data={[
              { value: "1", label: "contactType1" },
              { value: "2", label: "contactType2" },
            ]}
            value={contactType}
            onChange={setContactType}
          ></Select>
        </div>
        <div className="col-span-1">
          <Select
            label={t("liaisonWorker")}
            data={[
              { value: "Worker1", label: "Worker1" },
              { value: "Worker2", label: "Worker2" },
            ]}
            value={liaisonWorker}
            onChange={setLiaisonWorker}
          ></Select>
        </div>
        <div className="col-span-1">
          <DatePickerInput
            label={t("contactedAt")}
            value={contactedAt}
            onChange={setContactedAt}
            mx="auto"
          />
        </div>
        <div className="col-span-1">
          <TextInput
            label={t("details")}
            placeholder={t("details")}
            value={details}
            onChange={(event) => setDetails(event.currentTarget.value)}
          />
        </div>
        <div className="flex items-end">
          <Button onClick={handleSubmit}>Button</Button>
        </div>
      </div>
    </div>
  )
}

function mutateAsync(values: {
  contactType: string
  liaisonWorker: string
  contactedAt: any
  details: string
}) {
  throw new Error("Function not implemented.")
}

// const handleSubmit = () => {
//   const createContact = {
//     setContactType,
//     setDateAndTimeOfContact,
//     setDetail,
//     setLiaisonWorker,
//   }
// }

// const reset = () => {
//   setContactType(null)
//   setLiaisonWorker(null)
//   setDateAndTimeOfContact(null)
//   setDetail("")
// }

// const addContact = () => {
//   if (
//     contactType === null ||
//     liaisonWorker === null ||
//     dateAndTimeOfContact === null ||
//     detail === null
//   ) {
//     return
//   }

//   const addContact = {
//     contactType: contactType,
//     liaisonWorker: liaisonWorker,
//     dateAndTimeOfContact: dateAndTimeOfContact,
//     detail: detail,

// createContact(contactType,liaisonWorker,dateAndTimeOfContact,detail)
//   }
// }

// <h1>{JSON.stringify(data)}</h1>

//   const res = fetch(`/api/operation/${params.code}`)
//   const data = res.json()
//   return <h1>{data}</h1>
// }

// const { isLoading, error, data } = useQuery({
//   queryKey: ["operations"],
//   queryFn: () => fetch("/api/operation").then((res) => res.json()),
// })
