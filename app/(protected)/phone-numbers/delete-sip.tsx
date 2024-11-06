import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import useModelStore from "@/store/model";
import { deleteSIP } from "@/actions";
import { useToast } from "@/hooks/use-toast";

import DeleteConfirm from "@/components/delete-confirm";

function DeleteSip() {
  const modelData = useModelStore(s => s.data)
  const closeModel = useModelStore(s => s.closeModel)

  const queryClient = useQueryClient()
  const { data } = useSession()
  const { toast } = useToast()

  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteSIP({ phone_number: modelData?.phone_number, email: data?.user?.email || "" }),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["sip-list"] })
      toast({ title: "Phone Number deleted successfully" })
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

export default DeleteSip
