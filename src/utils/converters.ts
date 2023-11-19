export const stringToNumberEnum: {
  <T>(str: string): T
  <T>(str: string | null): T | null
} = <T>(str: string | null): T | null => {
  const result = str ? (parseInt(str) as T) : null
  return result
}

export const stringToBoolean = (val: string | undefined | null) => {
  if (val === "true") {
    return true
  } else if (val === "false") {
    return false
  } else {
    return null
  }
}

export const stringFromBoolean = (val: boolean | null) => {
  if (val === true) {
    return "true"
  } else if (val === false) {
    return "false"
  } else {
    return null
  }
}

export const stringToDate = (date: Date) => {
  return date === null ? null : new Date(date)
}

export const stringToEmpty = (str: string | null) => {
  return str ? str : ""
}
