import { useMutation, useQueryClient } from '@tanstack/react-query';

import { startCampaign } from '@/actions';
import useModelStore from '@/store/model';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/hooks/use-user';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

function StartCampaign() {
  const closeModel = useModelStore(s => s.closeModel)
  const data = useModelStore(s => s.data)

  const queryClient = useQueryClient()

  const { toast } = useToast()
  const { email } = useUser()

  const { mutate, isPending } = useMutation({
    mutationFn: startCampaign,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["campaign-status", email, data?.campaign_id] })
      toast({ title: "Campaign started successfully" })
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
    mutate({
      campaign_id: data?.campaign_id,
      email
    })
  }

  return (
    <AlertDialog open>
      <AlertDialogContent className="p-6">
        <AlertDialogHeader>
          <AlertDialogTitle className="mb-2 leading-5">
            Would you like to start the campaign now?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-xs">
            Once your Phone Call AI Campaign starts, it cannot be stopped until it completes all scheduled calls
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={isPending}
            onClick={closeModel}
            className="h-[34px] mr-1"
          >
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={isPending}
            onClick={onConfirm}
            className="h-8 px-4 bg-green-500/90 hover:bg-green-500 text-white"
          >
            Start
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default StartCampaign
