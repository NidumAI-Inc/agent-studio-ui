"use client";

import { useState } from "react";
import { MdCallToAction } from "react-icons/md";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Call from "./call";
import Chat from "./chat";

const list = ["Inbound", "Outbound", "Web", "Chat"]

function Page() {
  const [selected, setSelected] = useState("Inbound")

  return (
    <section className="main-container mini-scroll-bar">
      <header className="df justify-between px-6 py-4 text-lg font-medium sticky top-0 backdrop-blur-lg border-b rounded-t-3xl z-[1]">
        <h1 className="df">
          <span className="p-1 bg-white/5 rounded"><MdCallToAction className="text-2xl opacity-50" /></span>
          Logs
        </h1>

        <Select value={selected} onValueChange={setSelected}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="" />
          </SelectTrigger>
          <SelectContent>
            {
              list.map(l => (
                <SelectItem key={l} value={l}>{l}</SelectItem>
              ))
            }
          </SelectContent>
        </Select>
      </header>

      <div className="p-6">
        {
          selected === "Chat" &&
          <Chat />
        }

        {
          selected !== "Chat" &&
          <Call selected={selected.toLowerCase()} />
        }
      </div>
    </section>
  )
}

export default Page
