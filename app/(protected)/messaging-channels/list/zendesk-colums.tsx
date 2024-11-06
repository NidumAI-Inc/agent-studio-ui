"use client";

import { ColumnDef } from "@tanstack/react-table";

import Action from "./action";

type sip = {
  _id: string
  name: string
  baseUrl: string
  agent_name: string
  displayName: string
  assistant_id: string
  zendesk_app_id: string
  zendesk_key_id: string
  zendesk_secret_key: string
}

export const zendeskColumns: ColumnDef<sip>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "agent_name",
    header: "Agent Name",
  },
  {
    header: "Action",
    id: "action",
    cell: ({ row }) => <Action rowData={row?.original} />
  }
]
