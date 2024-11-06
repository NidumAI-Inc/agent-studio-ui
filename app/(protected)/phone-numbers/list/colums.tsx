"use client";

import { ColumnDef } from "@tanstack/react-table";

import Action from "./action";

type sip = {
  phone_number: string
  provider: "telnyx" | "twilio"
  email: string
  api_key: string
  api_secret: string
  label: string
  mapped_agent_name: string
  trunk_id: string
  dispatch_rule_id: string
  status: string
}

export const columns: ColumnDef<sip>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "phone_number",
    header: "Phone Number",
  },
  {
    accessorKey: "mapped_agent_name",
    header: "Mapped Agent",
    cell: ({ row }) => row?.original?.mapped_agent_name || "Agent Not Mapped"
  },
  {
    accessorKey: "provider",
    header: "Provider",
  },
  {
    header: "Action",
    id: "action",
    cell: ({ row }) => <Action rowData={row?.original} />
  }
]
