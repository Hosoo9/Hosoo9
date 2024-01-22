import { Select } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { Loader } from "@mantine/core"

function CompanySelect({
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
    queryKey: ["companies"],
    queryFn: async () => {
      const result = await fetch(`/api/companies`)
      return result.json()
    },
  })

  const selectData = data?.map((company: any) => {
    return { value: company.id, label: company.name }
  })

  return (
    <>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <Select label={label} data={selectData} {...form.getInputProps(name)}></Select>
      )}
    </>
  )
}
export default CompanySelect
