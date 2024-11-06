import { useMutation, useQueryClient } from "@tanstack/react-query";

import { importCSVToCampaign } from "@/actions";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/hooks/use-user";

type props = {
  campaign_id: string
}

function ImportCSV({ campaign_id }: props) {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const { email } = useUser()

  const { mutate } = useMutation({
    mutationFn: importCSVToCampaign,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["campaign", email, campaign_id] })
      toast({ title: "CSV file imported successfully" })
    },
    onError() {
      toast({
        title: "Something went wrong!",
        description: "Please try again later"
      })
    }
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      mutate({
        email,
        campaign_id,
        file: e.target.files[0]
      })
    }
  }

  return (
    <input
      id="import-csv"
      type="file"
      className='size-0 p-0'
      accept=".csv"
      multiple={false}
      onChange={handleFileChange}
    />
  )
}

export default ImportCSV
