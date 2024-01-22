"use client"

import OperationList from "@/components/operation/OperationList"
import { Title } from "@mantine/core"

export default function ChangedListPage({}: {}) {
  return (
    <div>
      <Title className="my-5" size="h2">変更リスト</Title>

      <OperationList count={0} />
    </div>
  )
}
