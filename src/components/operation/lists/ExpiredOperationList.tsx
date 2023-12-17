"use client"

import { useTranslations } from "next-intl"
import OperationList from "../OperationList"

export default function ExpiredOperationList({}: {}) {
  const t = useTranslations("OperationForm")

  const onAction = async () => {
    console.log(`-------------"batchUpdate"---------------`)
    console.log("batchUpdate")
    console.log(`----------------------------`)
  }

  return (
    <OperationList
      isExpired={true}
      statuses={[1]}
      className="py-5"
      actionTitle={t("submitForApproval")}
      onAction={onAction}
    />
  )
}
