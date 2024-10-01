"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormLabel,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

// Define Zod schema for form validation
const schema = z.object({
  name: z.string().min(3, "Tender name must be at least 3 characters"),
  description: z
    .string()
    .min(10, "Tender description must be at least 10 characters"),
  startTime: z
    .string()
    .refine((value) => !isNaN(Date.parse(value)), { message: "Invalid start time" }),
  endTime: z
    .string()
    .refine((value) => !isNaN(Date.parse(value)), { message: "Invalid end time" }),
  bufferTime: z
    .string()
    .min(1, "Buffer time must be at least 1 minute"),
});

interface AddTenderFormProps {
  onSuccess: () => void;
}

export default function AddTenderForm({ onSuccess }: AddTenderFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  // Utility to format date to 'YYYY-MM-DD HH:mm:ss'
  const formatDateToNormal = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    // Format the start and end time
    data.startTime = formatDateToNormal(data.startTime);
    data.endTime = formatDateToNormal(data.endTime);

    try {
      const response = await fetch("http://localhost:5000/api/tenders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Tender Created Successfully");
        form.reset();
        onSuccess(); // Trigger re-fetch and close the popover
      } else {
        toast.error("Error", { description: result.message });
      }
    } catch (error) {
      toast.error("Failed to create tender");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid w-full items-start gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tender Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter Tender Name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tender Description</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Enter Tender Description" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="startTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tender Start Time</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="datetime-local"
                  placeholder="Enter Start Time"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="endTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tender End Time</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="datetime-local"
                  placeholder="Enter End Time"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bufferTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Buffer Time</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  placeholder="Enter Buffer Time in Minutes"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading} className="mt-4">
          {isLoading ? "Saving..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
