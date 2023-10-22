"use client"

/* Todo list/Memo 
1. Email zasna
2. Select button uudiin data oruulna
3. Cash - Payment method Lease- Signature
4. 
*/

import "dayjs/locale/ja"

import { Button, Container, Divider, Group, Stepper, Title } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import SignatureCanvas from "react-signature-canvas"
import { CustomerInformation } from "./CustomerInformation"
import { Flags } from "./Flags"
import { InstallingMeterInformation } from "./InstallingMeterInformation"
import { MetaInformation } from "./MetaInformation"
import { Pause } from "./Pause"
import { RemovingMeterInformation } from "./RemovingMeterInformation"
import { WorkInformation } from "./WorkInformation"
import { WorkScheduleInformation } from "./WorkScheduleInformation"
import { LoaderComponent } from "../Provider"

const setDate = (date: Date) => {
  return date === null ? null : new Date(date)
}

function OperationForm({ code }: { code: string }) {
  const router = useRouter()
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["operation", code],
    queryFn: async () => {
      const result = await fetch(`/api/operation/${code}`)
      return result.json()
    },
    onSettled: (data: any) => {
      form.setInitialValues({
        ...data,
        scheduledDatetime: setDate(data.scheduledDatetime),
        postcardOutputTimestamp: setDate(data.postcardOutputTimestamp),
        absenceNoticeDeliveryDate: setDate(data.absenceNoticeDeliveryDate),
      })
      form.setValues({
        ...data,
        scheduledDatetime: setDate(data.scheduledDatetime),
        postcardOutputTimestamp: setDate(data.postcardOutputTimestamp),
        absenceNoticeDeliveryDate: setDate(data.absenceNoticeDeliveryDate),
      })
    },
  })

  const form = useForm({
    initialValues: {
      isSecurityWork: false,
      changedNotificationFlag: false,
      valveOpenFlag: false,
      footprint: null,
      type: null,
      customerNumber: null,
      postalCode: null,
      gasType: null,
      phoneNumber: null,
      nameKana: null,
      name: null,
      workType: null,
      applicationDate: null,
      paymentType: null,
      desiredDate: null,
      desiredTimeSlot: null,
      postcardOutputTimestamp: null,
      absenceNoticeDeliveryDate: null,
      exchangingDate: null,
      operationType: null,
      municipality: null,
      buildingNameRoomNumber: null,
      address: null,
      scheduledDatetime: null,
      removing: {},
      installing: {},
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

  const searchParams = useSearchParams()

  type FormValues = typeof form.values

  const {
    isLoading: mutationLoading,
    isSuccess: isMutationSuccess,
    error: mutationError,
    mutateAsync,
  } = useMutation({
    mutationFn: (newOperation: FormValues) => {
      return fetch(`/api/operation/${code}`, {
        method: "PUT",
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

  const t = useTranslations("OperationForm")

  const saveOperation = async (values: FormValues) => {
    const result = await mutateAsync(values)

    router.push("/dashboard")
  }

  const [active, setActive] = useState(
    searchParams.get("step") ? parseInt(searchParams.get("step") as string) - 1 : 0,
  )

  useEffect(() => {
    router.replace(`?step=${active + 1}`)
  }, [active, router])

  const nextStep = async () => {
    await saveOperation(form.values)
    setActive((current) => (current < 6 ? current + 1 : current))
  }

  const prevStep = async () => {
    await saveOperation(form.values)
    setActive((current) => (current > 0 ? current - 1 : current))
  }

  return (
    <Container fluid>
      {/* <Title order={1} size="h1" className="py-5"> */}
      {/*   {t("workDetails")} */}
      {/* </Title> */}

      {isLoading ? (
        <LoaderComponent />
      ) : (
        <form onReset={form.onReset} onSubmit={form.onSubmit(saveOperation)}>
          {/* <pre>{JSON.stringify(form.values, null, 2)}</pre> */}
          {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
          {/* <ContactHistory */}
          {/*   contacts={form.values.ContactOperation} */}
          {/*   onNewContact={(contacts) => form.insertListItem("ContactOperation", contacts)} */}
          {/* /> */}

          <MetaInformation form={form} />
          <Pause />

          <Divider my="lg" className="pt-5" />

          <Stepper active={active} onStepClick={setActive}>
            <Stepper.Step label={t("metaInformation")}>
              <div className="py-2">
                <div className="py-5">
                  <Flags form={form} />
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
              {/* <pre>{ JSON.stringify(form.values, null, 2) }</pre> */}
            </Stepper.Step>

            {/* <Divider /> */}
            <Stepper.Completed>
              <Title order={3} size="h4" className="py-3">
                {t("signInput")}
              </Title>

              <div className="pb-5">
                <SignatureCanvas
                  canvasProps={{
                    width: 500,
                    height: 200,
                    className: "sigCanvas border-solid border-1",
                  }}
                />
              </div>
            </Stepper.Completed>
          </Stepper>

          <Group justify="center" mt="xl">
            <Button variant="default" onClick={prevStep}>
              Back
            </Button>
            <Button onClick={nextStep}>Next step</Button>
          </Group>
        </form>
      )}
    </Container>
  )
}
export default OperationForm

//To do comment
