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

export const transformCustomerData = (data: any) => {
  return {
    ...data,
    name: stringToEmpty(data.name),
    nameKana: stringToEmpty(data.nameKana),
    phoneNumber: stringToEmpty(data.phoneNumber),
    customerNumber: stringToEmpty(data.customerNumber),
    municipality: stringToEmpty(data.municipality),
    address: stringToEmpty(data.address),
    phoneNumberType: data.phoneNumberType ? data.phoneNumberType.toString() : null,
    housingType: data.housingType ? data.housingType.toString() : null,
    postalCode: stringToEmpty(data.postalCode),
    buildingNameRoomNumber: stringToEmpty(data.buildingNameRoomNumber),
    mailAddress: stringToEmpty(data.mailAddress),
  }
}

