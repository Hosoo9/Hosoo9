declare const phoneNominality: unique symbol
type PhoneNumber = string & { [phoneNominality]: never }

const callPhone = (phoneNumber: PhoneNumber): void => {
  console.log("%oに電話をかけてます……", phoneNumber)
}

const isPhoneNumber = (value: string): value is PhoneNumber => {
  return /^[0-9]+-[0-9]+-[0-9]+$/.test(value)
}

const wouldBePhoneNumber: string = "090-9999-0000"

if (isPhoneNumber(wouldBePhoneNumber)) {
  callPhone(wouldBePhoneNumber) // OK
} else {
  console.log("%oは電話番号ではありません", wouldBePhoneNumber)
}
