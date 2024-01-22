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
    ...getCustomerDataFrom(data),
  }
}

export const getCustomerDataFrom = (data: any) => {
  return {
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

export const renderGasSupKei = (input?: string | null) => {
  if (input === '1') {
    return '6B'
  } else if (input === '2') {
    return '特定ガス'
  } else if (input === '3') {
    return '簡易ガス'
  } else if (input === '4') {
    return '13A'
  } else {
    return ''
  }
}

export const renderTatemonoKbn = (input?: string | null) => {
  const result = input ? input.trim() : null

  if (result === '1') {
    return '特定地下街等'
  } else if (result === '2') {
    return '特定地下室等'
  } else if (result === '3') {
    return '超高層建物'
  } else if (result === '4') {
    return '高層建物'
  } else if (result === '5') {
    return '特定大規模建物'
  } else if (result === '6') {
    return '特定中規模建物'
  } else if (result === '7') {
    return '特定公共用建物'
  } else if (result === '8') {
    return '工業用建物'
  } else if (result === '9') {
    return '一般業務用建物'
  } else if (result === '10') {
    return '一般集合住宅'
  } else if (result === '11') {
    return '一般住宅'
  } else {
    return ''
  }
}
