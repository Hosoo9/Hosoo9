"use client"

/* Todo list/Memo 
1. Email zasna
2. Select button uudiin data oruulna
3. Cash - Payment method Lease- Signature
4. 
*/

import "dayjs/locale/ja"

import { Button, Container, Group, Stepper } from "@mantine/core"
import { useForm, zodResolver } from "@mantine/form"
import { useMutation } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { SetStateAction, useState } from "react"
import { Flags } from "./Flags"
import { WorkInformation } from "./WorkInformation"
import { notifications } from "@mantine/notifications"
import { createOperationSchema } from "@/contexts/operation/validation-schema"

function OperationForm() {
  const router = useRouter()

  const form = useForm({
    validate: zodResolver(createOperationSchema),
    initialValues: {
      isSecurityWork: false,
      changedNotificationFlag: false,
      valveOpenFlag: false,
      exchangingDate: null,
      operationType: null,
    },
  })

  type FormValues = typeof form.values

  const { isLoading, isSuccess, error, mutateAsync } = useMutation({
    mutationFn: async (newOperation: FormValues) => {
      const response = await fetch("/api/operation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOperation),
      })

      return response.json()
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
    }
  })

  if (error) {
    console.log(error)
  }

  const t = useTranslations("OperationForm")

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

    router.push(`/operation/${result.code}`)
  }

  return (
    <Container fluid>
      <form onReset={form.onReset} onSubmit={form.onSubmit(saveOperation)}>
        {/* <ContactHistory */}
        {/*   contacts={form.values.ContactOperation} */}
        {/*   onNewContact={(contacts) => form.insertListItem("ContactOperation", contacts)} */}
        {/* /> */}

        {/* <MetaInformation form={form} /> */}
        {/* <Pause /> */}

        {/* <Divider my="lg" className="pt-5" /> */}
        <div className="mt-5"></div>

        <Stepper active={0}>
          <Stepper.Step label={t("metaInformation")}>
            <div className="py-2">
              <div className="py-5">
                <Flags form={form} />
                <WorkInformation form={form} />
              </div>
            </div>
          </Stepper.Step>

          <Stepper.Step label={t("workScheduleInformation")}></Stepper.Step>
          <Stepper.Step label={t("customerInformation")}></Stepper.Step>
          <Stepper.Step label={t("workInformation")}></Stepper.Step>
          <Stepper.Step
            label={t("removingMeterInformation")}
            className="py-2"
          ></Stepper.Step>

          <Stepper.Step label={t("installingMeterInformation")}></Stepper.Step>
        </Stepper>

        <Group justify="center" mt="xl">
          <Button type="submit">Next step</Button>
        </Group>
      </form>
    </Container>
  )
}

export default OperationForm

//To do comment
