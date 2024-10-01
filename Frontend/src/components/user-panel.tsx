"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Separator } from "@radix-ui/react-dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PlaceBidForm from "./forms/PlaceBidForm";
import { useSocket } from "../context/SocketContext";

interface Tender {
  tenderId: string;
  name: string;
  lowestBid: number;
  startTime: string;
  endTime: string;
}

export default function UserPanel() {
  const { socket } = useSocket();
  const [liveTenders, setLiveTenders] = useState<Tender[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    // Fetch tenders from backend API
    async function fetchTenders() {
      try {
        const response = await fetch("http://localhost:5000/api/tenders");
        if (!response.ok) {
          throw new Error("Failed to fetch tenders");
        }
        const data = await response.json();
        setLiveTenders(data?.data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        setLoading(false);
      }
    }

    fetchTenders();

    if (socket) {
      // Listen for new bid notifications
      socket.on("newBid", (data) => {
        setNotifications((prev) => [
          ...prev,
          `New bid placed for tender ID: ${data.tenderId} by ${data.bid.companyName} at cost: ${data.bid.bidCost}`,
        ]);
      });

      // Listen for tender update notifications
      socket.on("tenderUpdated", (data) => {
        setNotifications((prev) => [...prev, data.message]);
      });

      // Cleanup socket listeners on component unmount
      return () => {
        socket.off("newBid");
        socket.off("tenderUpdated");
      };
    }
  }, [socket]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const handleBidSuccess = () => {
    setIsDialogOpen(false); 
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="space-y-4">
      <h2>Live Tenders</h2>
      <div className="flex flex-wrap gap-6">
        {liveTenders.length > 0 ? (
          liveTenders.map((tender) => (
            <div key={tender.tenderId} className="min-w-80 max-w-96 p-4 rounded-lg shadow-sm bg-muted/60 space-y-4">
              <div className="[&_p]:flex [&_p]:justify-between">
                <p>
                  Tender ID: <span>{tender.tenderId}</span>
                </p>
                <p>
                  Name: <span>{tender.name}</span>
                </p>
                <p>
                  Lowest Bid: <span>{tender?.lowestBid ? tender?.lowestBid : "null"}</span>
                </p>
              </div>
              <Separator className="bg-slate-200 h-1" />
              <div className="flex justify-between items-end">
                <div>
                  <p className="flex flex-col text-sm">
                    Start: <span className="text-base">{formatDate(tender.startTime)}</span>
                  </p>
                  <p className="flex flex-col text-sm">
                    Ending: <span className="text-base">{formatDate(tender.endTime)}</span>
                  </p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={() => setIsDialogOpen(true)}>Bid</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Place Your Bid</DialogTitle>
                      <DialogDescription>
                        You're bidding for ID: <b>{tender.tenderId}</b>
                        <br /> Name: <b>{tender.name}</b>
                      </DialogDescription>
                    </DialogHeader>
                    <PlaceBidForm tenderId={tender.tenderId} onBidSuccess={handleBidSuccess} />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))
        ) : (
          <div>No tenders available</div>
        )}
      </div>
    </div>
  );
}
