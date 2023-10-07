// import { Button, Select, Table, TextInput } from "@mantine/core"
// import { useTranslations } from "next-intl"
// import { useState } from "react"

// type AlarmItem = {
//   branchNumber: number
//   mountingModel: string
//   serialNumber: string
//   installationCustomerNumber: string
//   nameCompanyName: string
// }

// export default function AlarmList({
//   onNewAlarm,
//   alarms,
// }: {
//   onNewAlarm: (input: AlarmItem) => any
//   alarms: AlarmItem[]
// }) {
//   const [model, setModel] = useState<string | null>("")
//   const [quantity, setQuantity] = useState("")

//   const reset = () => {
//     setModel(null)
//     setQuantity("")
//   }

//   const addAlarm = () => {
//     if (model === null || quantity === "") {
//       return
//     }

//     const newAlarm: AlarmItem = {
//       branchNumber: alarms.length + 1,
//       mountingModel: model,
//       serialNumber: "", // Replace with appropriate value
//       installationCustomerNumber: "", // Replace with appropriate value
//       nameCompanyName: "", // Replace with appropriate value
//     }

//     onNewAlarm(newAlarm)
//     reset()

//     // externalForm.insertListItem("alarmOperation", addAlarm)

//     // setUpdateData([...updateData, newAlarm])
//   }

//   const t = useTranslations("OperationForm")

//   const rows = alarms.map((item: any, index) => (
//     <tr key={index}>
//       <td>{item.contactType}</td>
//       <td>{item.liaisonWorker}</td>
//       <td>{item.dateAndTimeOfContact}</td>
//       <td>{item.detail}</td>
//     </tr>
//   ))

//   return (
//     <div>
//       <Table striped withColumnBorders>
//         <thead>
//           <tr>
//             <th>{t("contactType")}</th>
//             <th>{t("liaisonWorker")}</th>
//             <th>{t("dateAndTimeOfContact")}</th>
//             <th>{t("detail")}</th>
//           </tr>
//         </thead>
//         <tbody>{rows}</tbody>
//       </Table>

//       <div className="grid grid-cols-4 gap-3">
//         <div className="col-span-2">
//           <Select
//             label={t("model")}
//             data={[
//               { value: "Model1", label: "Model1" },
//               { value: "Model2", label: "Model2" },
//               { value: "Model3", label: "Model3" },
//               { value: "Model4", label: "Model4" },
//             ]}
//             value={model || ""}
//             onChange={setModel}
//           ></Select>
//         </div>
//         <div className="col-span-1">
//           <TextInput
//             label={t("quantity")}
//             placeholder={t("quantity")}
//             value={quantity}
//             onChange={(event) => setQuantity(event.currentTarget.value)}
//           />
//         </div>
//         <div className="flex items-end">
//           <Button onClick={addAlarm}>Button</Button>
//         </div>
//       </div>
//     </div>
//   )
// }

// // export default AlarmList
