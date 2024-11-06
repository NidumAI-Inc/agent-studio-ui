import { useAgentById } from "@/hooks/use-agents";

import { Skeleton } from "@/components/ui/skeleton";
import Header from "./header";
import Config from "./config";

type props = {
  id: string
}

function AssistantsDetails({ id }: props) {
  const { isLoading } = useAgentById(id)

  if (isLoading) return <Skeleton className="m-4" />

  return (
    <div className="p-4 pt-0 md:overflow-y-auto relative">
      <Header id={id} />
      <Config id={id} />
    </div>
  )
}

export default AssistantsDetails
