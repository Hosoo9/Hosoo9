"use client"

/* Todo list/Memo 
1. Email zasna
2. Select button uudiin data oruulna
3. Cash - Payment method Lease- Signature
4. 
*/

import "dayjs/locale/ja"

import {
  Container,
  Grid,
  Select,
  Group,
  Radio,
  Input,
  JsonInput,
  Textarea,
  Space,
  Flex,
  Button,
  Checkbox,
} from "@mantine/core"
import { SetStateAction, useId, useState } from "react"
import { DatePicker, DatePickerInput } from "@mantine/dates"
import { useTranslations } from "next-intl"
import PostalToAddress from "./PostalToAddress"
import { IMaskInput } from "react-imask"
import SignaturePad from "./SignaturePad"
import ContactHistory from "../ContactHistory"
import { useForm } from "@mantine/form"

function Schedulling() {
  const form = useForm({
    initialValues: {
      ContactOperation: [],
    },
  })

  const t = useTranslations("OperationForm")

  const [value, setValue] = useState<Date | null>(null)
  const [submitDate, setSubmitDate] = useState<Date | null>(null)
  const [progressDate, setProgressDate] = useState<Date | null>(null)
  const [progressHour, setProgressHour] = useState<Date | null>(null)
  const [scheduledWorkDate, setScheduledWorkDate] = useState<Date | null>(null)
  const [applicationDate, setApplicationDate] = useState<Date | null>(null)

  const [searchQuery, setSearchQuery] = useState("")

  const handleSearchInputChange = (event: {
    target: { value: SetStateAction<string> }
  }) => {
    setSearchQuery(event.target.value)
  }

  const handleSearchClick = () => {
    console.log(`Searching for "${searchQuery}"...`)
  }
  const id = useId()

  return (
    <div className="container mx-auto">
      <div>
        <h1>{t("scheduleAdjustment")} </h1>

        <div className="grid grid-cols-3 gap-3">
          <h2 className="col-span-1">{t("scheduleRegistration")}</h2>
          <h2 className="col-span-1">{t("laborAssignment")}</h2>
          <div className="col-start-1 flex items-end">
            <div className="mr-6 flex-1">
              <DatePickerInput
                label={t("scheduledWorkDate")}
                value={submitDate}
                onChange={setSubmitDate}
                mx="auto"
              />
            </div>
            <div className="flex">
              <Button mx="auto">Button</Button>
            </div>
          </div>
          <div className="col-start-2 flex items-end">
            <div className="mr-6 flex-1">
              <Select
                label={t("responsibleWorker")}
                data={[
                  { value: "Person1", label: "Person1" },
                  { value: "Person2", label: "Person2" },
                  { value: "Person3", label: "Person3" },
                  { value: "Person4", label: "Person4" },
                ]}
              ></Select>
            </div>
            <div className="flex">
              <Button mx="auto">Button</Button>
            </div>
          </div>
          <h2 className="col-start-1">{t("workOutline")}</h2>
          <div className="col-span-1 col-start-1">
            <Textarea
              disabled={true}
              placeholder="230700123"
              label={t("workNumber")}
              className="w-full"
            />{" "}
          </div>
          <div className="col-span-1 ">
            <Textarea
              disabled={true}
              placeholder={t("waitingForScheduleAdjustment")}
              label={t("status")}
              className="w-full"
            />{" "}
          </div>
          <div className="col-span-1">
            <Textarea
              disabled={true}
              placeholder={t("kyojiro")}
              label={t("author")}
              className="w-full"
            />{" "}
          </div>
          <div className="col-span-1">
            <Select
              label={t("workType")}
              data={[
                { value: "maturityExchange", label: t("maturityExchange") },
                { value: "newInstallation", label: t("newInstallation") },
                { value: "lumpSumLease", label: t("lumpSumLease") },
                { value: "wholesaleSales", label: t("wholesaleSales") },
                {
                  value: "leaseCancellationRemoval",
                  label: t("leaseCancellationRemoval"),
                },
              ]}
            ></Select>
          </div>
          <div className="col-span-1">
            <Select label={t("solicitationCompany")} data={[""]}></Select>
          </div>
          <div className="mr-6 flex-1">
            <DatePickerInput
              label={t("applicationDate")}
              value={applicationDate}
              onChange={setApplicationDate}
              mx="auto"
            />
          </div>
          <div className="col-span-1">
            <Radio.Group name="gasType" label={t("gasType")} withAsterisk>
              {/* <Group mt="xs"> */}
              <Radio value="cityGas" label={t("cityGas")} my="xs" />
              <Radio value="propane" label={t("propane")} my="xs" />
              {/* </Group> */}
            </Radio.Group>
          </div>

          <div className="col-span-1 ">
            <Radio.Group name="paymentType" label={t("paymentType")} withAsterisk>
              {/* <Group mt="xs"> */}
              <Radio value="cash" label={t("cash")} my="xs" />
              <Radio value="lease" label={t("lease")} my="xs" />
              {/* </Group> */}
            </Radio.Group>
          </div>
        </div>
      </div>
      <div className="mt-20 grid grid-cols-4 gap-3">
        <div className="col-span-1">
          <DatePickerInput
            label={t("desiredDate")}
            value={progressDate}
            onChange={setProgressDate}
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
        <div className="col-span-1">
          <DatePickerInput
            label={t("scheduledWorkDate")}
            value={scheduledWorkDate}
            onChange={setScheduledWorkDate}
            mx="auto"
          />
        </div>
        <div className="col-span-1">
          <Select
            label={t("responsibleWorker")}
            data={[
              { value: "1", label: "Person1" },
              { value: "2", label: "Person2" },
              { value: "3", label: "Person3" },
              { value: "4", label: "Person4" },
            ]}
          ></Select>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-3">
          <Textarea label="Remarks" className="w-full" />{" "}
        </div>
        <h2>ENERELASDSADAS</h2>
        <div className="col-start-1 col-end-2">
          <Checkbox label="I agree to sell my privacy" />
        </div>
        <div className="col-span-3">{/* <PostalToAddress form={form} /> */}</div>
        <div className="col-span-1 ">
          <Radio.Group name="buildingType" label={t("buildingType")} withAsterisk my="md">
            {/* <Group> */}
            <Radio label={t("detachedHouse")} value="cash" my="xs" />
            <Radio label={t("housingComplex")} value="cash" my="xs" />
            {/* </Group> */}
          </Radio.Group>
        </div>
        <div className="col-span-3">
          <Textarea placeholder="" label={t("nameCompanyName")}></Textarea>
        </div>

        <div className="col-span-3">
          <Textarea placeholder="" label={t("nameKana")}></Textarea>
        </div>

        <div className="col-span-1">
          <Input.Wrapper id={id} label={t("phoneNumber")} required maw={800}>
            <Input<any>
              component={IMaskInput}
              mask="+81 (000) 0000-0000"
              id={id}
              placeholder="Your phone number"
            />
          </Input.Wrapper>
        </div>
        <div className="col-span-1">
          <div className="grid grid-cols-2 gap-3">
            <Select
              label={t("phoneNumberType")}
              data={[
                { value: "onesHome", label: t("onesHome") },
                { value: "workplace", label: t("workplace") },
                { value: "mobilePhone", label: t("mobilePhone") },
              ]}
              maw={500}
            ></Select>
          </div>
        </div>
        <div className="col-span-3">
          <Input.Wrapper id={id} label={t("mailAddress")}>
            <Input placeholder="Your email" />{" "}
          </Input.Wrapper>
        </div>
        <h2 className="col-span-3">{t("installationAlarmDeviceInformationInput")}</h2>
        <div className="col-span-1 col-start-1">
          <Radio.Group name="favoriteFramework" label={t("mountingForm")} withAsterisk>
            {/* <Group mt="xs"> */}
            <Radio value="individual" label={t("individual")} my="xs" />
            <Radio value="bulk" label={t("bulk")} my="xs" />
            {/* </Group> */}
          </Radio.Group>
        </div>
      </div>
    </div>
  )
}
export default Schedulling

//To do comment
