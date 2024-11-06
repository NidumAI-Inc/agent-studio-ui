import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteAgent, updateSIPMapedAgent } from "@/actions";
import { plusNumber } from "@/utils/phone-number-manup";
import useModelStore from "@/store/model";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/hooks/use-user";

import DeleteConfirm from "@/components/delete-confirm";

function DeleteAssistant() {
  const closeModel = useModelStore(s => s.closeModel)
  const modelData = useModelStore(s => s.data)

  const { userId, email } = useUser()
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const { mutate: mutateSip } = useMutation({
    mutationFn: updateSIPMapedAgent,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["sip-list"] })
    },
    onError() {
      toast({
        title: "Something went wrong!",
        description: "Please try again later"
      })
    }
  })

  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteAgent({ userId, agentId: modelData?.id }),
    onSuccess() {
      let phone_number = plusNumber(modelData?.phone_number)
      mutateSip({
        email,
        phone_number,
        agent_name: ""
      })
      queryClient.invalidateQueries({ queryKey: ["agent-list"] })
      toast({ title: "Agent deleted successfully" })
      closeModel()
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

export default DeleteAssistant
