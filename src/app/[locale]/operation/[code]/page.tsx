"use client"

import OperationForm from "@/components/operation/OperationForm"

export default function OperationDetailPage({ params }: { params: { code: string } }) {
  return (
    <main>
      <OperationForm code={params.code} />
    </main>
  )
}
