import {
    ColumnDef,
} from "@tanstack/react-table"

import { Button } from "../components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export type UserData = {
    name: string
    whatsapp_number: string
    address: string
    role: string
}

export const columnsUser: ColumnDef<UserData>[] = [
    {
        accessorKey: "name",
        header: 'Nama',
    },
    {
        accessorKey: "whatsapp_number",
        header: 'Nomor Whatsapp',
        // cell: ({ row }) => {
        //     const cod = row.getValue<boolean>("status_cod")
        //     return (
        //         <Badge variant={cod ? "solid" : "light"} color={cod ? "info" : "primary"}>
        //             {cod ? "COD" : "Non-COD"}
        //         </Badge>
        //     )
        // },
    },
    {
        accessorKey: "address",
        header: 'Alamat',
        // cell: ({ row }) => {
        //     const status = row.getValue<string>("status_paket")
        //     return (
        //         <Badge variant={status === "DITERIMA" ? "solid" : "light"} color={status === "DITERIMA" ? "success" : "info"}>
        //             {status}
        //         </Badge>
        //     )
        // },
    },
    {
        accessorKey: "role",
        header: 'Status',
        // cell: ({ row }) => {
        //     const date = new Date(row.getValue<string>("created_at"));
        //     const options: Intl.DateTimeFormatOptions = {
        //         timeZone: 'Asia/Makassar',
        //         weekday: 'long',
        //         day: '2-digit',
        //         month: 'long',
        //         year: 'numeric',
        //     };
        //     const formatted = new Intl.DateTimeFormat('id-ID', options).format(date);
        //     return (
        //         formatted
        //     )
        // },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const userData = row.original
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(userData.whatsapp_number)}
                        >
                            Copy Number
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]