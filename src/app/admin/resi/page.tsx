import PageBreadcrumb from "@/components/common/PageBreadCumb";
import { ListResi } from "@/app/admin/resi/ListResi";
import React from "react";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Next.js Form Elements | TailAdmin - Next.js Dashboard Template",
    description:
        "This is Next.js Form Elements page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};
export default function ResiPage() {
    return (
        <div>
            <PageBreadcrumb pageTitle="List Resi" />
            <div className="grid grid-cols-1 gap-6 xl:grid-cols">
                <ListResi />
            </div>
        </div>
    );
}

