import { Skeleton } from "@/components/ui/skeleton"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ColumnDef } from "@tanstack/react-table"

interface SkeletonTableProps {
    columns: ColumnDef<any, any>[]
    rowCount?: number
}

export default function SkeletonTable({ columns, rowCount = 10 }: Readonly<SkeletonTableProps>) {
    const headers = columns.map((col) =>
        typeof col.header === "string" ? col.header : "—"
    )

    return (
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
            <Table>
                <TableHeader>
                    <TableRow>
                        {headers.map((label, idx) => (
                            <TableHead key={idx} className="cursor-pointer">{label}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.from({ length: rowCount }).map((_, rowIdx) => (
                        <TableRow key={rowIdx}>
                            {columns.map((_, colIdx) => (
                                <TableCell key={colIdx}>
                                    <Skeleton className="h-8 w-full max-w-[160px]" />
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
