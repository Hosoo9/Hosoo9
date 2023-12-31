import dayjs from 'dayjs'

export const formatDate = (isoDate: string) => {
  if (!isoDate) {
    return null
  }
  
  // format  date in japanese
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // Use 24-hour format
  }).format(new Date(isoDate))
}

export const formatDay = (isoDate?: string | null) => {
  if (!isoDate) {
    return null
  }

  return dayjs(isoDate).format("YYYY/MM/DD")
}

export const adjustDateToTimezone = (isoDate: string | null) => {
  if (isoDate === null) {
    return null
  }

  return dayjs(isoDate).add(9, "hours").toDate()
}

export const cDayJs = dayjs
