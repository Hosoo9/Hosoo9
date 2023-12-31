export const DataChip = ({ header, value }: { header?: string | null, value: string | null }) => {
  return (
    <div className="chip">
      <div className="chip__header">{header}</div>
      <div className="chip__value">{value}</div>
    </div>
  )
}
