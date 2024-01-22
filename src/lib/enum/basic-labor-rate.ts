// operation_type

import { buildForSelect, buildGetterForType } from "./helper"

// "交換
// 取外
// 入室不用工法
// 保安閉栓
// 閉栓返却"

const operationType = {
  1: '交換',
  2: '取外',
  3: '入室不用工法',
  4: '保安閉栓',
  5: '閉栓返却',
}

// meter_type
// "普通
// マイコン"

const meterType = {
  1: '普通',
  2: 'マイコン',
}

// exchange_type
// "同型
// 異型"

const exchangeType = {
  1: '同型',
  2: '異型',
}

// working_time
// "昼間
// 夜間・休日"

const workingTime = {
  1: '昼間',
  2: '夜間・休日',
}


// meter_size_type
//"7号以下
// 10号
// 15-16号
// 25-30号
// 40-50号
// 65-90号
// 100-120号
// R100-200
// R250-"

const meterSizeType = {
  1: '7号以下',
  2: '10号',
  3: '15-16号',
  4: '25-30号',
  5: '40-50号',
  6: '65-90号',
  7: '100-120号',
  8: 'R100-200',
  9: 'R250-',
}

// district_type
// "A地区(SGE)
// B地区(SGS)"

const districtType = {
  1: 'A地区(SGE)',
  2: 'B地区(SGS)',
}

export const getBlrOperationType = buildGetterForType(operationType)
export const getBlrMeterType = buildGetterForType(meterType)
export const getBlrExchangeType = buildGetterForType(exchangeType)
export const getBlrWorkingTime = buildGetterForType(workingTime)
export const getBlrMeterSizeType = buildGetterForType(meterSizeType)
export const getBlrDistrictType = buildGetterForType(districtType)
export const getBlrOperationTypeFS = buildForSelect(operationType)
export const getBlrMeterTypeFS = buildForSelect(meterType)
export const getBlrExchangeTypeFS = buildForSelect(exchangeType)
export const getBlrWorkingTimeFS = buildForSelect(workingTime)
export const getBlrMeterSizeTypeFS = buildForSelect(meterSizeType)
export const getBlrDistrictTypeFS = buildForSelect(districtType)
