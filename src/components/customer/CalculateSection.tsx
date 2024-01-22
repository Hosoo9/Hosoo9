import { NumberInput, Table } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"
import Big from "big.js"

const caloreiToKiloWatt = (calorei: number) => {
  return calorei / 860
}

const formatNumber = (num: number) => {
  return Big(num).round(2).toString()
}

export default function CalculateSection({ customerNumber }: { customerNumber: string }) {
  const [aValue, setAValue] = useState(0)

  const { isLoading, error, data, refetch } = useQuery<{ total: number; data: any[] }>({
    queryKey: ["equipment", customerNumber],
    queryFn: async () => {
      const response = await fetch(
        `/api/customer-search/equipment?customerNumber=${customerNumber}`,
      )
      return response.json()
    },
  })

  const { isLoading: isSizeLoading, data: sizeData } = useQuery<number[]>({
    queryKey: ["meter_sizes_calc"],
    queryFn: async () => {
      const response = await fetch(`/api/meter_size`)

      const data = await response.json()

      return [
        0,
        ...data
          .map((item: any) => parseFloat(item.size))
          .sort((a: number, b: number) => a - b),
      ]
    },
  })

  const t = useTranslations("OperationForm")

  const columns = [
    { accessor: "machinNo", title: "機器番号" },
    { accessor: "modelCd", title: "機種ｺｰﾄﾞ" },
    { accessor: "makerCd", title: "ﾒｰｶｰ" },
    { accessor: "modelNm", title: "器具名(型式)" },
    { accessor: "seizouYm", title: "製造年月" },
    { accessor: "caloreiSu", title: "消費ｷﾛｶﾛﾘｰ" },
  ]

  const mappedData = (data?.data || []).map((item) => ({
    machinNo: item.machinNo,
    modelCd: item.modelCd,
    makerCd: item.makerCd,
    modelNm: item.modelNm,
    seizouYm: item.seizouYm,
    kiloWatt: caloreiToKiloWatt(item.caloreiSu),
  }))

  const totalCal = mappedData.reduce((acc, item) => acc + item.kiloWatt, 0)

  const findRange = (num: number) => {
    if (sizeData === undefined) {
      return ""
    }

    const bigNum = Big(num)

    if (bigNum.lt(sizeData[0])) {
      return ""
    }

    for (let i = 0; i < sizeData.length - 1; i++) {
      const upperBound = Big(sizeData[i + 1])

      if (bigNum.lte(upperBound)) {
        return upperBound.toString()
      }
    }

    return ""
  }

  useEffect(() => {
    setAValue(parseFloat(formatNumber(totalCal)))
  }, [totalCal])

  return (
    <div className="pt-5">
      <Table highlightOnHover withRowBorders={true}>
        <Table.Thead>
          <Table.Tr>
            {columns.map((column) => (
              <Table.Th key={column.accessor}>{column.title}</Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {mappedData.map((item) => (
            <Table.Tr key={item.machinNo}>
              <Table.Td>{item.machinNo}</Table.Td>
              <Table.Td>{item.modelCd}</Table.Td>
              <Table.Td>{item.makerCd}</Table.Td>
              <Table.Td>{item.modelNm}</Table.Td>
              <Table.Td>{item.seizouYm}</Table.Td>
              <Table.Td>{item.kiloWatt}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
        <Table.Tfoot>
          <Table.Tr>
            <Table.Td colSpan={5}></Table.Td>
            <Table.Td colSpan={1}>{formatNumber(totalCal)}</Table.Td>
          </Table.Tr>
        </Table.Tfoot>
      </Table>

      <Table highlightOnHover withRowBorders={true}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>合計消費量(kW)</Table.Th>
            <Table.Th>A</Table.Th>
            <Table.Th>
              <NumberInput value={aValue} onChange={(e) => setAValue(e as number)} />
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr>
            <Table.Th>同時使用率（70％）</Table.Th>
            <Table.Th>B</Table.Th>
            <Table.Th>{formatNumber(aValue * 0.7)}</Table.Th>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>換算B×0.08</Table.Td>
            <Table.Td>C</Table.Td>
            <Table.Td>{formatNumber(aValue * 0.7 * 0.08)}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>メーター号数(号)</Table.Td>
            <Table.Td></Table.Td>
            <Table.Td>{findRange(aValue * 0.7 * 0.08)}</Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </div>
  )
}
