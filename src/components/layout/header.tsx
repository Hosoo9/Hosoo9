import { Header } from "@mantine/core"
import { IconMenu2 } from '@tabler/icons-react';
import { useQuery, } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useEffect } from "react";

interface ICustomHeaderProps {
    isClosed: boolean,
    setIsClosed: Dispatch<SetStateAction<boolean>>
}

const CustomHeader = ({ isClosed, setIsClosed }: ICustomHeaderProps) => {


    const { isLoading, error, data } = useQuery({
        queryKey: ["operations"],
        queryFn: () => fetch("/api/operation").then((res) => res.json()),
    })


    if (isLoading) return <div>Loading...</div>


    return <Header height={60} p="xs">
        <IconMenu2 onClick={() => setIsClosed(!isClosed)} />
    </Header>
}

export default CustomHeader 