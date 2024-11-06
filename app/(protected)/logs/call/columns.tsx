"use client";

import { ColumnDef } from "@tanstack/react-table";
import dayjs from 'dayjs';

import Cost from "./cost";
import Messages from "./messages";

type sip = {
  call_log_id: string
  agent_id: string
  agent_name: string
  agent_phone_number: string
  user_id: string
  incoming_callerid: string
  call_type: string
  start_time: string
  end_time: string
  duration: string
  messages: {
    timestamp: string
    speaker: string
    message: string
    tokens: string
  }[]
  conversation_analysis: string
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

export const columns: ColumnDef<sip>[] = [
  {
    accessorKey: "call_direction",
    header: "Call Direction",
  },
  {
    accessorKey: "called_number",
    header: "Called Number",
  },
  {
    accessorKey: "agent_name",
    header: "Agent Name",
  },
  {
    accessorKey: "agent_phone_number",
    header: "Phone Number / ID",
  },
  {
    header: "Cost",
    cell: ({ row }) => <Cost {...row?.original} />,
  },
  {
    header: "Time & Duration",
    cell: ({ row }) => {
      const startTime = dayjs(row?.original?.start_time);
      const endTime = dayjs(row?.original?.end_time);

      // const durationInSeconds = endTime.diff(startTime, 'seconds');
      const durationInSeconds = Number(Number(row?.original?.duration).toFixed())
      const hours = Math.floor(durationInSeconds / 3600);
      const minutes = Math.floor((durationInSeconds % 3600) / 60);
      const seconds = durationInSeconds % 60;

      const durationParts = [];
      if (hours > 0) durationParts.push(`${hours}h`);
      if (minutes > 0) durationParts.push(`${minutes}m`);
      durationParts.push(`${seconds}s`);
      const duration = durationParts.join(' ');

      return (
        <div className="df text-xs text-nowrap">
          {
            startTime.isSame(endTime, 'day')
              ? (
                <>
                  <span>{startTime.format("DD/MM/YYYY")}</span>
                  <span>{startTime.format("hh:mm A")} - {endTime.format("hh:mm A")}</span>
                  <span>{duration}</span>
                </>
              )
              : (
                <>
                  <span>{startTime.format("DD/MM/YYYY hh:mm A")} - </span>
                  <span>{endTime.format("DD/MM/YYYY hh:mm A")}</span>
                  <span>{duration}</span>
                </>
              )
          }
        </div>
      )
    }
  },
  {
    header: "Details",
    cell: ({ row }) => <Messages messages={row?.original?.messages} conversation_analysis={row?.original?.conversation_analysis} />
  }
]
