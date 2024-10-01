"use client"
import { useNotification } from '@/context/NotificationContext';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BellDot } from "lucide-react";
import { Badge } from "@/components/ui/badge"; 

export default function AdminLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const { notifications } = useNotification();

    return (
        <div>
            <div className="p-4 flex justify-between bg-background items-center gap-10 sticky top-0 z-10 border-b px-72">
                <h2 className="font-bold text-3xl whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300 text-primary">
                    TenderZ
                </h2>
                <div className="space-x-4 flex items-center">
                    {/* Notification Bell */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon" className="relative h-12 w-12">
                                <BellDot className="relative z-10" />
                                {/* Notification Indicator */}
                                {notifications.length > 0 && (
                                    <Badge
                                        className="absolute top-0 right-0 h-4 w-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full"
                                    >
                                        {notifications.length}
                                    </Badge>
                                )}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {notifications.length > 0 ? (
                                notifications.map((notification, index) => (
                                    <DropdownMenuItem key={index}>{notification}</DropdownMenuItem>
                                ))
                            ) : (
                                <DropdownMenuItem>No new notifications</DropdownMenuItem>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* User Profile Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="overflow-hidden h-min px-3">
                                <Image
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhtMRbtowke9ZnnGtyYJmIuJaB2Q1y5I-3IA&s"
                                    width={36}
                                    height={36}
                                    alt="Avatar"
                                    className="overflow-hidden rounded-full"
                                />
                                <span className="text-left ml-2">
                                    <h4>Jaideep S.</h4>
                                    <p className="text-xs opacity-60">jaideep@gmail.com</p>
                                </span>
                            </Button>
                        </DropdownMenuTrigger>
                    </DropdownMenu>
                </div>
            </div>
            <main className="mx-72 py-4 space-y-6">
                {children}
            </main>
        </div>
    );
}
