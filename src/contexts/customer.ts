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
  "東京都渋谷区桜町1-2-3, 150-0001",
  "大阪府中央区富士通り4-5-6, 550-0012",
  "北海道札幌市朝日巷7-8-9, 060-0003",
  "神奈川県横浜市中区梅の広場10-11-12, 220-0022",
  "京都府京都市花通り13-14-15, 600-0004",
  "福岡県福岡市山区菊の丘16-17-18, 810-0006",
  "愛知県名古屋市月が導く道19-20-21, 460-0011",
  "兵庫県神戸市山の高み22-23-24, 650-0002",
  "広島県広島市水の小路25-26-27, 730-0035",
  "宮城県仙台市土のアベニュー28-29-30, 980-0000",
]

const generateCustomer = (searchInput: SearchCustomerInput) => {
  return {
    customerNumber:
      searchInput.customerNumber ?? randNumber({ min: 1000000, max: 9999999 }).toString(),
    housingType: randNumber({ min: 1, max: 2 }),
    postalCode: randNumber({ min: 1000000, max: 9999999 }).toString(),
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
