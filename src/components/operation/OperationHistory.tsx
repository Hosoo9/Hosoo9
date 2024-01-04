import OperationList from "./OperationList"

export default function OperationHistory({ customerNumber }: { customerNumber: string }) {
  return (
    <div className="mt-5">
      <OperationList customerNumber={customerNumber} count={0} />
    </div>
  )
}
