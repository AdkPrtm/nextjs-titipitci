"use client"
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { useState } from "react"
import Input from "../../../components/form/input/InputField"
import { DataTablePagination } from "../../../components/dashboard/TablePagination"
import { useResiHook } from "@/hooks/useResiHook"
import { columnsResi } from "@/constant/column-resi"
import SkeletonTable from "../../../components/ui/table/skeleton"
import { TableContent } from "../../../components/ui/table/Table"
import Link from "next/link"
import Button from "@/components/ui/button/Button"

interface DataTableProps<TData, TValue> {
    // columns: ColumnDef<TData, TValue>[]
    // data: TData[]
    // pageSize?: number
}
export function ListResi<TData, TValue>({
    // columns,
    // data,
    // pageSize = 10,
}: DataTableProps<TData, TValue>) {

    const [cursor, setCursor] = useState<number | null>(null);
    const [limit, setLimit] = useState<number>(10);
    const [globalFilter, setGlobalFilter] = useState("")
    const [onPageState, setPageState] = useState<number>(1)


    const { getAllResi, getFilterResi } = useResiHook({
        limit,
        cursorTo: cursor ?? 0,
        keyword: globalFilter || undefined,
        searching: Boolean(globalFilter != ''),
    });

    const { resi, next_cursor, total_pages, max_cursor, has_next_page } = globalFilter ? (getFilterResi.data ?? []) : (getAllResi.data ?? []);
    const isLoading = globalFilter ? getFilterResi.isLoading : getAllResi.isLoading;

    const onLimit = (limit: number) => setLimit(limit)

    const onInit = () => {
        setPageState(1)
        setCursor(0)
    }
    const onPrev = () => {
        setPageState(onPageState - 1)
        setCursor(max_cursor - next_cursor > limit * 2 ? next_cursor + limit * 2 : 0)
    }
    const onNext = () => {
        setPageState(onPageState + 1)
        setCursor(next_cursor)
    }
    const onLast = () => setCursor(max_cursor - next_cursor + 1)
    const onPage = max_cursor ? Math.ceil(cursor ? (max_cursor - next_cursor) / limit : 1) : onPageState

    const table = useReactTable({
        data: resi,
        columns: columnsResi,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
            <Input
                placeholder="Search..."
                defaultValue={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="w-full max-w-sm "
                />
                <Link href="/admin/resi/add">
                    <Button size="md" variant="primary">
                        Add Resi
                    </Button>
                </Link>
            </div>
            {isLoading ?
                <SkeletonTable columns={columnsResi} rowCount={10} />
                :
                <><div className="w-full overflow-x-auto rounded-lg border">
                    <TableContent table={table} column={columnsResi} flexRender={flexRender} />
                </div>
                    <DataTablePagination
                        table={table}
                        maxPage={total_pages}
                        hasNext={has_next_page}
                        hasPrev={max_cursor - next_cursor > 10}
                        onNext={onNext}
                        onPrev={onPrev}
                        onInit={onInit}
                        onLast={onLast}
                        onPage={onPage}
                        limit={limit ?? 10}
                        setLimit={onLimit}
                    />
                </>
            }
        </div>
    )
}
