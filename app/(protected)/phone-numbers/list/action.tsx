import { BsThreeDotsVertical } from "react-icons/bs";

import useModelStore from "@/store/model";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast()

  function deleteCheck() {
    if (rowData?.mapped_agent_name) {
      toast({
        title: "Agent is mapped",
        description: "Please delete mapped agent to procced"
      })

    } else {
      updateModel("delete-sip", rowData)
    }
  }
  return (
    <DropdownMenu >
      <DropdownMenuTrigger>
        <BsThreeDotsVertical />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => updateModel("phone", rowData)}>Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={deleteCheck}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Action
