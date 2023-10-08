import LoadingProvider from "@/utils/loadingProvider"
import { MantineProvider } from "@mantine/core"
import { NextIntlClientProvider } from "next-intl"
import { notFound } from "next/navigation"
import Provider from "../../components/Provider"
import ClientProviders from "../../components/providers/ClientProviders"
import "./globals.css"

import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'

export function generateStaticParams() {
  return [{ locale: "jp" }, { locale: "mn" }]
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: any }
}) {
  let messages

  try {
    messages = (await import(`../../messages/${locale}.json`)).default
  } catch (error) {
    notFound()
  }

  return (
    <html lang={locale}>
      <body suppressHydrationWarning={true}>
        <MantineProvider theme={{}}>
          <LoadingProvider>
            <Provider>
              <NextIntlClientProvider locale={locale} messages={messages}>
                <ClientProviders params={{ locale }} messages={messages}>
                  {children}
                </ClientProviders>
                {/* <MainWrapper> */}
                {/* </MainWrapper> */}
              </NextIntlClientProvider>
            </Provider>
          </LoadingProvider>
        </MantineProvider>
      </body>
    </html>
  )
}
