"use client"

import { useTranslations } from "next-intl"
import OperationList from "../OperationList"

export default function DraftOperationList({}: {}) {
  const t = useTranslations("OperationForm")

  const onAction = async () => {
    console.log(`-------------"batchUpdate"---------------`)
    console.log("batchUpdate")
    console.log(`----------------------------`)
  }

  return (
    <OperationList
      statuses={[1]}
      className="py-5"
      actionTitle={t("submitForApproval")}
      onAction={onAction}
    />
  )
}
