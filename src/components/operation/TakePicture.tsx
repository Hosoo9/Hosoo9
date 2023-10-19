import "dayjs/locale/ja"

import { Button, FileButton, Image, Input, Title } from "@mantine/core"
import { IconCamera } from "@tabler/icons-react"
import { useState } from "react"
import { useTranslations } from "next-intl"

export const TakePicture = () => {
  const t = useTranslations("OperationForm")

  const [file, setFile] = useState<File | null>(null)

  return (
    <>
      <Title order={3} size="h4" className="pb-3">
        {t("meterImage")}
      </Title>

      <div className="pb-5 pt-2">
        {file && (
          <Image
            alt={t("meterImage")}
            h={200}
            w="auto"
            fit="contain"
            radius="md"
            src={URL.createObjectURL(file)}
          />
        )}
      </div>

      <FileButton onChange={setFile} accept="image/png,image/jpeg">
        {(props) => (
          <Button {...props} variant="filled">
            <IconCamera size="24" />
            <span className="pl-2">{t("takePicture")}</span>
          </Button>
        )}
      </FileButton>
    </>
  )
}
