import { LoaderComponent } from "@/components/Provider"
import { Tabs } from "@mantine/core"
import { useTranslations } from "next-intl"
import OperationHistory from "../operation/OperationHistory"
import CustomerAlarmTab from "./CustomerAlarmTab"
import CustomerChipTab from "./CustomerChipTab"
import CustomerEquipmentTab from "./CustomerEquipmentTab"
import CustomerStaticHeader from "./CustomerStaticHeader"

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
            <CustomerStaticHeader customer={customer} />

            <Tabs defaultValue="customer-info">
              <Tabs.List>
                <Tabs.Tab value="customer-info">
                  基本情報
                </Tabs.Tab>
                <Tabs.Tab value="equipment">
                  器具情報
                </Tabs.Tab>
                <Tabs.Tab value="alarm">
                  謷報器情報
                </Tabs.Tab>
                {/* <Tabs.Tab value="payment-history"> */}
                {/*   TODO: Payment history */}
                {/* </Tabs.Tab> */}
                <Tabs.Tab value="operation-history">
                  { t("operationHistory") }
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

              <Tabs.Panel value="operation-history">
                <OperationHistory customerNumber={customer.customerNumber} />
              </Tabs.Panel>
            </Tabs>
          </>
      )}

    </div>
  )
}

export default CustomerExternal
