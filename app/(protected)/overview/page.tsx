"use client";

import { useState } from "react";
import { BiSolidPieChartAlt2 } from "react-icons/bi";

import { typeT } from "@/hooks/use-overview";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Dashboard from "./dashboard";

type listT = {
  name: string
  value: typeT
}[]

const list: listT = [
  {
    name: "Day",
    value: "day",
  },
  {
    name: "Week",
    value: "week",
  },
  {
    name: "Month",
    value: "month",
  },
  {
    name: "Overall",
    value: "overall",
  },
]

function Page() {
  const [selected, setSelected] = useState<typeT>("week")

  return (
    <section className="main-container mini-scroll-bar ">
      <header className="df justify-between px-6 py-4 text-lg font-medium sticky top-0 backdrop-blur-lg border-b rounded-t-3xl z-[1]">
        <h1 className="df">
          <span className="p-1 bg-white/5 rounded"><BiSolidPieChartAlt2 className="text-2xl opacity-50" /></span>
          Overview
        </h1>

        <Select value={selected} onValueChange={v => setSelected(v as typeT)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="" />
          </SelectTrigger>
          <SelectContent>
            {
              list.map(l => (
                <SelectItem key={l.value} value={l.value}>{l.name}</SelectItem>
              ))
            }
          </SelectContent>
        </Select>
      </header>

      <Dashboard selected={selected} />
    </section>
  )
}

export default Page
