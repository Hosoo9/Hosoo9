"use client"

/* Todo list/Memo 
1. Email zasna
2. Select button uudiin data oruulna
3. Cash - Payment method Lease- Signature
4. 
*/

import "dayjs/locale/ja"

import { Button, Container, Input, Select } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useMutation } from "@tanstack/react-query"
import { useTranslations } from "next-intl"

function UserForm({
  user: user,
  onSave,
}: {
  user?: any
  onSave?: (data: any) => void
}) {
  const form = useForm({
    initialValues: {
      id: user?.id ||"",
      name: user?.name || "",
      nameKana: user?.nameKana || "",
      role: user?.role ? user.role.toString() : null,
    },
  })

  type FormValues = typeof form.values

  const { isLoading, isSuccess, error, mutateAsync } = useMutation({
    mutationFn: async (user: FormValues) => {
      const result = await fetch(`/api/admin/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })

      return result.json()
    },
  })

  const t = useTranslations("OperationForm")

  const saveUser = async (values: FormValues) => {
    const result = await mutateAsync(values)

    if (onSave) {
      onSave(result)
    }
  }

  return (
    <form onReset={form.onReset} onSubmit={form.onSubmit(saveUser)}>
      <div className="flex flex-col gap-3">
        <div>
          <Input.Wrapper label={t("id")}>
            <Input data-testid="id" {...form.getInputProps("id")} disabled={!!user} />{" "}
          </Input.Wrapper>
        </div>
        <div>
          <Input.Wrapper label={t("name")}>
            <Input data-testid="name" {...form.getInputProps("name")} />{" "}
          </Input.Wrapper>
        </div>
        <div>
          <Input.Wrapper label={t("nameKana")}>
            <Input data-testid="nameKana" {...form.getInputProps("nameKana")} />{" "}
          </Input.Wrapper>
        </div>
        <div>
          <Select
            label={t("role")}
            data={[
              { value: "1", label: t("role1") },
              { value: "2", label: t("role2") },
              { value: "3", label: t("role3") },
            ]}
            {...form.getInputProps(`role`)}
          ></Select>
        </div>
        <Button className="mt-5" type="submit" disabled={isLoading}>
          Save
        </Button>
      </div>
    </form>
  )
}

export default UserForm
