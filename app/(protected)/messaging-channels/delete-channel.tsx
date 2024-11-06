import { useThirdPartyConfigDelete } from "@/hooks/use-third-party";
import useModelStore from "@/store/model";

import DeleteConfirm from "@/components/delete-confirm";

function DeleteChannel() {
  const modelData = useModelStore(s => s.data)
  const closeModel = useModelStore(s => s.closeModel)

  const { mutate, isPending } = useThirdPartyConfigDelete()

  function onConfirm() {
    mutate(modelData?._id, {
      onSuccess() {
        closeModel()
      }
    })
  }

  return (
    <DeleteConfirm
      isLoading={isPending}
      onCancel={closeModel}
      onConfirm={onConfirm}
    />
  )
}

export default DeleteChannel
