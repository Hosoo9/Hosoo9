"use client"

/* Todo list/Memo 
1. Email zasna
2. Select button uudiin data oruulna
3. Cash - Payment method Lease- Signature
4. 
*/

import "dayjs/locale/ja"

import { Button, Table } from "@mantine/core"
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

  if (isLoading) return <div>Loading...</div>

  // if (error) return "An error has occurred: " + error.message

  const rows = data.map((o: any) => (
    <tr key={o.code}>
      <td>
        <Link href={`/en/operation/${o.code}`}>{o.code}</Link>
      </td>
      <td>{o.name}</td>
      <td>{o.status}</td>
    </tr>
  ))

  return (
    <div className="container mx-auto">
      <h2>Operation list</h2>
      <Button component="a" href="/operation/new">
        New
      </Button>

      <Table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </div>
  )
}

export default OperationList

//To do comment
