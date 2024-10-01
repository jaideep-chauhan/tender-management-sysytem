"use client"
import React, { useEffect, createContext, useContext } from "react";
import { io, Socket } from "socket.io-client";
import { useNotification } from "./NotificationContext";

interface SocketContextType {
  socket: Socket;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { addNotification } = useNotification();
  const socket = io("http://localhost:5000");

  useEffect(() => {
    // Listen for new bid notifications
    socket.on("newBid", (data) => {
      addNotification(
        `New bid placed for tender ID: ${data.tenderId} by ${data.bid.companyName} at cost: ${data.bid.bidCost}`
      );
    });

    // Listen for tender update notifications
    socket.on("tenderUpdated", (data) => {
      addNotification(`${data.message}`);
    });

    // Cleanup socket listeners on component unmount
    return () => {
      socket.off("newBid");
      socket.off("tenderUpdated");
    };
  }, [addNotification, socket]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
