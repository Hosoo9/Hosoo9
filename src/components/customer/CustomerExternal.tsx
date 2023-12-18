import { useTranslations } from "next-intl"
import { Paper, Tabs } from "@mantine/core"
import { LoaderComponent } from "@/components/Provider"
import CustomerChipTab from "./CustomerChipTab"
import CustomerEquipmentTab from "./CustomerEquipmentTab"
import CustomerAlarmTab from "./CustomerAlarmTab"

const CustomerExternal = ({
  customer,
  isLoading = false,
}: {
  customer: any
  isLoading: boolean
}) => {
  const t = useTranslations("OperationForm")

  return (
    <div className="py-5">
      {isLoading ? (
        <LoaderComponent />
      ) : (
          <>
            <Paper withBorder shadow="xs" p="lg" mb="lg">
              <div className="mb-2">
                <span className="font-semibold">{t("customerNumber")}:</span>{" "}
                {customer.customerNumber}
              </div>
              <div className="mb-2">
                <span className="font-semibold">{t("postalCode")}:</span>{" "}
                {customer.postalCode}
              </div>
              <div className="mb-2">
                <span className="font-semibold">{t("municipalities")}:</span>{" "}
                {customer.municipality}
              </div>
              <div className="mb-2">
                <span className="font-semibold">{t("address")}:</span> {customer.address}
              </div>
              <div className="mb-2">
                <span className="font-semibold">{t("buildingNameRoomNumber")}:</span>{" "}
                {customer.buildingNameRoomNumber}
              </div>
              <div className="mb-2">
                <span className="font-semibold">{t("buildingType")}:</span>{" "}
                {customer.housingType}
              </div>
              <div className="mb-2">
                <span className="font-semibold">{t("nameCompanyName")}:</span> {customer.name}
              </div>
              <div className="mb-2">
                <span className="font-semibold">{t("nameKana")}:</span> {customer.nameKana}
              </div>
              <div className="mb-2">
                <span className="font-semibold">{t("phoneNumber")}:</span>{" "}
                {customer.phoneNumber}
              </div>
              <div className="mb-2">
                <span className="font-semibold">{t("phoneNumberType")}:</span>{" "}
                {customer.phoneNumberType}
              </div>
              <div className="mb-2">
                <span className="font-semibold">{t("mailAddress")}:</span>{" "}
                {customer.mailAddress}
              </div>
            </Paper>

            <Tabs defaultValue="customer-info">
              <Tabs.List>
                <Tabs.Tab value="customer-info">
                  基本情報
                </Tabs.Tab>
                <Tabs.Tab value="equipment">
                  器具情報
                </Tabs.Tab>
                <Tabs.Tab value="alarm">
                  營報器情報
                </Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="customer-info">
                <CustomerChipTab customer={customer} />
              </Tabs.Panel>

              <Tabs.Panel value="equipment">
                <CustomerEquipmentTab />
              </Tabs.Panel>

              <Tabs.Panel value="alarm">
                <CustomerAlarmTab />
              </Tabs.Panel>
            </Tabs>

          </>
      )}

    </div>
  )
}

export default CustomerExternal
