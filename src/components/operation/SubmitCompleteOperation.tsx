import { Button } from "@mantine/core"
import { useMutation } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"

export const SubmitCompleteOperation = ({
  code,
  children,
  onSubmit,
  beforeSubmit
}: {
  code: string
  children: React.ReactNode,
  onSubmit?: (result: any) => void
  beforeSubmit?: () => Promise<void>
}) => {
  const router = useRouter()
  const t = useTranslations("OperationForm")

  const { isLoading, isSuccess, error, mutateAsync } = useMutation({
    mutationFn: (operation: any) => {
      return fetch(`/api/operation/${code}/complete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(operation),
      })
    },
  })

  const submit = async () => {
    if (beforeSubmit) {
      await beforeSubmit()
    }

    const result = await mutateAsync({})

    if (onSubmit) {
      onSubmit(await result.json())
    }

    router.push("/operations?tab=completed")
  }

  return (
    <>
      <Button onClick={submit} loading={isLoading}>
        {children}
      </Button>
    </>
  )
}
