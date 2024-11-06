import { useCallLogs } from "@/hooks/use-call-logs";

import { Skeleton } from "@/components/ui/skeleton";
import { columns } from "./columns";
import DataTable from "./data-table";
import Empty from "../empty";

type props = {
  selected: string
}

function Call({ selected }: props) {
  const { data, isLoading } = useCallLogs()
  const filtered = data?.filter((d: any) => d?.call_direction === selected)

  if (isLoading) return <Skeleton className="h-[480px]" />

  if (!data || filtered?.length === 0) return <Empty />

  return (
    <DataTable
      columns={selected === "web" ? columns.filter(d => d.header !== "Called Number") : columns}
      data={filtered}
    />
  )
}

export default Call
