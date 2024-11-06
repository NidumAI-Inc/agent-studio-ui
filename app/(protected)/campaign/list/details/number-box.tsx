import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LuCheck, LuTrash } from 'react-icons/lu';
import PhoneInput from 'react-phone-input-2';

import { deleteNumImCampaign, updateNumInCampaign } from '@/actions';
import { plusNumber } from '@/utils/phone-number-manup';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/hooks/use-user';

type props = {
  campaign_id: string
  phone_number: string
}

function NumberBox({ campaign_id, phone_number }: props) {
  const [num, setNum] = useState(phone_number || "")
  const queryClient = useQueryClient()
  const { email } = useUser()
  const { toast } = useToast()

  const { mutate: mutateUpdate, isPending: isPending } = useMutation({
    mutationFn: updateNumInCampaign,
    onSuccess() {
      toast({ title: "Number updated successfully" })
      queryClient.invalidateQueries({ queryKey: ["campaign", email, campaign_id] })
    },
    onError() {
      toast({
        title: "Something went wrong!",
        description: "Please try again later"
      })
    }
  })

  const { mutate: mutateDel, isPending: isPending1 } = useMutation({
    mutationFn: deleteNumImCampaign,
    onSuccess() {
      toast({ title: "Number deleted successfully" })
      queryClient.invalidateQueries({ queryKey: ["campaign", email, campaign_id] })
    },
    onError() {
      toast({
        title: "Something went wrong!",
        description: "Please try again later"
      })
    }
  })

  function updateNum() {
    mutateUpdate({
      email,
      campaign_id,
      old_phone_number: phone_number,
      new_phone_number: num,
    })
  }

  function deleteNum() {
    mutateDel({ email, campaign_id, phone_number })
  }

  return (
    <div className='df mb-3 relative'>
      <PhoneInput
        country="in"
        specialLabel=''
        placeholder="Enter phone number"
        inputClass='bg-background-light/60'
        value={num}
        onChange={setNum}
      />

      {
        num !== phone_number &&
        <button
          className='p-1 absolute top-2 right-8 bg-green-400/50 hover:bg-green-400/60'
          disabled={isPending}
          onClick={updateNum}
        >
          <LuCheck />
        </button>
      }

      <button
        onClick={deleteNum}
        disabled={isPending1}
        className='p-0 text-foreground/60 hover:text-red-400'
      >
        <LuTrash />
      </button>
    </div>
  )
}

export default NumberBox
