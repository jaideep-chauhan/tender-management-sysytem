"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./table/data-table";

interface Tender {
  tenderId: number;
  description: string;
  name: string;
  startTime: string;
  endTime: string;
  bufferTime: number;
  lowestBid: number;
}

interface TendersTableProps {
  tenders: Tender[];
}

export default function TendersTable({ tenders }: TendersTableProps) {
  if (tenders.length === 0) return <p>No tenders available</p>;

  return (
    <DataTable
      columns={tendersColumns}
      data={tenders}
      placeholder="Search Tenders ..."
    />
  );
}

// Date formatter function
const formatDateTime = (dateTime: string) => {
  return new Date(dateTime).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

const tendersColumns: ColumnDef<Tender>[] = [
  {
    accessorKey: "tenderId",
    header: "Tender ID",
    size: 100,
  },
  {
    accessorKey: "name",
    header: "Name",
    size: 120,
  },
  {
    accessorKey: "description",
    header: "Description",
    size: 80,
  },
  {
    accessorKey: "startTime",
    header: "Start Time",
    cell: ({ row }) => <p>{formatDateTime(row.original.startTime)}</p>,
    size: 120,
  },
  {
    accessorKey: "endTime",
    header: "End Time",
    cell: ({ row }) => <p>{formatDateTime(row.original.endTime)}</p>,
    size: 120,
  },
  {
    accessorKey: "bufferTime",
    header: "Buffer Time",
    size: 40,
  },
  {
    accessorKey: "lowestBid",
    header: "Lowest Bid",
    cell: ({ row }) => (
      <p>{row.original.lowestBid ? row.original.lowestBid : "Null"}</p>
    ),
    size: 40,
  },
];
