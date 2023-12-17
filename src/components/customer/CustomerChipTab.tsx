import dayjs from "dayjs"
import { DataChip } from "./DataChip"
import DataChipGroupTitle from "./DataChipGroupTitle"

export default function CustomerChipTab({ customer }: { customer: any }) {
  return (
    <>
      <div className="chip-wrapper">
        <DataChipGroupTitle title="顧客情報" />
        <DataChip header="メーター番号" value={customer.meterNo} />
        <DataChip header="型" value={customer.patNo} />
        <DataChip header="号数" value={customer.meterNumber} />
        <DataChip header="検定" value={customer.meterYmd} />
      </div>

      <div className="chip-wrapper">
        <DataChipGroupTitle title="使用量履歴" />
        <DataChip
          header={dayjs().subtract(1, "month").format("YYYY/MM")}
          value={customer.pastMeterSu1}
        />
        <DataChip
          header={dayjs().subtract(2, "month").format("YYYY/MM")}
          value={customer.pastMeterSu2}
        />
        <DataChip
          header={dayjs().subtract(3, "month").format("YYYY/MM")}
          value={customer.pastMeterSu3}
        />
        <DataChip
          header={dayjs().subtract(4, "month").format("YYYY/MM")}
          value={customer.pastMeterSu4}
        />
      </div>
    </>
  )
}
