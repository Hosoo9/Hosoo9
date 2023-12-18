"use client"

/* Todo list/Memo 
1. Email zasna
2. Select button uudiin data oruulna
3. Cash - Payment method Lease- Signature
4. 
*/

import "dayjs/locale/ja"

import { createOperationSchema } from "@/contexts/operation/validation-schema"
import { Button, Container } from "@mantine/core"
import { useForm, zodResolver } from "@mantine/form"
import { notifications } from "@mantine/notifications"
import { useMutation } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { CustomerInformation } from "./CustomerInformation"

function OperationForm() {
  const router = useRouter()

  const form = useForm({
    validate: zodResolver(createOperationSchema),
    initialValues: {
      isNonCustomer: false,
      customerNumber: "",
      postalCode: "",
      municipality: "",
      address: "",
      housingType: null,
      buildingNameRoomNumber: "",
      name: "",
      nameKana: "",
      phoneNumber: "",
      phoneNumberType: null,
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
    },
  })

  if (error) {
    console.log(error)
  }

  const t = useTranslations("OperationForm")

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

        {/* <WorkInformation form={form} /> */}
        <CustomerInformation form={form} noMailAddress={true} />

        <Button className="mt-5" type="submit" loading={isLoading}>
          {t("create")}
        </Button>
      </form>
    </Container>
  )
}

export default OperationForm

// To do comment
