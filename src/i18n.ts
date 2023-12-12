import { getRequestConfig } from "next-intl/server"

export default getRequestConfig(async ({ locale }) => ({
  timeZone: "Asia/Tokyo",
  messages: (await import(`../src/messages/${locale}.json`)).default,
}))
