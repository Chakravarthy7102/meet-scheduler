"use client";

import BookingsTable from "@/components/bookings/bookings-table";
import { Button } from "@/components/ui/button";
import { CalendarCheck } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <section className="p-10 max-w-[1540px] mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-start w-full mt-6 gap-x-3 justify-between">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <CalendarCheck /> Upcoming Meeting
          </h2>
          <p className="text-sm ml-8">
            See upcoming meeting and your event links.
          </p>
        </div>
        <Link href="/">
          <Button>Back to calendar</Button>
        </Link>
      </div>
      <BookingsTable />
    </section>
  );
}
