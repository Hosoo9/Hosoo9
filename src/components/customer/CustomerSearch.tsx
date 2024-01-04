import { transformCustomerData } from "@/utils/converters"
import { Button, Modal, TextInput } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { notifications } from "@mantine/notifications"
import { useMutation } from "@tanstack/react-query"
import { DataTable } from "mantine-datatable"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { SetStateAction, useState } from "react"

export const CustomerSearch = ({
  onSuccess,
  selectedCustomerNumber,
}: {
  selectedCustomerNumber?: string
  onSuccess: (data: any) => void
}) => {
  const t = useTranslations("OperationForm")
  const [selectionProcess, setSelectionProcess] = useState(false)

  const [customerNumberInput, setCustomerNumberInput] = useState("")
  const [meterNumberInput, setMeterNumberInput] = useState("")
  const [phoneNumberInput, setPhoneNumberInput] = useState("")
  const [userKataNmInput, setUserKataNmInput] = useState("")
  const [userKataKNmInput, setUserKataKNmInput] = useState("")
  const [addressInput, setAddressInput] = useState("")
  const [municipalityInput, setMunicipalityInput] = useState("")
  const [houseNoInput, setHouseNoInput] = useState("")
  const [streetNoInput, setStreetNoInput] = useState("")
  const [userSpecialNo, setUserSpecialNo] = useState("")
  const [disaReblkCdInput, setDisaReblkCdInput] = useState("")

  const [opened, { open, close }] = useDisclosure(false)

  const columns = [
    {
      accessor: "customerNumber",
      title: t("customerNumber"),
    },
    {
      accessor: "municipality",
      title: t("municipalities"),
    },
    {
      accessor: "address",
      title: t("address"),
    },
    {
      accessor: "buildingNameRoomNumber",
      title: t("buildingNameRoomNumber"),
    },
    {
      accessor: "name",
      title: t("name"),
    },
    {
      accessor: "contactTel",
      title: t("phoneNumber"),
    },
    {
      accessor: "meterNo",
      title: t("meterNumber"),
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

  const { isLoading, isError, mutateAsync, data } = useMutation({
    mutationFn: async (body: any) => {
      const result = await fetch(`/api/customer-search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })

      return result.json()
    },
    onSuccess: (data) => {
      if (data) {
        if (data.length <= 1) {
          if (data.length === 0) {
            notifications.show({
              message: "No data found",
            })
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

  const handleSearchClick = async () => {
    await mutateAsync({
      customerNumber: customerNumberInput,
      meterNumber: meterNumberInput,
      phoneNumber: phoneNumberInput,
      userKataNm: userKataNmInput,
      userKataKNm: userKataKNmInput,
      address: addressInput,
      municipality: municipalityInput,
      houseNo: houseNoInput,
      streetNo: streetNoInput,
      userSpecialNo: userSpecialNo,
      disaReblkCd: disaReblkCdInput,
    })
  }

  const reset = () => {
    setCustomerNumberInput("")
    setMeterNumberInput("")
    setPhoneNumberInput("")
    setUserKataNmInput("")
    setUserKataKNmInput("")
    setAddressInput("")
    setMunicipalityInput("")
    setHouseNoInput("")
    setStreetNoInput("")
    setUserSpecialNo("")
    setDisaReblkCdInput("")
    setSelectionProcess(false)
    setSelectionData([])
  }

  const openModal = () => {
    reset()
    open()
  }

  return (
    <div className="pt-5">
      <Modal size="xl" opened={opened} onClose={close} title={t("customerSearch")}>
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
              <div className="flex gap-3">
                <TextInput
                  value={userKataNmInput}
                  onChange={(event) => setUserKataNmInput(event.target.value)}
                  label={"商屋号名(漢字)"}
                  maxLength={20}
                />
                <TextInput
                  value={userKataKNmInput}
                  onChange={(event) => setUserKataKNmInput(event.target.value)}
                  label={"商屋号名(ｶﾅ)"}
                  maxLength={20}
                />
              </div>
              <div className="flex gap-3">
                <TextInput
                  value={municipalityInput}
                  onChange={(event) => setMunicipalityInput(event.target.value)}
                  label={t("municipalities")}
                />
                <TextInput
                  value={addressInput}
                  onChange={(event) => setAddressInput(event.target.value)}
                  label={t("address")}
                />
                <TextInput
                  value={streetNoInput}
                  onChange={(event) => setStreetNoInput(event.target.value)}
                  label={"街区"}
                />

                <TextInput
                  value={houseNoInput}
                  onChange={(event) => setHouseNoInput(event.target.value)}
                  label={"番号"}
                />
              </div>
              <div className="flex gap-3">
                <TextInput
                  value={userSpecialNo}
                  onChange={(event) => setUserSpecialNo(event.target.value)}
                  label={"特番"}
                />
                <TextInput
                  value={disaReblkCdInput}
                  onChange={(event) => setDisaReblkCdInput(event.target.value)}
                  label={"災害対応ブロック復旧フラグ"}
                />
              </div>
              {/* <div className="flex gap-3"> */}
              {/*   <TextInput */}
              {/*     value={nameInput} */}
              {/*     onChange={(event) => setNameInput(event.target.value)} */}
              {/*     label={t("name")} */}
              {/*     maxLength={20} */}
              {/*   /> */}
              {/*   <TextInput */}
              {/*     value={nameKanaInput} */}
              {/*     onChange={(event) => setNameKanaInput(event.target.value)} */}
              {/*     label={t("nameKana")} */}
              {/*     maxLength={20} */}
              {/*   /> */}
              {/* </div> */}
              <Button onClick={handleSearchClick} className="mt-3" loading={isLoading}>
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
                  successWrapper(record)
                  reset()
                  close()
                }}
              />
            </div>
          )}
        </>
      </Modal>

      <div className="flex justify-between">
        <Button onClick={openModal}>{t("customerSearch")}</Button>

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
