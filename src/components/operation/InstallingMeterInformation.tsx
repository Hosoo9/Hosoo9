import { Button, Input, Modal, NumberInput, Radio, Select, Title } from "@mantine/core"
import { MonthPickerInput } from "@mantine/dates"
import { useDisclosure } from "@mantine/hooks"
import { useTranslations } from "next-intl"
import CalculateSection from "../customer/CalculateSection"
import { MeterManufacturerSelect } from "./MeterManufacturerSelect"
import { MeterModelSelect } from "./MeterModelSelect"
import { MeterSizeSelect } from "./MeterSizeSelect"
import { TakePicture } from "./TakePicture"

export const InstallingMeterInformation = ({
  form,
  customerNumber,
  className,
}: {
  form: any
  className?: string
  customerNumber: string
}) => {
  const t = useTranslations("OperationForm")

  const [opened, { open, close }] = useDisclosure(false)

  return (
    <div className={className}>
      {/* <Title order={2} size="h3" className="pb-5"> */}
      {/*   {t("installingMeterInformation")} */}
      {/* </Title> */}
      <Title order={3} size="h4" className="py-3">
        {t("leakInvestigationBeforeWork")}
      </Title>

      <div className="grid grid-cols-5 gap-3 py-5">
        <div>
          <Select
            label={t("inspectionType")}
            data-testid="beforeWorkInspectionType"
            data={[
              { value: "1", label: "ゲージ" },
              { value: "2", label: "検知器" },
              { value: "3", label: "発砲" },
            ]}
            {...form.getInputProps("beforeWorkInspectionType")}
          ></Select>
        </div>
        <div>
          <Input.Wrapper label={t("kpa")}>
            <NumberInput
              data-testid="beforeWorkKpa"
              {...form.getInputProps("beforeWorkKpa")}
            />{" "}
          </Input.Wrapper>
        </div>
        <div>
          <Radio.Group label={t("result")} {...form.getInputProps("beforeWorkResult")}>
            {/* name="result" */}
            {/* {...form.getInputProps("result")} */}
            {/* <Group mt="xs"> */}
            <Radio value="2" label={t("passed")} my="xs" />
            <Radio value="1" label={t("notPassed")} my="xs" />
            {/* </Group> */}
          </Radio.Group>
        </div>
      </div>

      <Title order={3} size="h4" className="py-3">
        {t("leakInvestigationAfterWork")}
      </Title>
      <div className="grid grid-cols-5 gap-3 py-5">
        <div>
          <Select
            label={t("inspectionType")}
            data-testid="afterWorkInspectionType"
            data={[
              { value: "1", label: "ゲージ" },
              { value: "2", label: "検知器" },
              { value: "3", label: "発砲" },
            ]}
            {...form.getInputProps("afterWorkInspectionType")}
          ></Select>
        </div>
        <div>
          <Input.Wrapper label={t("kpa")}>
            <NumberInput
              data-testid="afterWorkKpa"
              {...form.getInputProps("afterWorkKpa")}
            />{" "}
          </Input.Wrapper>
        </div>
        <div>
          <Radio.Group label={t("result")} {...form.getInputProps("afterWorkResult")}>
            {/* name="result" */}
            {/* {...form.getInputProps("result")} */}
            {/* <Group mt="xs"> */}
            <Radio value="2" label={t("passed")} my="xs" />
            <Radio value="1" label={t("notPassed")} my="xs" />
            {/* </Group> */}
          </Radio.Group>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-3 py-5">
        <MeterModelSelect form={form} name="installingMeterModel" />
        <MeterManufacturerSelect form={form} name="installingMeterManufacturer" />
        <MeterSizeSelect form={form} name="installingMeterSize" />
        <NumberInput
          label={t("meterMaximumUsage")}
          data-testid="meterMaximumUsage"
          name="installingMeterMaximumUsage"
          {...form.getInputProps("installingMeterMaximumUsage")}
        />

        <Button className="self-end" color="violet" onClick={() => open()}>
          {t("calculate")}
        </Button>
      </div>

      <Modal size="lg" opened={opened} onClose={close} title={t("calculate")}>
        <CalculateSection customerNumber={customerNumber} />
      </Modal>

      <div className="grid grid-cols-5 gap-3 pb-5">
        <div>
          <Input.Wrapper label={t("meterNumber")}>
            <Input
              data-testid="meterNumber"
              {...form.getInputProps("installingMeterNumber")}
            />{" "}
          </Input.Wrapper>
        </div>

        <div>
          <Input.Wrapper label={t("meterValue")}>
            <Input
              data-testid="meterValue"
              {...form.getInputProps("installingMeterValue")}
            />{" "}
          </Input.Wrapper>
        </div>

        <div>
          <MonthPickerInput
            label={t("meterInspectionDate")}
            {...form.getInputProps("installingMeterReferenceDate")}
          />
        </div>
      </div>

      <div className="pb-5">
        <TakePicture />

        <div className="grid grid-cols-1 gap-3 py-5">
          <div>
            <Input.Wrapper label={t("memo")}>
              <Input data-testid="memo" {...form.getInputProps("memo")} />{" "}
            </Input.Wrapper>
          </div>
        </div>
      </div>
    </div>
  )
}
