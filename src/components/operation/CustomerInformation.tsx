import { Input, Title } from "@mantine/core"
import { useTranslations } from "next-intl"
import { IMaskInput } from "react-imask"

export const CustomerInformation = () => {
  const t = useTranslations("OperationForm")

  return (
    <div>
      <Title order={2} size="h3">
        {t("customerInformation")}
      </Title>

      <div className="grid grid-cols-5 gap-3 py-5">
        <div>
          <Input.Wrapper label={t("customerNumber")}>
            <Input
              data-testid="customerNumber"
              component={IMaskInput}
              mask="00000-000000"
            />{" "}
          </Input.Wrapper>
        </div>
        <div>
          <Input.Wrapper label={t("postalCode")}>
            <Input 
              data-testid="postalCode" 
              component={IMaskInput}
              mask="00000-000000"
            />{" "}
          </Input.Wrapper>
        </div>
        <div>
          <Input.Wrapper label={t("municipalities")}>
            <Input data-testid="municipalities" />{" "}
          </Input.Wrapper>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3 pb-5">
        <div>
          <Input.Wrapper label={t("address")}>
            <Input data-testid="address" />{" "}
          </Input.Wrapper>
        </div>
        <div>
          <Input.Wrapper label={t("buildingNameRoomNumber")}>
            <Input data-testid="buildingNameRoomNumber" />{" "}
          </Input.Wrapper>
        </div>
        <div>
          <Input.Wrapper label={t("nameCompanyName")}>
            <Input data-testid="nameCompanyName" />{" "}
          </Input.Wrapper>
        </div>
        <div>
          <Input.Wrapper label={t("nameKana")}>
            <Input data-testid="nameKana" />{" "}
          </Input.Wrapper>
        </div>
        <div>
          <Input.Wrapper label={t("phoneNumber")} maw={500}>
            <Input
              data-testid="phoneNumber"
              component={IMaskInput}
              mask="(000) 0000-0000"
              // {...form.getInputProps("phoneNumber")}
            />
          </Input.Wrapper>
        </div>
      </div>
    </div>
  )
}
