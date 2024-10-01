import { Column } from "@tanstack/react-table";
import { ArrowUpDown } from 'lucide-react';


export const createSortableHeader = (label: string, column: Column<any, unknown>) => {
    return (
        <p
            className='flex cursor-pointer w-fit'
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
            {label}
            <ArrowUpDown className="ml-2 h-4 w-4" />
        </p>
    );
};