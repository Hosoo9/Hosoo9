import {
  randEmail,
  randFutureDate,
  randHexaDecimal,
  randNumber,
  randPhoneNumber,
} from "@ngneat/falso"
import dayjs from "dayjs"

type SearchCustomerInput = {
  customerNumber?: string | null
  meterNumber?: string | null
  phoneNumber?: string | null
  code?: string | null
}

export const searchCustomer = async (searchInput: SearchCustomerInput) => {
  if (searchInput.customerNumber) {
    return [generateCustomer(searchInput)]
  }

  return [generateCustomer(searchInput), generateCustomer(searchInput)]
}

const names = [
  "田中春樹",
  "中村彩",
  "佐藤雄斗",
  "山本さくら",
  "高橋浩",
  "鈴木恵美",
  "森健太",
  "西村優希",
  "小林里奈",
  "井上大地",
]

const municipalities = [
  "東京",
  "京都市",
  "大阪市",
  "札幌市",
  "名古屋市",
  "横浜市",
  "福岡市",
  "仙台市",
  "神戸市",
  "広島市",
]

const buildingNameRoomNumbers = [
  "さくらタワー (部屋301)",
  "ハーモニープラザ (スイート512A)",
  "エメラルドハイツ (部屋207)",
  "セレスティアルガーデン (アパートメント404)",
  "ホライズンセンター (オフィス1203)",
  "フェニックスレジデンス (スイート601)",
  "ルナアパートメンツ (ユニット303)",
  "ギャラクシータワー (部屋1502)",
  "セレニティスイーツ (スイート808)",
  "クオンタムクォーターズ (ラボラトリー12B",
]

const addresses = [
  "桜町1-2-3",
  "富士通り4-5-6",
  "朝日巷7-8-9",
  "梅の広場10-11-12",
  "花通り13-14-15",
  "山区菊の丘16-17-18",
  "月が導く道19-20-21",
  "山の高み22-23-24",
  "水の小路25-26-27",
  "土のアベニュー28-29-30",
]

const generateCustomer = (searchInput: SearchCustomerInput) => {
  return {
    customerNumber:
      searchInput.customerNumber ?? randNumber({ min: 1000000, max: 9999999 }).toString(),
    housingType: randNumber({ min: 1, max: 2 }),
    postalCode: `${randNumber({ min: 100, max: 999 }).toString()}-${randNumber({
      min: 1000,
      max: 9999,
    }).toString()}`,
    municipality: municipalities[randNumber({ min: 0, max: 9 })],
    address: addresses[randNumber({ min: 0, max: 9 })],
    buildingNameRoomNumber: buildingNameRoomNumbers[randNumber({ min: 0, max: 9 })],
    name: names[randNumber({ min: 0, max: 9 })],
    nameKana: null,
    phoneNumber: searchInput.phoneNumber ?? randPhoneNumber(),
    phoneNumberType: randNumber({ min: 1, max: 3 }),
    mailAddress: randEmail(),
    meterNo:
      searchInput.meterNumber ?? randNumber({ min: 1000000, max: 9999999 }).toString(),
    patNo: `${randHexaDecimal()}${randHexaDecimal()}`.toUpperCase(),
    meterNumber: `${randNumber({ min: 10, max: 99 })}.0`,
    meterYmd: dayjs(randFutureDate()).format("YYYY/MM"),
    pastMeterSu1: randNumber({ min: 10, max: 999 }),
    pastMeterSu2: randNumber({ min: 10, max: 999 }),
    pastMeterSu3: randNumber({ min: 10, max: 999 }),
    pastMeterSu4: randNumber({ min: 10, max: 999 }),
  }
}
