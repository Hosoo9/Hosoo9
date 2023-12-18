"use client"

import { useTranslations } from "next-intl"
import OperationList from "../OperationList"

export default function RequestedOperationList({}: {}) {
  const t = useTranslations("OperationForm")

  const onApprove = async () => {
    console.log(`-------------"batchUpdate"---------------`)
    console.log("batchUpdate")
    console.log(`----------------------------`)
  }

  const onReject = async () => {
    console.log(`-------------"batchUpdate"---------------`)
    console.log("batchUpdate")
    console.log(`----------------------------`)
  }

  return (
    <OperationList
      statuses={[2]}
      className="py-5"
      onAction={onApprove}
      actionTitle={t("approve")}
      secondActionTitle={t("reject")}
      onSecondAction={onReject}
    />
  )
}
