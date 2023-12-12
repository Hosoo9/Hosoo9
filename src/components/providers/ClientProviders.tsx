"use client"

import { AppShell, Burger, Container, MantineThemeProvider, createTheme } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Sidebar } from "../Sidebar";

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
  const [opened, { toggle }] = useDisclosure()

  const theme = createTheme({
    components: {
      DatePickerInput: DatePickerInput.extend({
        defaultProps: {
          monthsListFormat: "MM",
          yearsListFormat: "YY",
          valueFormat: "YYYY/MM/DD",
          decadeLabelFormat: "YYYY",
          monthLabelFormat: "YYYY/MM",
        },
      }),
    },
  })

  return (
    <MantineThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AppShell
          padding="sm"
          navbar={{
            width: 250,
            breakpoint: "sm",
            collapsed: { mobile: !opened, desktop: false },
          }}
          // navbar={<CustomNavbar isClosed={isClosed} />}
          // header={<CustomHeader isClosed={isClosed} setIsClosed={setIsClosed} />}
        >
          {/* <AppShell.Header> */}
          {/*   <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" /> */}
          {/* </AppShell.Header> */}
          <AppShell.Navbar>
            <Sidebar onBurgerClick={() => toggle()} opened={opened} />
          </AppShell.Navbar>
          <AppShell.Main>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Container size="lg">{children}</Container>
          </AppShell.Main>
        </AppShell>
      </QueryClientProvider>
    </MantineThemeProvider>
  )
}
export default ClientProviders
