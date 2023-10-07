import { Button, Input, Select, Table, Textarea } from "@mantine/core"
import { useState } from "react"
import { useTranslations } from "next-intl"
import { useForm } from "@mantine/form"
import { type } from "os"

type AlarmItem = {
  branchNumber: number
  mountingModel: string
  serialNumber: string
  installationCustomerNumber: string
  nameCompanyName: string
}

function TestAlarmList() {
  const form = useForm({
    initialValues: {
      alarmOperation: [
        {
          branchNumber: "",
          mountingModel: "",
          serialNumber: "",
          installationCustomerNumber: "",
          nameCompanyName: "",
        },
      ],
    },

    validate: {
      alarmOperation: {
        mountingModel: (type) => (type === null || type === "" ? "Fill " : null),
      },
    },
  })

  //   const [updateData, setUpdateData] = useState<AlarmItem[]>([])

  //   const addAlarm = (values: any) => {
  //     const newAlarm: AlarmItem = {
  //       branchNumber: updateData.length + 1,
  //       mountingModel: values.model,
  //       serialNumber: "", // Replace with appropriate value
  //       installationCustomerNumber: "", // Replace with appropriate value
  //       nameCompanyName: "", // Replace with appropriate value
  //     }

  //     setUpdateData([...updateData, newAlarm])
  //     form.reset()
  //   }

  const t = useTranslations("OperationForm")

  const rows = form.values.alarmOperation.map((item) => (
    <tr key={item.branchNumber}>
      <td>{item.branchNumber}</td>
      <td>{item.mountingModel}</td>
      <td>{item.serialNumber}</td>
      <td>{item.installationCustomerNumber}</td>
      <td>{item.nameCompanyName}</td>
    </tr>
  ))

  return (
    <div>
      <Table striped withColumnBorders>
        <thead>
          <tr>
            <th>{t("branchNumber")}</th>
            <th>{t("mountingModel")}</th>
            <th>{t("serialNumber")}</th>
            <th>{t("installationCustomerNumber")}</th>
            <th>{t("nameCompanyName")}</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      <form
      // onReset={form.onReset}
      // onSubmit={form.onSubmit(alarmOperation)}
      >
        <div className="grid grid-cols-4 gap-3">
          <div className="col-span-2">
            <Select
              label={t("mountingModel")}
              data={[
                { value: "Model1", label: "Model1" },
                { value: "Model2", label: "Model2" },
                { value: "Model3", label: "Model3" },
                { value: "Model4", label: "Model4" },
              ]}
              //   {...form.getInputProps(`alarmOperation.mountingModel`)}
            ></Select>
          </div>
          <div className="col-span-1">
            <Input.Wrapper
              //  id={id}
              label={t("quantity")}
              {...form.getInputProps("quantity")}
            >
              <Input placeholder={t("quantity")} />{" "}
            </Input.Wrapper>
          </div>
          <div className="flex items-end">
            <Button
              onClick={() =>
                form.insertListItem("alarmOperation", {
                  branchNumber: "",
                  mountingModel: "",
                  serialNumber: "",
                  installationCustomerNumber: "",
                  nameCompanyName: "",
                })
              }
            >
              Button
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default TestAlarmList

function randomId(): any {
  throw new Error("Function not implemented.")
}
// import { useForm } from "@mantine/form"
// import {
//   TextInput,
//   Switch,
//   Group,
//   ActionIcon,
//   Box,
//   Text,
//   Button,
//   Code,
// } from "@mantine/core"
// import { randomId } from "@mantine/hooks"

// function TestAlarmlist() {
//   const form = useForm({
//     initialValues: {
//       employees: [{ name: "", active: false, key: randomId() }],
//     },
//   })

//   const fields = form.values.employees.map((item, index) => (
//     <Group key={item.key} mt="xs">
//       <TextInput
//         placeholder="John Doe"
//         withAsterisk
//         sx={{ flex: 1 }}
//         {...form.getInputProps(`employees.${index}.name`)}
//       />
//       <Switch
//         label="Active"
//         {...form.getInputProps(`employees.${index}.active`, { type: "checkbox" })}
//       />
//       <ActionIcon color="red" onClick={() => form.removeListItem("employees", index)}>
//         <Button size="1rem" />
//       </ActionIcon>
//     </Group>
//   ))

//   return (
//     <Box maw={500} mx="auto">
//       {fields.length > 0 ? (
//         <Group mb="xs">
//           <Text weight={500} size="sm" sx={{ flex: 1 }}>
//             Name
//           </Text>
//           <Text weight={500} size="sm" pr={90}>
//             Status
//           </Text>
//         </Group>
//       ) : (
//         <Text color="dimmed" align="center">
//           No one here...
//         </Text>
//       )}

//       {fields}

//       <Group position="center" mt="md">
//         <Button
//           onClick={() =>
//             form.insertListItem("employees", { name: "", active: false, key: randomId() })
//           }
//         >
//           Add employee
//         </Button>
//       </Group>

//       <Text size="sm" weight={500} mt="md">
//         Form values:
//       </Text>
//       <Code block>{JSON.stringify(form.values, null, 2)}</Code>
//     </Box>
//   )
// }

// export default TestAlarmlist
