// import { Column } from "@tanstack/react-table"
// import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react"

// import { cn } from "@/lib/utils"



// interface DataTableColumnHeaderProps<TData, TValue>
//     extends React.HTMLAttributes<HTMLDivElement> {
//     column: Column<TData, TValue>
//     title: string
// }

// export function DataTableColumnHeader<TData, TValue>({
//     column,
//     title,
//     className,
// }: Readonly<DataTableColumnHeaderProps<TData, TValue>>) {
//     if (!column.getCanSort()) {
//         return <div className={cn(className)}>{title}</div>
//     }

//     return (
//         <div className="flex items-center cursor-pointer" onClick={() => column.toggleSorting()}>
//             {title}
//             {column.getIsSorted() === 'asc' ? (
//                 <ChevronUp className="ml-2 h-4 w-4" />
//             ) : column.getIsSorted() === 'desc' ? (
//                 <ChevronDown className="ml-2 h-4 w-4" />
//             ) : (
//                 <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
//             )}
//         </div>
//     )
// }
