"use client"

import { useTranslations } from "next-intl"
import OperationList from "../OperationList"

export default function RejectedOperationList({}: {}) {
  const t = useTranslations("OperationForm")

  const onAction = async () => {
    console.log(`-------------"batchUpdate"---------------`)
    console.log("batchUpdate")
    console.log(`----------------------------`)
  }

  return (
    <OperationList
      isExpired={false}
      statuses={[4]}
      className="py-5"
      actionTitle={t("submitForApproval")}
      onAction={onAction}
    />
  )
}
