export const DataChip = ({ header, value }: { header?: string, value: string }) => {
  return (
    <div className="chip">
      { header && <div className="chip__header">{header}</div> }
      <div className="chip__value">{value}</div>
    </div>
  )
}
