"use client"

/* Todo list/Memo 
1. Email zasna
2. Select button uudiin data oruulna
3. Cash - Payment method Lease- Signature
4. 
*/

import "dayjs/locale/ja"

import { Select, Radio, Input, Textarea, Flex, Button, Checkbox } from "@mantine/core"
import { SetStateAction, useId, useState } from "react"
import { DatePickerInput } from "@mantine/dates"
import { useTranslations } from "next-intl"
import PostalToAddress from "../test/PostalToAddress"
import { IMaskInput } from "react-imask"
import { useForm } from "@mantine/form"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import ContactHistory from "../ContactHistory"
import AlarmList from "../test/AlarmList"

function OperationForm() {
  const router = useRouter()

  const form = useForm({
    initialValues: {
      alarmOperation: [],
      ContactOperation: [],
      type: null,
      customerNumber: "",
      gasType: null,
      phoneNumber: "+81 (222) 2222-2222",
      nameKana: "",
      name: "",
      workType: null,
      applicationDate: null,
      paymentType: null,
      desiredDate: null,
      desiredTimeSlot: null,
    },

    validate: {
      name: (name) => (name === null || name === "" ? "Fill " : null),

      type: (type) => (type === null || type === "" ? "Fill " : null),

      applicationDate: (applicationDate) =>
        applicationDate === null || applicationDate === "" ? "Fill " : null,

      gasType: (gasType) => (gasType === null || gasType === "" ? "Fill " : null),

      desiredTimeSlot: (desiredTimeSlot) =>
        desiredTimeSlot === null || desiredTimeSlot === "" ? "Fill " : null,
    },
  })

  type FormValues = typeof form.values

  const { isLoading, isSuccess, error, mutateAsync } = useMutation({
    mutationFn: (newOperation: FormValues) => {
      return fetch("/api/operation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOperation),
      })
    },
  })

  if (error) {
    console.log(error)
  }

  // if (isSuccess) {
  //   return router.push("/en/dashboard")
  // }

  const t = useTranslations("OperationForm")

  const [value, setValue] = useState<Date | null>(null)
  const [submitDate, setSubmitDate] = useState<Date | null>(null)
  const [progressDate, setProgressDate] = useState<Date | null>(null)

  const [searchQuery, setSearchQuery] = useState("")

  const handleSearchInputChange = (event: {
    target: { value: SetStateAction<string> }
  }) => {
    setSearchQuery(event.target.value)
  }

  const handleSearchClick = () => {
    console.log(`Searching for "${searchQuery}"...`)
  }
  const saveOperation = async (values: FormValues) => {
    const result = await mutateAsync(values)

    router.push("/dashboard")
  }
  const id = useId()

  return (
    <div className="container mx-auto">
      <form onReset={form.onReset} onSubmit={form.onSubmit(saveOperation)}>
        <h1>{t("enterApplicationDetails")}</h1>
        <h2>{t("inputWorkOutline")}</h2>

        <ContactHistory
          contacts={form.values.ContactOperation}
          onNewContact={(contacts) => form.insertListItem("ContactOperation", contacts)}
        />
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-1">
            <Select
              {...form.getInputProps("type")}
              label={t("workType")}
              data={[
                { value: "1", label: t("maturityExchange") },
                { value: "2", label: t("newInstallation") },
                { value: "3", label: t("lumpSumLease") },
                { value: "4", label: t("wholesaleSales") },
                { value: "5", label: t("leaseCancellationRemoval") },
              ]}
            ></Select>
          </div>
          <div>
            <Select
              {...form.getInputProps("solicitingCompany")}
              label={t("solicitingCompany")}
              data={[""]}
            ></Select>
          </div>
          <div className="col-span-1">
            <DatePickerInput
              {...form.getInputProps("applicationDate")}
              data-testid="applicationDate"
              label={t("applicationDate")}
              name="applicationDate"
              // value={}
              // onChange={setSubmitDate}
              mx="auto"
            />
          </div>
          <div className="col-span-1">
            <Radio.Group
              name="gasType"
              label={t("gasType")}
              withAsterisk
              {...form.getInputProps("gasType")}
            >
              {/* <Group mt="xs"> */}
              <Radio value="1" label={t("cityGas")} my="xs" />
              <Radio value="2" label={t("propane")} my="xs" />
              {/* </Group> */}
            </Radio.Group>
          </div>
          <div className="col-span-1 ">
            <Radio.Group
              name="paymentType"
              label={t("paymentType")}
              withAsterisk
              {...form.getInputProps("paymentType")}
            >
              {/* <Group mt="xs"> */}
              <Radio value="1" label={t("cash")} my="xs" />
              <Radio value="2" label={t("lease")} my="xs" />
              {/* </Group> */}
            </Radio.Group>
          </div>
          <div className="col-start-1 col-end-2">
            <DatePickerInput
              data-testid="desiredDate"
              label={t("desiredDate")}
              // value={progressDate}
              // onChange={setProgressDate}
              mx="auto"
            />
          </div>
          <div className="col-span-1">
            <Select
              label={t("desiredTimeSlot")}
              data={[
                { value: "1", label: "09:00-11:00" },
                { value: "2", label: "10:00-12:00" },
                { value: "3", label: "13:00-15:00" },
                { value: "4", label: "15:00-17:00" },
              ]}
            ></Select>
          </div>
          <div className="col-span-3">
            <Textarea label="Remarks" className="w-full" />{" "}
          </div>
          <div className="col-span-1">
            <h2>{t("consumerSearch")}</h2>
            <Flex direction={{ base: "column", sm: "row" }} gap={"sm"} align="center">
              <Input
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchInputChange}
                radius="xl"
              />
              <Button onClick={handleSearchClick} size="xs" radius="xl">
                {t("search")}
              </Button>
            </Flex>
          </div>
          <div className="col-span-3">
            <h2>{t("enterApplicationInformation")}</h2>
          </div>
          <div className="col-start-1 col-end-2">
            <Checkbox label={t("nonCustomer")} />
          </div>
          <div className="col-span-3">
            <PostalToAddress form={form} />
          </div>
          <div className="col-span-1">
            <Radio.Group
              name="housingType"
              label={t("buildingType")}
              withAsterisk
              {...form.getInputProps("housingType")}
            >
              {/* <Group mt="xs"> */}
              <Radio value="1" label={t("detachedHouse")} my="xs" />
              <Radio value="2" label={t("housingComplex")} my="xs" />
              {/* </Group> */}
            </Radio.Group>
          </div>
          <div className="col-span-3">
            <Textarea
              placeholder=""
              label={t("nameCompanyName")}
              {...form.getInputProps("name")}
            ></Textarea>
          </div>
          <div className="col-span-3">
            <Textarea
              placeholder=""
              label={t("nameKana")}
              {...form.getInputProps("nameKana")}
            ></Textarea>
          </div>
          <div className="col-span-1">
            <Input.Wrapper id={id} label={t("phoneNumber")} required maw={500}>
              <Input
                data-testid="phoneNumber"
                component={IMaskInput}
                mask="+81 (000) 0000-0000"
                id={id}
                placeholder="Your phone number"
                {...form.getInputProps("phoneNumber")}
              />
            </Input.Wrapper>
          </div>
          <div className="col-span-1">
            <div className="grid grid-cols-2 gap-3">
              <Select
                {...form.getInputProps("phoneNumberType")}
                label={t("phoneNumberType")}
                data={[
                  { value: "1", label: t("onesHome") },
                  { value: "2", label: t("workplace") },
                  { value: "3", label: t("mobilePhone") },
                ]}
              ></Select>
            </div>
          </div>
          <div className="col-span-3">
            <Input.Wrapper id={id} label={t("mailAddress")}>
              <Input placeholder="Your email" data-testid="mailAddress" />{" "}
            </Input.Wrapper>
          </div>
          <div className="col-span-3">
            <h2>{t("installationAlarmDeviceInformationInput")}</h2>
          </div>
          <div className="col-span-1">
            <Radio.Group
              name="oneOrBulk"
              label={t("mountingForm")}
              withAsterisk
              {...form.getInputProps("oneOrBulk")}
            >
              {/* <Group mt="xs"> */}
              <Radio value="1" my="xs" label={t("individual")} />
              <Radio value="2" my="xs" label={t("bulk")} />
              {/* </Group> */}
            </Radio.Group>
          </div>
          <div className="col-span-3">
            <AlarmList
              alarms={form.values.alarmOperation}
              onNewAlarm={(alarm) => form.insertListItem("alarmOperation", alarm)}
            />
          </div>
          {JSON.stringify(form.values.alarmOperation)}
          <div className="col-span-1 col-start-1">
            <Button
              type="reset"
              onClick={(e) => form.reset()}
              className="mr-3"
              variant="outline"
            >
              Reset
            </Button>
            <Button type="submit" variant="filled">
              Save
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
export default OperationForm

//To do comment
