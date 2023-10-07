import LoadingProvider from "@/utils/loadingProvider"
import { NextIntlClientProvider } from "next-intl"
import { notFound } from "next/navigation"
import Provider from "../../components/Provider"
import ClientProviders from "../../components/providers/ClientProviders"
import "./globals.css"

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "jp" }]
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
      </body>
    </html>
  )
}
