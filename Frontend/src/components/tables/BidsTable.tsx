"use client";

import React, { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./table/data-table";
import { createSortableHeader } from "@/lib/dataTableUtils";

// Bid interface
interface Bid {
  companyName: string;
  bidCost: number;
  bidTime: string;
  last5MinuteFlag: boolean;
  tenderId: number,
}

export default function BidsTable() {
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch bids from backend API
  useEffect(() => {
    async function fetchBids() {
      try {
        const response = await fetch("http://localhost:5000/api/bids"); 
        if (!response.ok) {
          throw new Error("Failed to fetch bids");
        }
        const data = await response.json();
        setBids(data?.data); 
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    }

    fetchBids();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <DataTable
      columns={bidsColumns}
      data={bids}
      placeholder="Search Bids ..."
    />
  );
}

// Column definitions for bids
const bidsColumns: ColumnDef<Bid>[] = [
  {
    accessorKey: "tenderId",
    header: ({ column }) => createSortableHeader("Tender ID", column),
    size: 120,
  },
  {
    accessorKey: "companyName",
    header: ({ column }) => createSortableHeader("Company Name", column),
    size: 120,
  },
  {
    accessorKey: "bidCost",
    header: ({ column }) => createSortableHeader("Bid Cost", column),
    size: 80,
  },
  {
    accessorKey: "bidTime",
    header: ({ column }) => createSortableHeader("Bid Time", column),
    cell: ({ row }) => (
      <p>{new Date(row.original.bidTime).toLocaleString()}</p> // Formatting the date
    ),
    size: 120,
  },
  {
    accessorKey: "flag",
    header: ({ column }) => createSortableHeader("Last 5 Mins", column),
    cell: ({ row }) => (
      <p>{row.original.last5MinuteFlag ? "True" : "False"}</p>
    ),
    size: 120,
  },
];
