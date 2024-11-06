import { IoIosAddCircle } from "react-icons/io";
import useModelStore from "@/store/model";

function ImportPhoneBtn() {
  const updateModel = useModelStore(s => s.updateModel)

  return (
    <button
      className="px-3 py-2 text-sm font-semibold bg-primary/95 text-primary-foreground border-t-[3px] border-white/30 rounded-md rounded-t-lg hover:bg-primary"
      onClick={() => updateModel("phone")}
    >
      Import <IoIosAddCircle className="opacity-50" />
    </button>
  )
}

export default ImportPhoneBtn
