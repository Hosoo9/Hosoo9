import { TextInput } from "@mantine/core"
import { useTranslations } from "next-intl"

// TODO: properly type form prop
export default function PostalToAddress({
  form,
  isReadOnly,
}: {
  form: any
  isReadOnly: boolean
}) {
  const t = useTranslations("OperationForm")

  // const [zipcode, setZipcode] = useState("") // 郵便番号
  // const [pref, setPref] = useState("") // 都道府県
  // const [address, setAddress] = useState("") // 住所
  // const [msg, setMsg] = useState(null) // エラーメッセージ

  // const getAddress = async (): Promise<void> => {
  //   try {
  //     const response = await fetch(
  //       `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipcode}`,
  //     )

  //     const data = await response.json()

  //     if (data.status === 200) {
  //       setPref(data.results[0].address1)
  //       setAddress(data.results[0].address2 + data.results[0].address3)
  //       setMsg(null)
  //     } else {
  //       setPref("")
  //       setAddress("")
  //       setMsg(data.message)
  //     }
  //   } catch (error) {
  //     // Handle error if the fetch fails
  //     console.error("Error fetching data:", error)
  //     // Assuming you have appropriate error handling logic
  //   }
  // }

  return (
    <>
      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-3">
            <div className="flex gap-3">
              <TextInput 
                label={t("customerNumber")} 
                w={130}
                data-testid="customerNumber"
                disabled={isReadOnly}
                maxLength={11}
                required
                withAsterisk
                {...form.getInputProps("customerNumber")}
              />
              <TextInput
                data-testid="postCode"
                label={t("postalCode")}
                maxLength={7}
                disabled={isReadOnly}
                {...form.getInputProps("postalCode")}
                w={150}
              ></TextInput>

              <TextInput
                label={t("municipalities")}
                data-testid="municipality"
                {...form.getInputProps("municipality")}
                disabled={isReadOnly}
              ></TextInput>
            </div>
          </div>
          <div className="col-span-3">
            <div className="flex gap-3">
              <TextInput
                label={t("address")}
                data-testid="address"
                disabled={isReadOnly}
                {...form.getInputProps("address")}
                w={700}
              ></TextInput>

              <TextInput
                label={t("buildingNameRoomNumber")}
                data-testid="buildingNameRoomNumber"
                disabled={isReadOnly}
                {...form.getInputProps("buildingNameRoomNumber")}
                w={400}
              ></TextInput>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
