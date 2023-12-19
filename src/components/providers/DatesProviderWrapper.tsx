import { DatesProvider } from "@mantine/dates"
import 'dayjs/locale/ja'

function DateProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <DatesProvider settings={{ locale: "ja", timezone: "Asia/Tokyo" }}>
      {children}
    </DatesProvider>
  )
}
export default DateProviderWrapper
