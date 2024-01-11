// "時間請求
// 結線
// 無線化

import { buildForSelect, buildGetterForType } from "./helper"

// 支持"
const operationType = {
  1: '時間請求',
  2: '結線',
  3: '無線化',
  4: '支持',
}

// "昼間
// 平日・夜間
// 平日・深夜
// 休日・休日夜間
// 休日・深夜"
const working_time = {
  1: '昼間',
  2: '平日・夜間',
  3: '平日・深夜',
  4: '休日・休日夜間',
  5: '休日・深夜',
}

// "技術員B
// 技術員C"
const workerType = {
  1: '技術員B',
  2: '技術員C',
}

// "A地区(SGE)
// B地区(SGS)"
const districtType = {
  1: 'A地区(SGE)',
  2: 'B地区(SGS)',
}

export const getAlrOperationType = buildGetterForType(operationType)
export const getAlrWorkingTime = buildGetterForType(working_time)
export const getAlrWorkerType = buildGetterForType(workerType)
export const getAlrDistrictType = buildGetterForType(districtType)
export const getAlrOperationTypeFS = buildForSelect(operationType)
export const getAlrWorkingTimeFS = buildForSelect(working_time)
export const getAlrWorkerTypeFS = buildForSelect(workerType)
export const getAlrDistrictTypeFS = buildForSelect(districtType)
