"use client";
import React from "react";
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

// Define the Zod schema for the form
const schema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  bidCost: z.string().min(1, "Bid cost must be greater than 0"),
});

interface PlaceBidFormProps {
    tenderId: number; 
    onBidSuccess: () => void;  
  }

  
export default function PlaceBidForm({ tenderId, onBidSuccess }: PlaceBidFormProps) {
  const form = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  // Handle form submission using fetch instead of axios
  async function onSubmit(data: any) {
    try {
      const response = await fetch("http://localhost:5000/api/bids/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tenderId,
          companyName: data.companyName,
          bidCost: data.bidCost,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to place bid");
      }

      toast.success("Bid placed successfully", {
        description: `Your bid of $${data.bidCost} has been placed.`,
      });
      onBidSuccess();
      form.reset();
    } catch (error: any) {
      toast.error("Failed to place bid", {
        description: error.message || "An error occurred",
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid w-full items-start gap-4"
      >
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter your company name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bidCost"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bid Cost</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter your bid cost"
                  type="number"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Place Bid</Button>
      </form>
    </Form>
  );
}
