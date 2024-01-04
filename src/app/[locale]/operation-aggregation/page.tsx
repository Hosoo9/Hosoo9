"use client"

import { Button, Table, Title } from "@mantine/core"
import { DatePickerInput } from "@mantine/dates"
import { useTranslations } from "next-intl"

export default function OperationAggregationPage({}: {}) {
  const t = useTranslations("OperationForm")

  return (
    <div>
      <Title className="my-5" size="h2">作業集計</Title>

      <div className="mb-5 flex gap-3">
        <DatePickerInput className="w-32" />
        <Button>{ t("search") }</Button>
      </div>

      <div className="flex gap-5">
        <div className="flex-grow">
          <Table highlightOnHover withTableBorder={true}>
            <Table.Thead>
              <Table.Tr>
                <Table.Th colSpan={4}>区 分</Table.Th>
                <Table.Th>件数</Table.Th>
                <Table.Th>単価</Table.Th>
                <Table.Th>金額</Table.Th>
                <Table.Th>委</Table.Th>
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              <Table.Tr>
                <Table.Td>普通</Table.Td>
                <Table.Td>同型</Table.Td>
                <Table.Td>昼間</Table.Td>
                <Table.Td>7号以下</Table.Td>
                <Table.Td>0</Table.Td>
                <Table.Td>2,640</Table.Td>
                <Table.Td>0</Table.Td>
                <Table.Td>1</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>普通</Table.Td>
                <Table.Td>同型</Table.Td>
                <Table.Td>昼間</Table.Td>
                <Table.Td>10号</Table.Td>
                <Table.Td>0</Table.Td>
                <Table.Td>3,300</Table.Td>
                <Table.Td>0</Table.Td>
                <Table.Td>2</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>普通</Table.Td>
                <Table.Td>同型</Table.Td>
                <Table.Td>昼間</Table.Td>
                <Table.Td>15-16号</Table.Td>
                <Table.Td>0</Table.Td>
                <Table.Td>3,300</Table.Td>
                <Table.Td>0</Table.Td>
                <Table.Td>3</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>普通</Table.Td>
                <Table.Td>同型</Table.Td>
                <Table.Td>昼間</Table.Td>
                <Table.Td>25-30号</Table.Td>
                <Table.Td>0</Table.Td>
                <Table.Td>9,970</Table.Td>
                <Table.Td>0</Table.Td>
                <Table.Td>4</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>普通</Table.Td>
                <Table.Td>同型</Table.Td>
                <Table.Td>昼間</Table.Td>
                <Table.Td>40-50号</Table.Td>
                <Table.Td>0</Table.Td>
                <Table.Td>17,480</Table.Td>
                <Table.Td>0</Table.Td>
                <Table.Td>5</Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
        </div>
        <div className="flex flex-col gap-3">
          <Table highlightOnHover withTableBorder={true}>
            <Table.Thead>
              <Table.Tr>
                <Table.Th colSpan={2}>都市ガス</Table.Th>
                <Table.Th>SGS</Table.Th>
                <Table.Th>集</Table.Th>
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              <Table.Tr>
                <Table.Td rowSpan={3}>普通</Table.Td>
                <Table.Td>同型</Table.Td>
                <Table.Td>1</Table.Td>
                <Table.Td>1</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>異型</Table.Td>
                <Table.Td>0</Table.Td>
                <Table.Td>2</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>小計</Table.Td>
                <Table.Td>1</Table.Td>
                <Table.Td></Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td rowSpan={7}>マイコン</Table.Td>
                <Table.Td>新設同型</Table.Td>
                <Table.Td>4</Table.Td>
                <Table.Td>3</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>新設異型</Table.Td>
                <Table.Td>0</Table.Td>
                <Table.Td>4</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>既設同型</Table.Td>
                <Table.Td>1262</Table.Td>
                <Table.Td>5</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>既設異型</Table.Td>
                <Table.Td>1</Table.Td>
                <Table.Td>6</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>小計</Table.Td>
                <Table.Td>1263</Table.Td>
                <Table.Td></Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>マイコン計</Table.Td>
                <Table.Td>1267</Table.Td>
                <Table.Td></Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
          <Table highlightOnHover withTableBorder={true}>
            <Table.Thead>
              <Table.Tr>
                <Table.Th colSpan={2}>プロパン</Table.Th>
                <Table.Th></Table.Th>
                <Table.Th>集</Table.Th>
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              <Table.Tr>
                <Table.Td rowSpan={3}>普通</Table.Td>
                <Table.Td>同型</Table.Td>
                <Table.Td>0</Table.Td>
                <Table.Td>1</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>異型</Table.Td>
                <Table.Td>0</Table.Td>
                <Table.Td>2</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>小計</Table.Td>
                <Table.Td>0</Table.Td>
                <Table.Td></Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td rowSpan={7}>マイコン</Table.Td>
                <Table.Td>新設同型</Table.Td>
                <Table.Td>3</Table.Td>
                <Table.Td>0</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>新設異型</Table.Td>
                <Table.Td>0</Table.Td>
                <Table.Td>4</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>既設同型</Table.Td>
                <Table.Td>0</Table.Td>
                <Table.Td>5</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>既設異型</Table.Td>
                <Table.Td>0</Table.Td>
                <Table.Td>6</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>小計</Table.Td>
                <Table.Td>0</Table.Td>
                <Table.Td></Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>マイコン計</Table.Td>
                <Table.Td>0</Table.Td>
                <Table.Td></Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
        </div>
      </div>
    </div>
  )
}
