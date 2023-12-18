export default function DataChipGroupTitle({ title }: { title: string }) {
  return (
    <div className="chip-wrapper__title">
      <div className="chip__header">{ title }</div>
    </div>
  )
}
