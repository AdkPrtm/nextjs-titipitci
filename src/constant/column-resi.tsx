import {
    ColumnDef,
} from "@tanstack/react-table"

import { Button } from "../components/ui/button"
import { MoreHorizontal } from "lucide-react"
import Badge from "../components/ui/badge/Badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export type ResiData = {
    nomor_resi: string
    status_cod: boolean
    posisi_paket: string
    status_paket: "DIPROSES" | "DITERIMA"
}

export const columnsResi: ColumnDef<ResiData>[] = [
    {
        accessorKey: "nomor_resi",
        header: 'Nomor Resi',
    },
    {
        accessorKey: "nama_penerima",
        header: 'Nama Penerima',
    },
    {
        accessorKey: "status_cod",
        header: 'Status COD',
        cell: ({ row }) => {
            const cod = row.getValue<boolean>("status_cod")
            return (
                <Badge variant={cod ? "solid" : "light"} color={cod ? "info" : "primary"}>
                    {cod ? "COD" : "Non-COD"}
                </Badge>
            )
        },
    },
    {
        accessorKey: "posisi_paket",
        header: 'Posisi Paket',
    },
    {
        accessorKey: "status_paket",
        header: 'Status Paket',
        cell: ({ row }) => {
            const status = row.getValue<string>("status_paket")
            return (
                <Badge variant={status === "DITERIMA" ? "solid" : "light"} color={status === "DITERIMA" ? "success" : "info"}>
                    {status}
                </Badge>
            )
        },
    },
    {
        accessorKey: "created_at",
        header: 'Dibuat pada',
        cell: ({ row }) => {
            const date = new Date(row.getValue<string>("created_at"));
            const options: Intl.DateTimeFormatOptions = {
                timeZone: 'Asia/Makassar',
                weekday: 'long',
                day: '2-digit',
                month: 'long',
                year: 'numeric',
            };
            const formatted = new Intl.DateTimeFormat('id-ID', options).format(date);
            return (
                formatted
            )
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const resiData = row.original
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
                            onClick={() => navigator.clipboard.writeText(resiData.nomor_resi)}
                        >
                            Copy Resi
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