import PageBreadcrumb from "@/components/common/PageBreadCumb";
import React from "react";
import { Metadata } from "next";
import { ListTransaksi } from "./ListTransaksi";


export const metadata: Metadata = {
    title: "Next.js Form Elements | TailAdmin - Next.js Dashboard Template",
    description:
        "This is Next.js Form Elements page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};
export default function UserPage() {
    return (
        <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
            <PageBreadcrumb pageTitle="List Transaksi" />
            <div className="col-span-12">
                <ListTransaksi />
            </div>
        </div>
    );
}

