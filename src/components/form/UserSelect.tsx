import { Select } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"

function UserSelect({
  form,
  className,
  label,
  name,
}: {
  form: any
  className?: string
  label: string
  name: string
}) {
  const t = useTranslations("OperationForm")

  const router = useRouter()
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const result = await fetch(`/api/users?role=technician`)
      return result.json()
    },
    onSettled: (data: any) => {
    },
  })

  const selectData = data?.map((user: any) => {
    return { value: user.id, label: user.name }
  })

  return (
    <Select
      label={label}
      data={selectData}
      {...form.getInputProps(name)}
    ></Select>
  )
}
export default UserSelect
