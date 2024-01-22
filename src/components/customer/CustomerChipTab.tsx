import dayjs from "dayjs"
import { DataChip } from "./DataChip"
import DataChipGroupTitle from "./DataChipGroupTitle"
import { formatDay } from "@/utils/date-helper"

export default function CustomerChipTab({ customer }: { customer: any }) {
  return (
    <>
      <div className="grid grid-cols-2">
        <div>
          <div className="chip-wrapper">
            <DataChipGroupTitle title="顧客情報" />
            <DataChip header="メーター番号" value={customer.meterNo} />
            <DataChip header="型" value={customer.patNo} />
            <DataChip header="号数" value={customer.meterNumber} />
            <DataChip header="検定" value={formatDay(customer.meterYmd)} />
            <DataChip header="メーカー" value={customer.makerCd} />
          </div>

          <div className="chip-wrapper">
            <DataChipGroupTitle title="管理情報" />
            <DataChip
              header={"用途"}
              value={`${customer.gyoshuCd}-${customer.kenKbn}`}
            />
          </div>

          <div className="chip-wrapper">
            <DataChipGroupTitle title="復旧ブロック番号" />
            <DataChip value={customer.supplyNo}
            />
            <DataChip
              header={"災害対応ブロック復旧フラグ"}
              value={customer.disaReblkCd}
            />
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
          <div className="chip-wrapper">
            <DataChipGroupTitle title="供給履歴" />
            <DataChip
              header={dayjs().subtract(1, "month").format("YYYY/MM")}
              value={customer.pastSupKei1}
            />
            <DataChip
              header={dayjs().subtract(2, "month").format("YYYY/MM")}
              value={customer.pastSupKei2}
            />
            <DataChip
              header={dayjs().subtract(3, "month").format("YYYY/MM")}
              value={customer.pastSupKei3}
            />
            <DataChip
              header={dayjs().subtract(4, "month").format("YYYY/MM")}
              value={customer.pastSupKei4}
            />

          </div>
        </div>
        <div>
          <div className="chip-wrapper">
            <DataChipGroupTitle title="検針情報" />

            <DataChip
              header={"区"}
              value={customer.kaiSu}
            />
            <DataChip
              header={"階"}
              value={customer.noteCd}
            />
            <DataChip
              header={"位置"}
              value={customer.keyNo}
            />
            <DataChip
              header={"鍵"}
              value={customer.posCd}
            />
            <DataChip
              header={"使用量"}
              value={customer.usedSu}
            />
          </div>
          <div className="chip-wrapper">
            <DataChipGroupTitle title="指針情報" />

            <DataChip
              header={"検読日"}
              value={formatDay(customer.meterReadYmd)}
            />
            <DataChip
              header={"検読区分"}
              value={customer.meterReadKbn}
            />
          </div>
        </div>
      </div>
    </>
  )
}
