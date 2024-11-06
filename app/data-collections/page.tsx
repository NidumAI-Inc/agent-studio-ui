"use client";

import { useSearchParams } from "next/navigation";

import { useDataCollected, useDownloadDataCollections } from "@/hooks/use-chat-bot";

import { DataTable } from "@/components/ui/data-table";
import { Skeleton } from "@/components/ui/skeleton";

function DataCollected() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const { mutate, isPending } = useDownloadDataCollections(id as string)
  const { data, isLoading } = useDataCollected(id as string)

  if (isLoading) return <Skeleton className="m-6 h-screen" />

  if (data?.data?.length === 0) return <div className="dc h-80">No data found</div>

  return (
    <div className="h-screen p-4 overflow-y-auto">
      <button
        className="ml-auto mb-2 py-px text-[10px] bg-primary text-primary-foreground hover:bg-primary/70"
        onClick={() => mutate()}
        disabled={isPending}
      >
        Download
      </button>

      <DataTable
        className="[&_th]:text-nowrap"
        columns={
          data?.colums?.map(d => ({
            ...d,
            cell: ({ row }: any) => {
              return row?.original[d.accessorKey] || "-"
            }
          })
          ) || []
        }
        data={data?.data || []}
      />
    </div>
  )
}

export default DataCollected
