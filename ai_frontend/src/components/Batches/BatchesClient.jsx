"use client";


import { useBatches } from "@/hooks/useBatches";
import BatchesTable from "./BatchesTable";
import BatchesHeader from "./BatchesHeader";

export default function BatchesClient() {
  const { data, isLoading } = useBatches();
  const batches = data || [];
  return (
    <div className="space-y-8 p-4 max-w-7xl mx-auto">
      <BatchesHeader total={batches.length}/>
      <BatchesTable batches={batches} isLoading={isLoading} />
    </div>
  );
}