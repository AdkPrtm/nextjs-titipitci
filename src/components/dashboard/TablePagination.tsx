import { Table } from "@tanstack/react-table"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Button } from "../ui/button"

interface DataTablePaginationProps<TData> {
  table: Table<TData>
  maxPage: number
  onPage: number
  onInit: () => void
  onPrev: () => void
  onNext: () => void
  onLast: () => void
  hasPrev: boolean
  hasNext: boolean
  limit: number
  setLimit: (limit: number) => void
}

export function DataTablePagination<TData>({
  table,
  maxPage,
  onPage,
  onInit,
  onPrev,
  onNext,
  onLast,
  hasPrev,
  hasNext,
  limit,
  setLimit
}: Readonly<DataTablePaginationProps<TData>>) {

  return (
    // <div className="flex items-end justify-end px-2">
      <div className="flex justify-end space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${limit}`}
            onValueChange={(value) => {
              setLimit(Number(value))
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={limit} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[110px] items-center justify-center text-sm font-medium truncate">
          Page {onPage} of{" "}
          {maxPage}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => onInit()}
            disabled={!hasPrev}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => onPrev()}
            disabled={!hasPrev}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => onNext()}
            disabled={!hasNext}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => onLast()}
            disabled={!hasNext}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    // </div>
  )
}
