"use client"

import "dayjs/locale/ja"

import { Button, Table } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { useEffect } from "react"
import { useLoadingContext } from "@/utils/loadingProvider"
import { LoaderComponent } from "../Provider"

const CompanyList = () => {
  const { setLoading } = useLoadingContext()

  const { isLoading, error, data } = useQuery({
    queryKey: ["company"],
    queryFn: () => fetch("/api/admin/company").then((res) => res.json()),
  })

  console.log("company data : ", data)

  if (isLoading) return <LoaderComponent />

  // WTF : TODO
  // useEffect(() => {
  //   setLoading(isLoading)
  // }, [isLoading])

  const getCompanyList = () => {
    return [data]?.map((element: any, index: number) => (
      <tr key={index}>
        <td>
          <Link href={`/en/admin/company/${element?.code}`}>{element?.code}</Link>
        </td>
        <td>{element?.name}</td>
      </tr>
    ))
  }

  return (
    <div className="container mx-auto">
      <h2>Company List</h2>
      <Button component="a" href="/en/company/new">
        New
      </Button>

      <Table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>{getCompanyList()}</tbody>
      </Table>
    </div>
  )
}

export default CompanyList

//To do comment
