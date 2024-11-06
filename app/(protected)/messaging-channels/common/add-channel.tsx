"use client";

import { LuChevronDown } from "react-icons/lu";

import useModelStore from "@/store/model";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import iconList from "./icons-list";

const list = [
  {
    val: "zendesk",
    lable: "Zendesk",
  },
  {
    val: "salesiq",
    lable: "SalesIQ",
  },
]

function AddChannel() {
  const updateModel = useModelStore(s => s.updateModel)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="df px-3 bg-primary/90 text-primary-foreground hover:bg-primary border rounded-md">
        Add Channel <LuChevronDown />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {
          list.map(l => (
            <DropdownMenuItem
              key={l.val}
              onClick={() => updateModel(l.val)}
            >
              {iconList[l.val]}
              {l.lable}
            </DropdownMenuItem>
          ))
        }
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AddChannel
