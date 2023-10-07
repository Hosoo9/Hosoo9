import { DatesProvider } from "@mantine/dates"

function DateProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <DatesProvider settings={{ locale: "jp", firstDayOfWeek: 0, weekendDays: [0] }}>

      {children}

    </DatesProvider>
  )
}
export default DateProviderWrapper
