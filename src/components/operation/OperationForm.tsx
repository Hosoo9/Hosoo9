"use client"

/* Todo list/Memo 
1. Email zasna
2. Select button uudiin data oruulna
3. Cash - Payment method Lease- Signature
4. 
*/

import "dayjs/locale/ja"

import {
    Button,
    Container,
    Divider,
    Title
} from "@mantine/core"
import { useForm } from "@mantine/form"
import { useDisclosure } from "@mantine/hooks"
import { useMutation } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { SetStateAction, useId, useState } from "react"
import SignatureCanvas from "react-signature-canvas"
import { CustomerInformation } from "./CustomerInformation"
import { Flags } from "./Flags"
import { InstallingMeterInformation } from "./InstallingMeterInformation"
import { MetaInformation } from "./MetaInformation"
import { Pause } from "./Pause"
import { RemovingMeterInformation } from "./RemovingMeterInformation"
import { WorkInformation } from "./WorkInformation"
import { WorkScheduleInformation } from "./WorkScheduleInformation"

function OperationForm() {
  const router = useRouter()
  const [opened, { open, close }] = useDisclosure(false)

  const form = useForm({
    initialValues: {
      alarmOperation: [],
      ContactOperation: [],
      type: null,
      customerNumber: "",
      gasType: null,
      phoneNumber: "",
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
    <Container fluid>
      <Title order={1} size="h1" className="py-5">
        {t("workDetails")}
      </Title>

      <form onReset={form.onReset} onSubmit={form.onSubmit(saveOperation)}>
        {/* <ContactHistory */}
        {/*   contacts={form.values.ContactOperation} */}
        {/*   onNewContact={(contacts) => form.insertListItem("ContactOperation", contacts)} */}
        {/* /> */}
        <MetaInformation />
        <Flags />
        <Pause />

        <Divider my="lg" />

        <WorkScheduleInformation />

        <Divider my="lg" />

        <CustomerInformation />

        <Divider my="lg" />
        <WorkInformation />

        <Divider my="lg" />
        <RemovingMeterInformation />

        <Divider my="lg" />
        <InstallingMeterInformation />

        <Divider />
        <Title order={3} size="h4" className="py-3">
          {t("signInput")}
        </Title>

        <div className="pb-5">
          <SignatureCanvas
            canvasProps={{ width: 500, height: 200, className: "sigCanvas border-solid border-1" }}
          />
        </div>

        <div className="pb-5">
          <div className="col-span-1">
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
        {/* <Modal opened={opened} onClose={close} title="Authentication"> */}
        {/*   <SignatureCanvas */}
        {/*     penColor="green" */}
        {/*     canvasProps={{ className: "signature" }} */}
        {/*     ref={sigRef} */}
        {/*     onEnd={handleSignatureEnd} */}
        {/*   /> */}
        {/* </Modal> */}

        {/* <Button onClick={open}>Open modal</Button> */}
      </form>
    </Container>
  )
}
export default OperationForm

//To do comment
