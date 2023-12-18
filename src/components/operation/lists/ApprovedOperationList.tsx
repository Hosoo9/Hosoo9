"use client"

import { useTranslations } from "next-intl"
import OperationList from "../OperationList"

export default function ApprovedOperationList({}: {}) {
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

  const onComplete = async () => {
    console.log(`-------------"batchUpdate"---------------`)
    console.log("batchUpdate")
    console.log(`----------------------------`)
  }

  return (
    <OperationList
      statuses={[3, 5]}
      className="py-5"
      actionTitle={t("completeOperation")}
      onAction={onComplete}
      // onAction={onApprove}
      // actionTitle={t("approve")}
      // secondActionTitle={t("reject")}
      // onSecondAction={onReject}
    />
  )
}
