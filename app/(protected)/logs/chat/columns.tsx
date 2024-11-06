"use client";

import { ColumnDef } from "@tanstack/react-table";

import Messages from "./messages";

type sip = {
  _id: string;
  chat_data: {
    role: string;
    content: string;
  }[];
  result: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
    completion_tokens_details: {
      reasoning_tokens: number;
    };
  };
  total_tokens: number;
  cost_llm: number;
  agent_id: string;
  agent_name: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  chat_id: string;
  conversation_analysis: string;
}

export const columns: ColumnDef<sip>[] = [
  {
    accessorKey: "agent_name",
    header: "Agent Name",
  },
  {
    header: "Cost",
    accessorKey: "cost_llm",
    cell: ({ row }) => `${Number(row?.original.cost_llm).toFixed(5)} $`
  },
  {
    accessorKey: "total_tokens",
    header: "Total Tokens",
  },
  {
    header: "Details",
    cell: ({ row }) => <Messages messages={row?.original?.chat_data} conversation_analysis={row?.original?.conversation_analysis} />
  }
]
