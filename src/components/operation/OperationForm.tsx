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
import { isFullForm, isLastStep, isShortForm } from "@/utils/operation/step-helper"
import { SubmitForApproval } from "./SubmitForApproval"
import { SubmitCompleteOperation } from "./SubmitCompleteOperation"
import { ApproveOperationButton } from "./ApproveOperationButton"
import { RejectOperationButton } from "./RejectOperationButton"
import { notifications } from "@mantine/notifications"
import { OperationHeader } from "./OperationHeader"
import { stringToEmpty, transformCustomerData } from "@/utils/converters"
import { adjustDateToTimezone } from "@/utils/date-helper"

const setDate = (date: Date) => {
  return date === null ? null : new Date(date)
}

const setBoolean = (input: boolean | null) => {
  if (input === false) {
    return "1"
  } else if (input === true) {
    return "2"
  } else {
    return null
  }
}

const transformData = (data: any) => {
  return {
    ...data,
    ...transformCustomerData(data),
    buildingType: data.buildingType ? data.buildingType.toString() : null,
    scheduledDate: setDate(data.scheduledDate),
    postcardStartDate: setDate(data.postcardStartDate),
    postcardEndDate: setDate(data.postcardEndDate),
    // postcardOutputTimestamp: setDate(data.postcardOutputTimestamp),
    installingMeterModel: data.installingMeterModel
      ? data.installingMeterModel.toString()
      : null,
    removingMeterModel: data.removingMeterModel
      ? data.removingMeterModel.toString()
      : null,
    removingMeterNumber: stringToEmpty(data.removingMeterNumber),
    removingMeterValue: stringToEmpty(data.removingMeterValue),
    installingMeterNumber: stringToEmpty(data.installingMeterNumber),
    installingMeterValue: stringToEmpty(data.installingMeterValue),
    installingMeterManufacturer: data.installingMeterManufacturer
      ? data.installingMeterManufacturer.toString()
      : null,
    removingMeterManufacturer: data.removingMeterManufacturer
      ? data.removingMeterManufacturer.toString()
      : null,
    installingMeterSize: data.installingMeterSize
      ? data.installingMeterSize.toString()
      : null,
    removingMeterSize: data.removingMeterSize ? data.removingMeterSize.toString() : null,
    absenceNoticeDeliveryDate: setDate(data.absenceNoticeDeliveryDate),
    footprint: data.footprint ? data.footprint.toString() : null,
    operationType: data.operationType ? data.operationType.toString() : null,
    exchangingDate: setDate(data.exchangingDate),
    referenceDate: setDate(data.referenceDate),
    removingMeterInspectionDate: setDate(data.removingMeterInspectionDate),
    installingMeterReferenceDate: setDate(data.installingMeterReferenceDate),
    installingMeterMaximumUsage: data.installingMeterMaximumUsage || "",
    removingMeterMaximumUsage: data.removingMeterMaximumUsage || "",
    beforeWorkResult: setBoolean(data.beforeWorkResult),
    afterWorkResult: setBoolean(data.afterWorkResult),
    position: data.position === null ? "" : data.position,
    beforeWorkInspectionType: data.beforeWorkInspectionType
      ? data.beforeWorkInspectionType.toString()
      : null,
    afterWorkInspectionType: data.afterWorkInspectionType
      ? data.afterWorkInspectionType.toString()
      : null,
    scheduledTime: data.scheduledTime ? data.scheduledTime.toString() : "",
    memo: stringToEmpty(data.memo),
  }
}

function OperationForm({ code }: { code: string }) {
  const router = useRouter()
  const [operation, setOperation] = useState<any>(null)

  const {
    isLoading: isCurrentUserLoading,
    isError: isCurrentUserError,
    data: currentUser,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const result = await fetch(`/api/me`)
      return result.json()
    },
  })

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["operation", code],
    queryFn: async () => {
      const result = await fetch(`/api/operation/${code}`)
      return result.json()
    },
    onSettled: (data: any) => {
      const transformed = transformData(data)
      form.setInitialValues(transformed)
      form.setValues(transformed)

      setOperation({ ...data })
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })

  const form = useForm({
    initialValues: {
      assignedWorkerId: null,
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
      scheduledDate: null,
      referenceDate: null,
      installing: {},
      createdAt: null,
      postcardStartDate: null,
      postcardEndDate: null,
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
    mutationFn: async (newOperation: FormValues) => {
      const result = await fetch(`/api/operation/${code}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newOperation,
          // DatePicker needs to convert to local date
          scheduledDate: adjustDateToTimezone(newOperation.scheduledDate),
          referenceDate: adjustDateToTimezone(newOperation.referenceDate),
          postcardStartDate: adjustDateToTimezone(newOperation.postcardStartDate),
          postcardEndDate: adjustDateToTimezone(newOperation.postcardEndDate),
        }),
      })

      return result.json()
    },
    onSuccess: () => {
      notifications.show({
        title: "Save success",
        message: "Operation has been saved",
      })
    },
    onError: () => {
      notifications.show({
        title: "Save failed",
        message: "Operation has not been saved",
        color: "red",
      })
    },
  })

  const t = useTranslations("OperationForm")

  const saveOperation = async (values: FormValues) => {
    await mutateAsync(values)
  }

  const [active, setActive] = useState(
    searchParams.get("step") ? parseInt(searchParams.get("step") as string) - 1 : 0,
  )

  useEffect(() => {
    router.replace(`?step=${active + 1}`)
  }, [active, router])

  const lastStep = operation ? isLastStep(operation.status, active) : false
  const shortForm = operation ? isShortForm(operation.status) : false

  const nextStep = async (e: any) => {
    e.preventDefault()

    await saveOperation({ ...form.values })
    setActive((current) => (!lastStep ? current + 1 : current))
  }

  const prevStep = async () => {
    await saveOperation(form.values)
    setActive((current) => (current > 0 ? current - 1 : current))
  }

  const onRequestForApproval = async (operation: any) => {
    setOperation(operation)
  }

  const onCompleteOperation = async (operation: any) => {
    // setOperation(operation)
  }

  const beforeSubmit = async () => await saveOperation(form.values)

  return (
    <Container fluid>
      {/* <Title order={1} size="h1" className="py-5"> */}
      {/*   {t("workDetails")} */}
      {/* </Title> */}

      {isLoading ? (
        <LoaderComponent />
      ) : (
        <form onReset={form.onReset} onSubmit={form.onSubmit(saveOperation)}>
          <OperationHeader code={code} />
          {/* <pre>{JSON.stringify(form.values, null, 2)}</pre> */}
          {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
          {/* <ContactHistory */}
          {/*   contacts={form.values.ContactOperation} */}
          {/*   onNewContact={(contacts) => form.insertListItem("ContactOperation", contacts)} */}
          {/* /> */}

          <MetaInformation form={form} operation={operation} />
          <Pause />

          <Divider my="lg" className="pt-5" />

          <Stepper active={active} onStepClick={setActive} iconSize={32}>
            <Stepper.Step label={t("customerInformation")}>
              <CustomerInformation form={form} className="py-2" />
            </Stepper.Step>

            <Stepper.Step label={t("workInformation")}>
              <div className="py-2">
                <div className="py-5">
                  <Flags form={form} />
                  <WorkInformation form={form} />
                </div>
              </div>
            </Stepper.Step>

            {/* <Divider my="lg" /> */}

            <Stepper.Step label={t("workScheduleInformation")}>
              <WorkScheduleInformation form={form} className="py-2" />
            </Stepper.Step>

            {/* <Divider my="lg" /> */}

            {/* <Divider my="lg" /> */}
            {/* <Stepper.Step label={t("workInformation")}> */}
            {/*   <WorkInformation form={form} className="py-2" /> */}
            {/* </Stepper.Step> */}

            {/* <Divider my="lg" /> */}
            {isFullForm(operation?.status) && (
              <Stepper.Step label={t("removingMeterInformation")} className="py-2">
                <RemovingMeterInformation form={form} />
              </Stepper.Step>
            )}

            {isFullForm(operation?.status) && (
              <Stepper.Step label={t("installingMeterInformation")}>
                <InstallingMeterInformation form={form} className="py-2" />
                {/* <pre>{ JSON.stringify(form.values, null, 2) }</pre> */}
              </Stepper.Step>
            )}

            {isFullForm(operation?.status) && (
              <Stepper.Step label={t("workInformation")}>
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
              </Stepper.Step>
            )}

            {/* <Divider my="lg" /> */}

            {/* <Divider /> */}
            {/* <Stepper.Completed> */}
            {/*   {/1* <Button>Send request</Button> *1/} */}
            {/* </Stepper.Completed> */}
          </Stepper>

          <Group justify="center" mt="xl">
            <Button
              variant="default"
              onClick={prevStep}
              loading={mutationLoading}
              disabled={active === 0 || isLoading}
            >
              {t("back")}
            </Button>
            <Button
              onClick={nextStep}
              type="button"
              variant={lastStep ? "outline" : "filled"}
              disabled={isLoading}
              loading={mutationLoading}
            >
              {lastStep ? t("save") : t("nextStep")}
            </Button>

            {lastStep && shortForm && [1, 4].includes(operation.status) && (
              <SubmitForApproval
                code={code}
                onSubmit={onRequestForApproval}
                beforeSubmit={beforeSubmit}
              >
                {t("submitForApproval")}
              </SubmitForApproval>
            )}

            {lastStep &&
              shortForm &&
              operation.status === 2 &&
              currentUser &&
              currentUser.role === 3 && (
                <>
                  <ApproveOperationButton beforeSubmit={beforeSubmit} code={code}>
                    {t("approve")}
                  </ApproveOperationButton>
                  <RejectOperationButton beforeSubmit={beforeSubmit} code={code}>
                    {t("reject")}
                  </RejectOperationButton>
                </>
              )}

            {lastStep && !shortForm && [3, 5].includes(operation.status) && (
              <SubmitCompleteOperation
                beforeSubmit={beforeSubmit}
                code={code}
                onSubmit={onCompleteOperation}
              >
                {t("completeOperation")}
              </SubmitCompleteOperation>
            )}
          </Group>
        </form>
      )}
    </Container>
  )
}

export default OperationForm
