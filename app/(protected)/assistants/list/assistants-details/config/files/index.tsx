import { useFilesInAgentsList } from "@/hooks/use-agents";
import { LuTrash } from "react-icons/lu";

import useModelStore from "@/store/model";
import useUpdate from "../use-update";

import { Switch } from "@/components/ui/switch";
import Instructions from "./instructions";
import DeleteFile from "./delete-file";
import UploadFile from "./upload-file";
import Card from "../card";

type props = {
  id: string
}

function Files({ id }: props) {
  const { details, onSelect } = useUpdate(id)
  const { data: files, isLoading } = useFilesInAgentsList(id)

  const updateModel = useModelStore(s => s.updateModel)
  const open = useModelStore(s => s.open)

  function checkEnableFn() {
    if (files?.length === 1 && details.rag_enabled) {
      onSelect("rag_enabled", false)
    }
  }

  return (
    <>
      <UploadFile id={id} files={files} />

      <Card title="Files" description="Manage Files">
        <div>
          <div className="df absolute top-4 right-4">
            <label htmlFor="" className="text-xs">Enable RAG</label>
            <Switch
              checked={details?.rag_enabled}
              onCheckedChange={val => onSelect("rag_enabled", val)}
              disabled={files?.length === 0 || isLoading}
            />
          </div>

          {
            !isLoading && files?.map((d: any) => (
              <div key={d} className="df text-sm mb-2">
                <p>{d}</p>
                <button
                  className="p-1 text-foreground/70 hover:text-red-400"
                  onClick={() => updateModel("delete-file", { fileName: d, agentId: id })}
                >
                  <LuTrash />
                </button>
              </div>
            ))
          }
        </div>
      </Card>

      <Instructions />

      {
        open === "delete-file" &&
        <DeleteFile
          checkEnableFn={checkEnableFn}
        />
      }
    </>
  )
}

export default Files
