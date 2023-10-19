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
    Group,
    Stepper,
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
      responsibleWorker: "",
      removing: {},
      installing: {}
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


  const [active, setActive] = useState(1);
  const nextStep = () => setActive((current) => (current < 6 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <Container fluid>
      {/* <Title order={1} size="h1" className="py-5"> */}
      {/*   {t("workDetails")} */}
      {/* </Title> */}

      <form onReset={form.onReset} onSubmit={form.onSubmit(saveOperation)}>
        {/* <ContactHistory */}
        {/*   contacts={form.values.ContactOperation} */}
        {/*   onNewContact={(contacts) => form.insertListItem("ContactOperation", contacts)} */}
        {/* /> */}

        <MetaInformation form={form} />

        <Divider my="lg" className="pt-5" />

        <Stepper active={active} onStepClick={setActive}>
          <Stepper.Step label={t("metaInformation")}>
            <div className="py-2">
              <div className="py-5">
                <Flags form={form} />
                <Pause />
              </div>
            </div>
          </Stepper.Step>

          {/* <Divider my="lg" /> */}

          <Stepper.Step label={t("workScheduleInformation")}>
            <WorkScheduleInformation form={form} className="py-2" />
          </Stepper.Step>

          {/* <Divider my="lg" /> */}

          <Stepper.Step label={t("customerInformation")}>
            <CustomerInformation form={form} className="py-2" />
          </Stepper.Step>

          {/* <Divider my="lg" /> */}
          <Stepper.Step label={t("workInformation")}>
            <WorkInformation form={form} className="py-2" />
          </Stepper.Step>

          {/* <Divider my="lg" /> */}
          <Stepper.Step label={t("removingMeterInformation")} className="py-2">
            <RemovingMeterInformation form={form} />
          </Stepper.Step>

          {/* <Divider my="lg" /> */}

          <Stepper.Step label={t("installingMeterInformation")}>
            <InstallingMeterInformation form={form} className="py-2" />
            <pre>{ JSON.stringify(form.values, null, 2) }</pre>
          </Stepper.Step>


          {/* <Divider /> */}
          <Stepper.Completed>
            <Title order={3} size="h4" className="py-3">
              {t("signInput")}
            </Title>

            <div className="pb-5">
              <SignatureCanvas
                canvasProps={{ width: 500, height: 200, className: "sigCanvas border-solid border-1" }}
              />
            </div>

          </Stepper.Completed>
        </Stepper>

        <Group justify="center" mt="xl">
          <Button variant="default" onClick={prevStep}>Back</Button>
          <Button onClick={nextStep}>Next step</Button>
        </Group>

        {/* <div className="pb-5"> */}
        {/*   <div className="col-span-1"> */}
        {/*     <Button */}
        {/*       type="reset" */}
        {/*       onClick={(e) => form.reset()} */}
        {/*       className="mr-3" */}
        {/*       variant="outline" */}
        {/*     > */}
        {/*       Reset */}
        {/*     </Button> */}
        {/*     <Button type="submit" variant="filled"> */}
        {/*       Save */}
        {/*     </Button> */}
        {/*   </div> */}
        {/* </div> */}
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
