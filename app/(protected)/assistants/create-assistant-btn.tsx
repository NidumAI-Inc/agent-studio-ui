import { IoIosAddCircle } from "react-icons/io";
import useModelStore from "@/store/model";
import { cn } from "@/lib/utils";

type props = {
  className?: string;
}

function CreateAssistantBtn({ className }: props) {
  const updateModel = useModelStore(s => s.updateModel)

  return (
    <button
      className={cn("px-4 py-2 text-sm font-semibold bg-primary/95 text-primary-foreground border-t-[3px] border-white/30 rounded-md rounded-t-lg hover:bg-primary", className)}
      onClick={() => updateModel("assisstant")}
    >
      Create Agent <IoIosAddCircle className="opacity-50" />
    </button>
  )
}

export default CreateAssistantBtn
