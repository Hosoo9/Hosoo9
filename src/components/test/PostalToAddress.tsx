import { Button, Input } from "@mantine/core"
import { useTranslations } from "next-intl"
import { useState } from "react"

// TODO: properly type form prop
export default function PostalToAddress({ form }: { form: any }) {
  const t = useTranslations("OperationForm")

  const [zipcode, setZipcode] = useState("") // 郵便番号
  const [pref, setPref] = useState("") // 都道府県
  const [address, setAddress] = useState("") // 住所
  const [msg, setMsg] = useState(null) // エラーメッセージ

  const getAddress = async (): Promise<void> => {
    try {
      const response = await fetch(
        `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipcode}`,
      )

      const data = await response.json()

      if (data.status === 200) {
        setPref(data.results[0].address1)
        setAddress(data.results[0].address2 + data.results[0].address3)
        setMsg(null)
      } else {
        setPref("")
        setAddress("")
        setMsg(data.message)
      }
    } catch (error) {
      // Handle error if the fetch fails
      console.error("Error fetching data:", error)
      // Assuming you have appropriate error handling logic
    }
  }

  return (
    <>
      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-3">
            <Input.Wrapper placeholder="" label={t("customerNumber")}>
              <Input
                data-testid="customerNumber"
                {...form.getInputProps("customerNumber")}
              ></Input>
            </Input.Wrapper>
          </div>
          <div className="col-span-3">
            <Input.Wrapper placeholder="例)0123456" label={t("postalCode")}>
              <Input
                data-testid="postCode"
                value={zipcode}
                maxLength={7}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setZipcode(e.target.value)
                }
                {...form.getInputProps("postalCode")}
              ></Input>
            </Input.Wrapper>
            <Button onClick={getAddress}>{t("addressAutoFill")} </Button>
            {msg ? <p className="errMsg">{msg}</p> : null}
          </div>
          <div className="col-span-1">
            <Input.Wrapper placeholder="" label={t("prefectures")}>
              <Input
                data-testid="prefectures"
                value={pref}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPref(e.target.value)
                }
                {...form.getInputProps("prefectures")}
              ></Input>
            </Input.Wrapper>
          </div>
          <div className="col-span-1">
            <Input.Wrapper placeholder="" label={t("municipalities")}>
              <Input
                data-testid="municipalities"
                value={address}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setAddress(e.target.value)
                }
                {...form.getInputProps("municipality")}
              ></Input>
            </Input.Wrapper>
          </div>
          <div className="col-span-1">
            <Input.Wrapper placeholder="" label={t("address")}>
              <Input data-testid="address" {...form.getInputProps("address")}></Input>
            </Input.Wrapper>
          </div>
          <div className="col-span-1">
            <Input.Wrapper placeholder="" label={t("buildingNameRoomNumber")}>
              <Input
                data-testid="buildingNameRoomNumber"
                {...form.getInputProps("buildingNameRoomNumber")}
              ></Input>
            </Input.Wrapper>
          </div>
        </div>
      </div>
    </>
  )
}
