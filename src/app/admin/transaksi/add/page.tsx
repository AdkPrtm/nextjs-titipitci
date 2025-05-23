import PageBreadcrumb from "@/components/common/PageBreadCumb";
// import DefaultInputs from "@/components/form/form-elements/DefaultInput";
// import CheckboxComponents from "@/components/form/form-elements/CheckboxComponents";
// import DropzoneComponent from "@/components/form/form-elements/DropZone";
// import FileInputExample from "@/components/form/form-elements/FileInputExample";
// import InputGroup from "@/components/form/form-elements/InputGroup";
// import InputStates from "@/components/form/form-elements/InputStates";
// import RadioButtons from "@/components/form/form-elements/RadioButtons";
// import SelectInputs from "@/components/form/form-elements/SelectInputs";
// import TextAreaInput from "@/components/form/form-elements/TextAreaInput";
// import ToggleSwitch from "@/components/form/form-elements/ToggleSwitch";
import { Metadata } from "next";
import React from "react";
import { AddResiForm } from "./AddResi";

export const metadata: Metadata = {
  title: "Next.js Form Elements | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Form Elements page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

export default function AddResi() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Add Resi" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols">
        <AddResiForm />
      </div>
    </div>
  );
}
