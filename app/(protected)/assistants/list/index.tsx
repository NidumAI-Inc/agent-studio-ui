import { useEffect, useState } from "react";

import CreateAssistantBtn from "../create-assistant-btn";
import AssistantsDetails from "./assistants-details";
import AssistantsList from "./assistants-list";

type props = {
  data: any[]
}

function List({ data }: props) {
  const [selected, setSelected] = useState("")

  useEffect(() => {
    if (data?.length > 0 && !selected) {
      setSelected(data?.[0]?.id)
    } else if (data?.length > 0 && selected) {
      const isFound = data?.some(d => d.id === selected)
      if (!isFound) {
        setSelected(data?.[0]?.id || "")
      }
    }
  }, [data, selected])

  const updateSelect = (v: string) => setSelected(v)

  return (
    <section className="main-container mini-scroll-bar grid md:grid-cols-[auto_1fr] overflow-y-auto md:overflow-y-hidden">
      <div className="dfc md:w-52 pb-2 md:border-r md:h-[inherit] md:overflow-y-hidden">
        <div className="p-4 border-b">
          <CreateAssistantBtn className="w-full" />
        </div>

        <AssistantsList
          data={data}
          selected={selected}
          updateSelect={updateSelect}
        />
      </div>

      <AssistantsDetails
        key={selected}
        id={selected}
      />
    </section>
  )
}

export default List
