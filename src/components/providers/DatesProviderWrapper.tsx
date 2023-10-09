import { DatesProvider } from "@mantine/dates"
import 'dayjs/locale/ja'

function DateProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <DatesProvider settings={{ locale: "ja", firstDayOfWeek: 0, weekendDays: [0] }}>
      {children}
    </DatesProvider>
  )
}
export default DateProviderWrapper
