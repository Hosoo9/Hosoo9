import { Button } from "@mantine/core"
import { useMutation } from "@tanstack/react-query"
import { useTranslations } from "next-intl"

export const SubmitForApproval = ({
  code,
  children,
  onSubmit,
  beforeSubmit,
}: {
  code: string
  children: React.ReactNode,
  beforeSubmit?: () => Promise<void>,
  onSubmit?: (result: any) => void
}) => {
  const t = useTranslations("OperationForm")

  const { isLoading, isSuccess, error, mutateAsync } = useMutation({
    mutationFn: async (operation: any) => {
      const result = await fetch(`/api/operation/${code}/request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(operation),
      })

      return result.json()
    },
  })

  const submit = async () => {
    if (beforeSubmit) {
      await beforeSubmit()
    }

    const result = await mutateAsync({})

    if (result.status === 200) {
      if (onSubmit) {
        onSubmit(result)
      }
    }
  }

  return (
    <>
      <Button onClick={submit} loading={isLoading}>
        {children}
      </Button>
    </>
  )
}
