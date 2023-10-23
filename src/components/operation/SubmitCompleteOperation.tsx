import { Button } from "@mantine/core"
import { useMutation } from "@tanstack/react-query"
import { useTranslations } from "next-intl"

export const SubmitCompleteOperation = ({
  code,
  children,
  onSubmit,
}: {
  code: string
  children: React.ReactNode,
  onSubmit?: (result: any) => void
}) => {
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
    const result = await mutateAsync({})
    
    if (onSubmit) {
      onSubmit(result)
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
