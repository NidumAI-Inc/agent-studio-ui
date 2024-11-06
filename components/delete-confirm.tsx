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

type props = {
  isLoading: boolean
  onCancel: () => void
  onConfirm: () => void
}

function DeleteConfirm({ isLoading, onCancel, onConfirm }: props) {
  return (
    <AlertDialog open>
      <AlertDialogContent className="p-6">
        <AlertDialogHeader>
          <AlertDialogTitle className="mb-2">Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className=" text-xs">
            This action cannot be undone. <br /> This will permanently delete your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={isLoading}
            onClick={onCancel}
            className="h-[34px] mr-1"
          >
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={isLoading}
            onClick={onConfirm}
            className="h-8 px-4 bg-red-500/90 hover:bg-red-500 text-white"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteConfirm
