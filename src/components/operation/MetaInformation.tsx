import { getOperationStateName } from "@/lib/enum/operation-state"
import {
    Input
} from "@mantine/core"
import { useTranslations } from "next-intl"

export const MetaInformation = ({ form, operation }: { form: any, operation: any }) => {
  const t = useTranslations("OperationForm")

  return (
    <>
      <div className="grid grid-cols-5 gap-3 py-5">
        <div className="col-span-1">
          <Input.Wrapper label={t("workDetails")}>
            <Input data-testid="workDetails" disabled  />
          </Input.Wrapper>
        </div>
        <div className="col-span-1">
          <Input.Wrapper label={t("status")}>
            <Input data-testid="status" disabled value={operation ? getOperationStateName(operation.status) : ""} />{" "}
          </Input.Wrapper>
        </div>
        <div className="col-span-1">
          <Input.Wrapper label={t("author")}>
            <Input data-testid="author" disabled value={form.values.createdByUser?.name} />{" "}
          </Input.Wrapper>
        </div>
        <div className="col-span-1">
          <Input.Wrapper label={t("createdAt")}>
            <Input data-testid="creationDatetime" disabled value={form.values.createdAt} />{" "}
          </Input.Wrapper>
        </div>
        <div className="col-span-1">
          <Input.Wrapper label={t("completedAt")}>
            <Input data-testid="completedAt" disabled />{" "}
          </Input.Wrapper>
        </div>
      </div>
    </>
  )
}
