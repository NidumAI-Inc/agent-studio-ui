"use client";

import { useCampaigns } from "@/hooks/use-campaign";
import useModelStore from "@/store/model";

import CreateCampaign from "./create-campaign";
import Loading from "./loading";
import Empty from "./empty";
import List from "./list";

function Page() {
  const { data, isLoading } = useCampaigns()
  const open = useModelStore(s => s.open)

  if (isLoading) return <Loading />

  return (
    <>
      {
        data?.length === 0
          ? <Empty />
          : <List data={data} />
      }

      {
        open === "campaign" &&
        <CreateCampaign />
      }
    </>
  )
}

export default Page
