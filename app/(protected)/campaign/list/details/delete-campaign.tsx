import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteCampaign } from "@/actions";
import useModelStore from "@/store/model";
import { useToast } from "@/hooks/use-toast";

import DeleteConfirm from "@/components/delete-confirm";
import { useUser } from "@/hooks/use-user";

function DeleteCampaign() {
  const modelData = useModelStore(s => s.data)
  const closeModel = useModelStore(s => s.closeModel)

  const queryClient = useQueryClient()
  const { toast } = useToast()
  const { email } = useUser()

  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteCampaign({ campaign_id: modelData?.campaign_id, email }),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["campaign-list", email] })
      toast({ title: "Campaign deleted successfully" })
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

export default DeleteCampaign
