import type { Metadata } from "next";
import { DashboardMetrics } from "@/components/dashboard/DashboardMetric";
import React from "react";
import MonthlySalesChart from "@/components/dashboard/MonthlySalesChart";
import MonthlyTarget from "@/components/dashboard/MonthlyTarget";
import { ListResi } from "@/app/admin/resi/ListResi";

export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function Ecommerce() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-7">
        <DashboardMetrics />

        <MonthlySalesChart />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <MonthlyTarget />
      </div>

      {/* <div className="col-span-12">
        <StatisticsChart />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <DemographicCard />
      </div>
       */}

      <div className="col-span-12">
        <ListResi />
      </div>
    </div>
  );
}
