"use client"

// import OperationForm from "../components/operation/OperationForm"
import OperationList from "../../../components/operation/OperationList"

export default function Dashboard() {
  return (
    <main>
      <OperationList className="py-5" count={0} />
      {/* <OperationList/> */}
      {/* <OperationForm /> */}
    </main>
  )
}
