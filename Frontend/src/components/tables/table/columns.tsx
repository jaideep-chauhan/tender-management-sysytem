"use client";

import { slugify } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

export function createColumns(columnsList: string[]): ColumnDef<any, any>[] {
    const columns = columnsList.map((col) => ({
        accessorKey: slugify(col),
        header: col,
    }));

    return columns;
}