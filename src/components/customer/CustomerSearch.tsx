import { transformCustomerData } from "@/utils/converters"
import { Button, Modal, TextInput } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useQuery } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { SetStateAction, useState } from "react"
import { DataTable } from "mantine-datatable"

export const CustomerSearch = ({ onSuccess }: { onSuccess: (data: any) => void }) => {
  const t = useTranslations("OperationForm")
  const [selectionProcess, setSelectionProcess] = useState(false)

  const [customerNumberInput, setCustomerNumberInput] = useState("")
  const [meterNumberInput, setMeterNumberInput] = useState("")
  const [phoneNumberInput, setPhoneNumberInput] = useState("")
  const [codeInput, setCodeInput] = useState("")

  const [customerNumber, setCustomerNumber] = useState("")
  const [meterNumber, setMeterNumber] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [code, setCode] = useState("")
  const [opened, { open, close }] = useDisclosure(false);


  const columns = [
    {
      accessor: "customerNumber",
      title: t("customerNumber"),
    },
    {
      accessor: "address",
      title: t("address"),
    },
  ]


  const [selectionData, setSelectionData] = useState([])

  const {
    isLoading,
    isError,
    data,
    refetch,
  } = useQuery({
    queryKey: [`customer-search`, customerNumber, meterNumber, phoneNumber],
    queryFn: async () => {
      if (customerNumber === "") {
        return null
      }

      const result = await fetch(`/api/customer-search?customerNumber=${customerNumber}`)
      return result.json()
    },
    cacheTime: 0,
    onSuccess: (data) => {
      if (data) {
        if (data.length === 1) {
          onSuccess(transformCustomerData(data[0]))
          reset()
        } else {
          setSelectionData(data)
          setSelectionProcess(true)
        }
      }
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })

  const handleCustomerNumberChange = (event: {
    target: { value: SetStateAction<string> }
  }) => {
    setCustomerNumberInput(event.target.value)
  }

  const handleMeterNumberChange = (event: {
    target: { value: SetStateAction<string> }
  }) => {
    setMeterNumberInput(event.target.value)
  }

  const handlePhoneNumberChange = (event: {
    target: { value: SetStateAction<string> }
  }) => {
    setPhoneNumberInput(event.target.value)
  }

  const handleSearchClick = () => {
    if (customerNumberInput === "") {
      return
    }

    setCustomerNumber(customerNumberInput)
    setMeterNumber(customerNumberInput)
    setPhoneNumber(customerNumberInput)
  }

  const reset = () => {
    setCustomerNumberInput("")
    setMeterNumberInput("")
    setPhoneNumberInput("")
    setCodeInput("")
    setSelectionProcess(false)
    setSelectionData([])
  }

  return (
    <div className="pt-5">
      <Modal opened={opened} onClose={close} title={t("customerSearch")}>
        <>
          { selectionProcess === false && (
            <div className="flex gap-3 flex-col">
              <TextInput
                value={customerNumberInput}
                onChange={handleCustomerNumberChange}
                label={t("customerNumber")}
              />
              <TextInput
                value={meterNumberInput}
                onChange={handleMeterNumberChange}
                label={t("meterNumber")}
              />
              <TextInput
                value={phoneNumberInput}
                onChange={handlePhoneNumberChange}
                label={t("phoneNumber")}
              />
              <TextInput
                value={codeInput}
                onChange={(event) => setCodeInput(event.target.value)}
                label={t("code")}
                maxLength={5}
                w={100}
              />
              <Button onClick={handleSearchClick} className="mt-3">
                {t("search")}
              </Button>
            </div>
            )
          }

          { selectionProcess === true && (
            <div>
              <DataTable
                idAccessor={"customerNumber"}
                withTableBorder={false}
                striped
                borderRadius="sm"
                highlightOnHover
                records={selectionData || []}
                columns={columns}
                onRowClick={({ record }) => {
                  onSuccess(transformCustomerData(record))
                  reset()
                  close()
                }}
              />
            </div>
          )}
        </>
      </Modal>

      <Button onClick={open}>{ t("customerSearch") }</Button>
      {/* <CustomerFirst /> */}
    </div>
  )
}
