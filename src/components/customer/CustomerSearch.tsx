import { transformCustomerData } from "@/utils/converters"
import { Button, Modal, TextInput } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useQuery } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { SetStateAction, useState } from "react"
import { DataTable } from "mantine-datatable"
import Link from "next/link"

export const CustomerSearch = ({ onSuccess, selectedCustomerNumber }: { selectedCustomerNumber?: string, onSuccess: (data: any) => void }) => {
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
  const [opened, { open, close }] = useDisclosure(false)

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

  const successWrapper = (data: any) => {
    if (data === null) {
      onSuccess(null)
    } else {
      onSuccess(transformCustomerData(data))
    }
  }

  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: [`customer-search`, customerNumber, meterNumber, phoneNumber, code],
    queryFn: async () => {
      if (
        customerNumber === "" &&
        meterNumber === "" &&
        phoneNumber === "" &&
        code === ""
      ) {
        return null
      }

      const params = new URLSearchParams()

      if (customerNumber) {
        params.append("customerNumber", customerNumber)
      }

      if (meterNumber) {
        params.append("meterNumber", meterNumber)
      }

      if (phoneNumber) {
        params.append("phoneNumber", phoneNumber)
      }

      if (code) {
        params.append("code", code)
      }

      const result = await fetch(`/api/customer-search?${params.toString()}`)
      return result.json()
    },
    cacheTime: 0,
    onSuccess: (data) => {
      if (data) {
        if (data.length <= 1) {
          if (data.length === 0) {
            successWrapper(null)
            reset()
            close()
          } else {
            successWrapper(data[0])
            reset()
            close()
          }
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
    setCustomerNumber(customerNumberInput)
    setMeterNumber(meterNumberInput)
    setPhoneNumber(phoneNumberInput)
    setCode(codeInput)
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
          {selectionProcess === false && (
            <div className="flex flex-col gap-3">
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
          )}

          {selectionProcess === true && (
            <div>
              <DataTable
                idAccessor={"customerNumber"}
                withTableBorder={false}
                striped
                borderRadius="sm"
                highlightOnHover
                records={selectionData || []}
                columns={columns}
                onRowClick={({ record }: { record: any }) => {
                  onSuccess(() => {
                    successWrapper(record)
                  })
                  reset()
                  close()
                }}
              />
            </div>
          )}
        </>
      </Modal>

      <div className="flex justify-between">
        <Button onClick={open}>{t("customerSearch")}</Button>

        {selectedCustomerNumber !== "" && selectedCustomerNumber !== undefined && (
          <Button
            color="violet"
            component={Link}
            href={`/operation/new?customerNumber=${selectedCustomerNumber}`}
          >
            {t("create")}
          </Button>
        )}
      </div>
      {/* <CustomerFirst /> */}
    </div>
  )
}
