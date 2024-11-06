import { useChatLogs } from "@/hooks/use-call-logs";

import { Skeleton } from "@/components/ui/skeleton";
import { columns } from "./columns";
import DataTable from "./data-table";
import Empty from "../empty";

function Chat() {
  const { data, isLoading } = useChatLogs()

  if (isLoading) return <Skeleton className="h-[480px]" />

  if (!data || data?.length === 0) return <Empty />

  return (
    <DataTable
      columns={columns}
      data={data}
    />
  )
}

export default Chat
