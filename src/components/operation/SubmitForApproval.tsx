import { Button } from "@mantine/core"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

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
  const router = useRouter()

  const { isLoading, isSuccess, error, mutateAsync } = useMutation({
    mutationFn: (operation: any) => {
      const result = fetch(`/api/operation/${code}/request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(operation),
      })

      return result
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

      router.push("/operations?tab=requested")
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
