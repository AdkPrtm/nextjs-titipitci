"use client"

import { DataTablePagination } from "@/components/dashboard/TablePagination";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";
import SkeletonTable from "@/components/ui/table/skeleton";
import { TableContent } from "@/components/ui/table/Table";
import { columnsUser } from "@/constant/column-user";
import { useUserHook } from "@/hooks/useUserHook";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useState } from "react";


export function ListUser() {
    const [cursor, setCursor] = useState<number | null>(null);
    const [limit, setLimit] = useState<number>(10);
    const [globalFilter, setGlobalFilter] = useState("")
    const [onPageState, setOnPageState] = useState<number>(1)

    const { getAllUser, getFilterUser } = useUserHook({
        limit: 10,
        cursorTo: cursor ?? 0,
        keyword: globalFilter || undefined,
        searching: Boolean(globalFilter != ''),
    })

    const { user, next_cursor, total_pages, max_cursor, has_next_page } = globalFilter ? (getFilterUser.data ?? []) : (getAllUser.data ?? []);
    const isLoading = globalFilter ? getFilterUser.isLoading : getAllUser.isLoading;

    const onLimit = (limit: number) => setLimit(limit)

    const onInit = () => {
        setOnPageState(1)
        setCursor(0)
    }
    const onPrev = () => {
        setOnPageState(onPageState - 1)
        setCursor(max_cursor - next_cursor > limit * 2 ? next_cursor + limit * 2 : 0)
    }
    const onNext = () => {
        setOnPageState(onPageState + 1)
        setCursor(next_cursor)
    }
    const onLast = () => setCursor(max_cursor - next_cursor + 1)
    const onPage = max_cursor ? Math.ceil(cursor ? (max_cursor - next_cursor) / limit : 1) : onPageState

    const table = useReactTable({
        data: user,
        columns: columnsUser,
        getCoreRowModel: getCoreRowModel(),
    })

    console.log(user)

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
                <Input
                    placeholder="Search..."
                    defaultValue={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    className="w-full max-w-sm "
                />
                <Button 
                size="md" 
                variant="primary"
                
                >
                    Add User
                </Button>
            </div>
            {isLoading ?
                <SkeletonTable columns={columnsUser} rowCount={10} />
                :
                <><div className="w-full overflow-x-auto rounded-lg border">
                    <TableContent table={table} column={columnsUser} flexRender={flexRender} />
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