import { Radio, Select, TextInput } from "@mantine/core"
import { useTranslations } from "next-intl"
import { IMaskInput } from "react-imask"
import PostalToAddress from "./PostalToAddress"

export const CustomerInformation = ({
  form,
  className,
  noMailAddress,
  noSearch,
  noTitle,
}: {
  form: any
  className?: string
  noMailAddress?: boolean
  noSearch?: boolean
  noTitle?: boolean
}) => {
  const t = useTranslations("OperationForm")

  const isReadOnly: boolean = false

  return (
    <div className="flex flex-col gap-3 mt-5">
      <div>
        <PostalToAddress form={form} isReadOnly={isReadOnly} />
      </div>
      <div>
        <Radio.Group
          name="housingType"
          label={t("buildingType")}
          // withAsterisk
          // required
          {...form.getInputProps("housingType")}
        >
          {/* <Group mt="xs"> */}
          <Radio value="1" label={t("housingType1")} my="xs" disabled={isReadOnly} />
          <Radio value="2" label={t("housingType2")} my="xs" disabled={isReadOnly} />
          {/* </Group> */}
        </Radio.Group>
      </div>
      <div>
        <div className="flex gap-3">
          <TextInput
            placeholder=""
            label={t("nameCompanyName")}
            {...form.getInputProps("name")}
            disabled={isReadOnly}
          ></TextInput>
          <TextInput
            placeholder=""
            label={t("nameKana")}
            {...form.getInputProps("nameKana")}
            disabled={isReadOnly}
          ></TextInput>
        </div>
      </div>
      <div>
        {/* required withAsterisk> */}
        <TextInput
          label={t("phoneNumber")}
          maw={500}
          data-testid="phoneNumber"
          component={IMaskInput}
          mask="(000) 0000-0000"
          placeholder=""
          disabled={isReadOnly}
          {...form.getInputProps("phoneNumber")}
        />
      </div>
      <div>
        <Select
          {...form.getInputProps("phoneNumberType")}
          label={t("phoneNumberType")}
          // required
          // withAsterisk
          data={[
            { value: "1", label: t("onesHome") },
            { value: "2", label: t("workplace") },
            { value: "3", label: t("mobilePhone") },
          ]}
          disabled={isReadOnly}
        ></Select>
      </div>
      { noMailAddress !== true && (
        <div>
          <TextInput
            label={t("mailAddress")}
            w={300}
            placeholder=""
            data-testid="mailAddress"
            disabled={isReadOnly}
            {...form.getInputProps("mailAddress")}
          />
        </div>
      )}
    </div>
  )
}
