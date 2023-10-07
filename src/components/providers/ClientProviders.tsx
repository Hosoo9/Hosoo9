"use client"

import { AppShell, MantineProvider } from "@mantine/core"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"
import CustomHeader from "../layout/header"
import { CustomNavbar } from "../layout/navbar"
import DateProviderWrapper from "./DatesProviderWrapper"

const queryClient = new QueryClient()

function ClientProviders({
  children,
  params: { locale },
  messages,
}: {
  children: React.ReactNode
  params: { locale: any }
  messages: any
}) {
  const [isClosed, setIsClosed] = useState<boolean>(false)

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={{}} withGlobalStyles withNormalizeCSS>
        <DateProviderWrapper>
          <AppShell
            padding="md"
            navbar={<CustomNavbar isClosed={isClosed} />}
            header={<CustomHeader isClosed={isClosed} setIsClosed={setIsClosed} />}
            styles={(theme) => ({
              main: {
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[8]
                    : theme.colors.gray[0],
              },
            })}
          >
            {children}
          </AppShell>
        </DateProviderWrapper>
      </MantineProvider>
    </QueryClientProvider>
  )
}
export default ClientProviders
