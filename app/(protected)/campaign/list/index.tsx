import { useEffect, useState } from "react";
import CampaignBtn from "../campaign-btn";
import Details from "./details";

type props = {
  data: any[]
}

function List({ data }: props) {
  const [selected, setSelected] = useState("")

  useEffect(() => {
    if (data?.length > 0 && !selected) {
      setSelected(data?.[0]?.campaign_id)
    } else if (data?.length > 0 && selected) {
      const isFound = data?.some(d => d.campaign_id === selected)
      if (!isFound) {
        setSelected(data?.[0]?.campaign_id || "")
      }
    }
  }, [data, selected])

  const updateSelect = (v: string) => setSelected(v)

  const current: any = data?.find(d => d.campaign_id === selected)

  return (
    <section className="main-container mini-scroll-bar grid md:grid-cols-[auto_1fr] overflow-y-auto md:overflow-y-hidden">
      <div className="dfc md:w-52 pb-2 md:border-r md:h-[inherit] md:overflow-y-hidden">
        <div className="p-4 border-b">
          <CampaignBtn className="w-full" />
        </div>

        <div className="scroll-y p-4">
          {
            data?.map(item => (
              <div
                key={item?.campaign_id}
                className={`mb-2 p-2 text-xs ${selected === item?.campaign_id ? "bg-amber-300/5" : ""} rounded-md cursor-pointer`}
                onClick={() => updateSelect(item?.campaign_id)}
              >
                <h3 className="mb-0.5 font-semibold truncate">{item?.campaign_name}</h3>
              </div>
            ))
          }
        </div>
      </div>

      {
        current &&
        <Details data={current} />
      }
    </section>
  )
}

export default List
