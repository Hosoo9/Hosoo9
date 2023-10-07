import { Button, Select, Table, TextInput } from "@mantine/core"
import { DatePickerInput } from "@mantine/dates"
import { useQuery } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { useState } from "react"

type ContactItem = {
  contactType: string
  liaisonWorker: string
  dateAndTimeOfContact: any
  detail: string
}

export default function ContactHistory({
  params,
  onNewContact,
  contacts,
}: {
  params: { code: string }
  onNewContact: (input: ContactItem) => any
  contacts: ContactItem[]
}) {
  const t = useTranslations("OperationForm")

  const { isLoading, error, data } = useQuery({
    queryKey: ["operation"],
    queryFn: () => fetch(`/api/operation/${params.code}`).then((res) => res.json()),
  })
  // return <h1>{JSON.stringify(data)}</h1>

  const [contactType, setContactType] = useState<string | null>("")
  const [liaisonWorker, setLiaisonWorker] = useState<string | null>("")
  const [dateAndTimeOfContact, setDateAndTimeOfContact] = useState<string | null>("")
  const [detail, setDetail] = useState<string | null>("")

  const reset = () => {
    setContactType(null)
    setLiaisonWorker(null)
    setDateAndTimeOfContact(null)
    setDetail(null)
  }

  const addContact = () => {
    if (
      contactType === null ||
      liaisonWorker === null ||
      dateAndTimeOfContact === null ||
      detail === null
    ) {
      return
    }

    const newContact: ContactItem = {
      contactType: contactType,
      liaisonWorker: liaisonWorker,
      dateAndTimeOfContact: dateAndTimeOfContact,
      detail: detail,
    }

    // onNewContact(newContact)
    // reset()
  }

  const rows = (data || []).map((data: any, index: number) => (
    <tr key={index}>
      <td>{data.contactType}</td>
      <td>{data.gasType}</td>
      <td>{data.contactedAt}</td>
      <td>{data.details}</td>
    </tr>
  ))

  return (
    <div>
      <Table striped withColumnBorders>
        <thead>
          <tr>
            <th>{t("contactType")}</th>
            <th>{t("liaisonWorker")}</th>
            <th>{t("dateAndTimeOfContact")}</th>
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
              { value: "contactType1", label: "contactType1" },
              { value: "contactType2", label: "contactType2" },
            ]}
            value={contactType || ""}
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
            value={liaisonWorker || ""}
            onChange={setLiaisonWorker}
          ></Select>
        </div>
        <div className="col-span-1">
          <DatePickerInput
            label={t("dateAndTimeOfContact")}
            name="dateAndTimeOfContact"
            // value={dateAndTimeOfContact}
            // onChange={setDateAndTimeOfContact}
            mx="auto"
          />
        </div>
        <div className="col-span-1">
          <TextInput
            label={t("details")}
            placeholder={t("details")}
            // value={detail}
            onChange={(event) => setDetail(event.currentTarget.value)}
          />
        </div>
        <div className="flex items-end">
          <Button onClick={addContact}>Button</Button>
        </div>
      </div>
    </div>
  )
}
