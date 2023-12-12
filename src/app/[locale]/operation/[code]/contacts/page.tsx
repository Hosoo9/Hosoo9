import ContactHistory from "@/components/contact/ContactHistory"
import { OperationHeader } from "@/components/operation/OperationHeader"
import { protectPage } from "@/lib/session"
import { Container } from "@mantine/core"

export default async function OperationContactPage({ params }: { params: { code: string } }) {
  await protectPage()

  return (
    <Container fluid>
      <OperationHeader className="mt-5" code={params.code} showBack={true} />

      <div>
        <ContactHistory code={params.code} />
      </div>
    </Container>
  )
}
