"use client";

import { useSipList } from "@/hooks/use-sips";

import useModelStore from "@/store/model";

import ImportNumbers from "./import-numbers";
import DeleteSip from "./delete-sip";
import Loading from "./loading";
import Empty from "./empty";
import List from "./list";

function Page() {
  const { data, isLoading } = useSipList()
  const open = useModelStore(s => s.open)

  if (isLoading) return <Loading />

  return (
    <>
      {
        data?.length === 0
          ? <Empty />
          : <List list={data} />
      }

      {
        open === "phone" &&
        <ImportNumbers />
      }

      {
        open === "delete-sip" &&
        <DeleteSip />
      }
    </>
  )
}

export default Page
