import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteFileAgent } from "@/actions";
import useModelStore from "@/store/model";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/hooks/use-user";

import DeleteConfirm from "@/components/delete-confirm";

type props = {
  checkEnableFn: () => void
}

function DeleteFile({ checkEnableFn }: props) {
  const modelData = useModelStore(s => s.data)
  const closeModel = useModelStore(s => s.closeModel)

  const queryClient = useQueryClient()
  const { toast } = useToast()
  const { userId } = useUser()

  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteFileAgent({ userId, agentId: modelData?.agentId, filename: modelData?.fileName }),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["agent-files-list", userId, modelData?.agentId] })
      checkEnableFn()
      toast({ title: "File deleted successfully" })
      closeModel()
    },
    onError() {
      toast({
        title: "Something went wrong!",
        description: "Please try again later"
      })
    }
  })

  function onConfirm() {
    mutate()
  }

  return (
    <DeleteConfirm
      isLoading={isPending}
      onCancel={closeModel}
      onConfirm={onConfirm}
    />
  )
}

export default DeleteFile
