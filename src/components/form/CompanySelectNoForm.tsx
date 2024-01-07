import { Loader, Select } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"

function CompanySelectNoForm({
  className,
  label,
  name,
  onChange,
  value,
}: {
  className?: string
  label: string
  name: string
  onChange: (value: string | null) => void
  value: string | null
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
        <Select
          clearable={true}
          label={label}
          data={selectData}
          onChange={onChange}
          value={value}
        ></Select>
      )}
    </>
  )
}
export default CompanySelectNoForm
