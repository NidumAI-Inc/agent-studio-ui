"use client";

import { useAgentsList } from "@/hooks/use-agents";
import useModelStore from "@/store/model";

import CreateAssistant from "./create-assistant";
import DeleteAssistant from "./delete-assistant";
import Loading from "./loading";
import Empty from "./empty";
import List from "./list";

function Page() {
  const { data, isLoading } = useAgentsList()
  const open = useModelStore(s => s.open)

  if (isLoading) return <Loading />

  return (
    <>
      {
        (!data || data?.length === 0)
          ? <Empty />
          : <List data={data} />
      }

      {
        open === "assisstant" &&
        <CreateAssistant />
      }

      {
        open === "delete-assisstant" &&
        <DeleteAssistant />
      }
    </>
  )
}

export default Page
