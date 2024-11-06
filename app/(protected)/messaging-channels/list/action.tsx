import { BsThreeDotsVertical } from "react-icons/bs";

import useModelStore from "@/store/model";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type props = {
  rowData: any
}

function Action({ rowData }: props) {
  const updateModel = useModelStore(s => s.updateModel)

  return (
    <DropdownMenu >
      <DropdownMenuTrigger>
        <BsThreeDotsVertical />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => updateModel(rowData.type, rowData)}>Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={() => updateModel("delete-channel", rowData)}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Action
