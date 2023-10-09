"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Sidebar } from "../Sidebar";
import classes from "../Sidebar.module.css"
import DateProviderWrapper from "./DatesProviderWrapper";
import { Container } from '@mantine/core';

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
      {/* <AppShell */}
      {/*   padding="md" */}
      {/*   navbar={<CustomNavbar isClosed={isClosed} />} */}
      {/*   header={<CustomHeader isClosed={isClosed} setIsClosed={setIsClosed} />} */}
      {/*   styles={(theme) => ({ */}
      {/*     main: { */}
      {/*       backgroundColor: */}
      {/*       theme.colorScheme === "dark" */}
      {/*         ? theme.colors.dark[8] */}
      {/*         : theme.colors.gray[0], */}
      {/*     }, */}
      {/*   })} */}
      {/* > */}
      <div className="flex">
        <Sidebar  />

        <main className={classes.main}>
          <Container size="lg">
            {children}
          </Container>
        </main>
      </div>
      {/* </AppShell> */}
    </QueryClientProvider>
  )
}
export default ClientProviders
