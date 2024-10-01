import { NotificationProvider } from "@/context/NotificationContext";
import { SocketProvider } from "@/context/SocketContext";
import React from "react";

function Provider({ children }: { children: React.ReactNode }) {
  return (
    <NotificationProvider>
      <SocketProvider>{children}</SocketProvider>
    </NotificationProvider>
  );
}

export default Provider;
