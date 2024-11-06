"use client";

import { GrChannel } from "react-icons/gr";

import { useThirdPartyList } from "@/hooks/use-third-party";
import useModelStore from "@/store/model";

import { SalesIQModal, ZendeskModal } from "./modals";
import DeleteChannel from "./delete-channel";
import AddChannel from "./common/add-channel";
import Loading from "./loading";
import Card from "./list/card";

function Page() {
  const open = useModelStore(s => s.open)

  const { data, isLoading } = useThirdPartyList()

  if (isLoading) return <Loading />

  return (
    <section className="dfc main-container mini-scroll-bar">
      <header className="df justify-between px-6 py-4 text-lg font-medium sticky top-0 backdrop-blur-lg border-b rounded-t-3xl z-[1]">
        <h1 className="df">
          <span className="p-1.5 bg-white/5 rounded"><GrChannel className="text-xl opacity-50" /></span>
          Messaging Channels
        </h1>

        <AddChannel />
      </header>

      <div className="scroll-y">
        {
          data?.length === 0 &&
          <div className="dc h-full text-foreground/70">No items found</div>
        }

        {
          data?.map(d => (
            <Card
              key={d.type}
              type={d.type}
              list={d.list}
            />
          ))
        }
      </div>

      {
        open === "zendesk" &&
        <ZendeskModal />
      }

      {
        open === "salesiq" &&
        <SalesIQModal />
      }

      {
        open === "delete-channel" &&
        <DeleteChannel />
      }
    </section>
  )
}

export default Page
