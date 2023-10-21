"use client"

/* Todo list/Memo 
1. Email zasna
2. Select button uudiin data oruulna
3. Cash - Payment method Lease- Signature
4. 
*/

import "dayjs/locale/ja"

import { Box, Button, Grid, LoadingOverlay, Table } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"

function OperationList() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["operations"],
    queryFn: () => fetch("/api/operation").then((res) => res.json()),
  })

  // const { data } = useQuery({
  //   queryKey: ["operations"],
  //   console.log(data);
  //   queryFn: () => get("/api/operation").then((res) => res.json()),
  // })

  // if (error) return "An error has occurred: " + error.message

  const rows = (data || []).map((o: any) => (
    <Table.Tr key={o.code} className="w-100">
      <Table.Td>
        <Link href={`/operation/${o.code}`}>{o.code}</Link>
      </Table.Td>
      <Table.Td>{o.name}</Table.Td>
      <Table.Td>{o.status}</Table.Td>
    </Table.Tr>
  ))

  return (
    <Grid>
      <Grid.Col span={12}>
        <h2>Operation list</h2>
        <Button component={Link} href="/operation/new">
          New
        </Button>

        <Box pos="relative">
          <LoadingOverlay
            visible={isLoading}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
          />
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Code</Table.Th>
                <Table.Th>Name</Table.Th>
                <Table.Th>Status</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <tbody>{rows}</tbody>
          </Table>
        </Box>
      </Grid.Col>
    </Grid>
  )
}

export default OperationList

//To do comment
