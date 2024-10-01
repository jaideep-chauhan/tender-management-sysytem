"use client";
import React, { useState, useEffect } from "react";
import TendersTable from "@/components/tables/TendersTable";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import AddTenderForm from "@/components/forms/AddTenderForm";

export default function Page() {
  const [tenders, setTenders] = useState<any[]>([]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  // Fetch tenders from the API
  const fetchTenders = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/tenders");
      const data = await response.json();
      setTenders(data.data);
    } catch (err) {
      console.error("Error fetching tenders:", err);
    }
  };

  // Close the popover after submission
  const handlePopoverClose = () => {
    setIsPopoverOpen(false);
  };

  // Fetch tenders when the component loads
  useEffect(() => {
    fetchTenders();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h2 className="font-semibold">Tenders List</h2>
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger asChild>
            <Button onClick={() => setIsPopoverOpen(true)}>
              <PlusCircle size={16} /> Add New Tender
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" side="left" className="w-96">
            <AddTenderForm
              onSuccess={() => {
                fetchTenders(); 
                handlePopoverClose(); 
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      <TendersTable tenders={tenders} />
    </div>
  );
}
