"use client"

/* Todo list/Memo 
1. Email zasna
2. Select button uudiin data oruulna
3. Cash - Payment method Lease- Signature
4. 
*/

import "dayjs/locale/ja"

import { Button, Checkbox, Flex, Input, Radio, Select, Textarea } from "@mantine/core"
import { DatePickerInput } from "@mantine/dates"
import { useForm } from "@mantine/form"
import { useTranslations } from "next-intl"
import { SetStateAction, useId, useState } from "react"
import { IMaskInput } from "react-imask"
import PostalToAddress from "./PostalToAddress"

function AlarmDetails() {
  const t = useTranslations("OperationForm")

  const [progressDate, setProgressDate] = useState<Date | null>(null)

  const [searchQuery, setSearchQuery] = useState("")

  const form = useForm({
    initialValues: {
      alarmOperation: [
        // {
        //   branchNumber: "",
        //   mountingModel: "",
        //   serialNumber: "",
        //   installationCustomerNumber: "",
        //   nameCompanyName: "",
        // },
      ],
    },
  })

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
      {/* <TestAlarmlist /> */}
      <form className="grid grid-cols-3 gap-5">
        <h1>{t("alarmDetails")}</h1>
        <h2 className="col-start-1">{t("installationAlarmDetails")}</h2>
        <div className="col-span-1 col-start-1">
          <Textarea
            disabled={true}
            placeholder="230700123"
            label={t("workNumber")}
            className="w-full"
          />{" "}
        </div>
        <div className="col-span-1">
          <Textarea
            label={t("branchNumber")}
            placeholder="001"
            disabled={true}
            className="w-full"
          />
        </div>{" "}
        <div className="col-span-1 col-start-1">
          <Select label={t("mountingModel")} data={[""]}></Select>
        </div>
        <div className="col-span-1">
          <Input.Wrapper placeholder="" label={t("serialNumber")}>
            <Input></Input>
          </Input.Wrapper>{" "}
        </div>
        <div className=" flex items-end">
          <Button>{t("qrReading")}</Button>
        </div>
        <div className="col-span-1">
          <Radio.Group
            name="abnormalGasLeakDetector"
            label={t("abnormalGasLeakDetector")}
            withAsterisk
          >
            <Radio value="abnormal" label={t("abnormal")} my="xs" />
            <Radio value="noAbnormality" label={t("noAbnormality")} my="xs" />
          </Radio.Group>{" "}
        </div>
        <div className="col-span-1">
          <Radio.Group
            name="abnormalCarbonMonoxideDetector"
            label={t("abnormalCarbonMonoxideDetector")}
            withAsterisk
          >
            <Radio value="abnormal" label={t("abnormal")} my="xs" />
            <Radio value="noAbnormality" label={t("noAbnormality")} my="xs" />
          </Radio.Group>{" "}
        </div>
        <div className="col-span-1">
          <Radio.Group
            name="fireAlarmDetectorMalfunction"
            label={t("fireAlarmDetectorMalfunction")}
            withAsterisk
          >
            <Radio value="abnormal" label={t("abnormal")} my="xs" />
            <Radio value="noAbnormality" label={t("noAbnormality")} my="xs" />
          </Radio.Group>{" "}
        </div>
        <div className="col-span-1">
          <DatePickerInput
            label={t("operationInspectionConfirmationDate")}
            value={progressDate}
            onChange={setProgressDate}
            mx="auto"
          />
        </div>
        <div className="col-span-1">
          <Select
            label={t("responsibleWorker")}
            data={[
              { value: "Person1", label: "Person1" },
              { value: "Person2", label: "Person2" },
            ]}
          ></Select>
        </div>
        <div className="col-span-1 col-start-1">
          <Input.Wrapper placeholder="" label={t("mountingPosition")}>
            <Input></Input>
          </Input.Wrapper>{" "}
        </div>
        <div className="col-span-1">
          {" "}
          <DatePickerInput
            label={t("maturityDate")}
            value={progressDate}
            onChange={setProgressDate}
            mx="auto"
          />
        </div>
        <div className="col-span-1">
          {" "}
          <DatePickerInput
            label={t("installationDate")}
            value={progressDate}
            onChange={setProgressDate}
            mx="auto"
          />
        </div>
        <h2 className="col-span-3">{t("locationInformation")}</h2>
        <div className="flex items-center">
          <Button size="md">{t("postApplicantInformation")}</Button>
        </div>
        <div className="col-span-1">
          <h4>{t("consumerSearch")} </h4>
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
        <div className="col-span-1 col-start-1">
          <Checkbox label={t("nonCustomer")} />
        </div>
        <div className="col-span-3">
          <Input.Wrapper
            placeholder=""
            label={t("meterCityNumber")}
            description={t("fillWhenCustomerNoId")}
          >
            <Input></Input>
          </Input.Wrapper>{" "}
          <PostalToAddress form={form} />
        </div>
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
      </form>
    </div>
  )
}
export default AlarmDetails

// To do comment
