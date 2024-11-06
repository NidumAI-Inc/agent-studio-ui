import { RiMoneyDollarCircleFill } from "react-icons/ri";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

type props = {
  tts_name: string
  stt_name: string
  llm_name: string
  total_tokens_llm: string
  total_tokens_stt: string
  total_tokens_tts: string
  cost_llm: string
  cost_stt: string
  cost_tts: string
  platform_cost: string
  total_cost: string
}

function Cost(dataProps: props) {
  return (
    <HoverCard>
      <HoverCardTrigger className="df text-sm cursor-pointer">
        {Number(dataProps?.total_cost).toFixed(5)}
        <RiMoneyDollarCircleFill className=" text-foreground/60" />
      </HoverCardTrigger>

      <HoverCardContent>
        {
          ["llm", "stt", "tts"].map(l => (
            <div key={l} className="p-2 mb-2 text-xs rounded bg-background-light border">
              <div className="df justify-between mb-0.5">
                <h6 className="text-sm font-semibold uppercase">{l}</h6>
                <p className="df">
                  <span className="text-foreground/60">Provider :</span>
                  {/* @ts-ignore */}
                  {dataProps?.[`${l}_name`]}
                </p>
              </div>

              <div className="df justify-between">
                <p className="df">
                  <span className="text-foreground/60">Tokens :</span>
                  {/* @ts-ignore */}
                  {dataProps?.[`total_tokens_${l}`]}
                </p>
                <p className="df">
                  <span className="text-foreground/60">Cost :</span>
                  {/* @ts-ignore */}
                  <span className="font-bold">{Number(dataProps?.[`cost_${l}`]).toFixed(5)}</span>
                </p>
              </div>
            </div>
          ))
        }

        <div className="df justify-between mb-2 px-2 py-1 rounded bg-background-light border">
          <span className="text-xs text-foreground/60">Platform Cost :</span>
          <span className="text-xs font-bold">{Number(dataProps?.platform_cost).toFixed(5)}</span>
        </div>

        <div className="df justify-between px-2 py-1 rounded bg-background-light border">
          <span className="text-xs text-foreground/60">Total Cost :</span>
          <span className="text-sm font-bold">{Number(dataProps?.total_cost).toFixed(5)}</span>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

export default Cost
