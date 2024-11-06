import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { useSession } from "next-auth/react";
import PhoneInput from 'react-phone-input-2';

import { createSIP, getSIPsFromTwilio, updateSIP } from "@/actions";
import { useToast } from "@/hooks/use-toast";
import useModelStore from "@/store/model";

type TwilioFormData = {
  phone_number: string;
  api_key: string;
  api_secret: string;
  label: string;
}

function Twilio() {
  const { data: userData } = useSession()
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const closeModel = useModelStore(s => s.closeModel)
  const modelData = useModelStore(s => s.data)

  const { control, register, handleSubmit, formState: { errors } } = useForm<TwilioFormData>({
    defaultValues: {
      phone_number: modelData?.phone_number || '91',
      api_secret: modelData?.api_secret || '',
      api_key: modelData?.api_key || '',
      label: modelData?.label || '',
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: modelData ? updateSIP : createSIP,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["sip-list"] })
      toast({ title: `${modelData ? "Updated" : "Created new"} SIP` })
      closeModel()
    },
    onError() {
      toast({
        title: "Something went wrong!",
        description: "Please try again later"
      })
    }
  })

  const { mutate: mutateCheck, isPending: isPending2 } = useMutation({
    mutationFn: getSIPsFromTwilio,
  })

  const onSubmit = (data: TwilioFormData) => {
    mutateCheck(
      {
        accountSid: data?.api_key,
        authToken: data?.api_secret,
      },
      {
        onSuccess(res) {
          const isNumPresent = res?.some((r: any) => r.phone_number === `+${data?.phone_number}`)
          if (isNumPresent) {
            mutate({
              ...data,
              phone_number: `+${data?.phone_number}`,
              mapped_agent_name: "",
              provider: "twilio",
              email: userData?.user?.email || ""
            })

          } else {
            toast({ title: "Phone numbert is not poresent in the Twilio" })
          }
        },
        onError() {
          toast({ title: "Authentication failed" })
        }
      }
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-4"
    >
      <div className="mb-4">
        <label className="mb-1.5 text-[13px] text-foreground/70">Twilio Phone Number</label>
        <Controller
          name="phone_number"
          control={control}
          rules={{ required: "Phone number is required" }}
          render={({ field: { value, onChange } }) => (
            <PhoneInput
              placeholder="Enter phone number"
              value={value}
              onChange={onChange}
              specialLabel=''
              country="in"
            />
          )}
        />

        {
          errors.phone_number && <p className="mt-0.5 text-xs text-red-400">{errors.phone_number.message}</p>
        }
      </div>

      <div className="mb-4">
        <label className="mb-1.5 text-[13px] text-foreground/70">Twilio Account SID</label>
        <input
          placeholder="Twilio Account SID"
          {...register('api_key', {
            required: 'Account SID is required'
          })}
        />
        {
          errors.api_key && <p className="mt-0.5 text-xs text-red-400">{errors.api_key.message}</p>
        }
      </div>

      <div className="mb-4">
        <label className="mb-1.5 text-[13px] text-foreground/70">Twilio Auth Token</label>
        <input
          placeholder="Twilio Auth Token"
          {...register('api_secret', {
            required: 'Auth Token is required'
          })}
        />
        {
          errors.api_secret && <p className="mt-0.5 text-xs text-red-400">{errors.api_secret.message}</p>
        }
      </div>

      <div className="mb-8">
        <label className="mb-1.5 text-[13px] text-foreground/70">Label</label>
        <input
          placeholder="Label for Phone Number"
          {...register('label', {
            required: 'Label is required'
          })}
        />
        {
          errors.label && <p className="mt-0.5 text-xs text-red-400">{errors.label.message}</p>
        }
      </div>

      <div className="df">
        <button
          type="button"
          className="px-8 py-2 rounded-md bg-input border text-foreground/60"
          onClick={closeModel}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-4 py-2 bg-primary/95 text-primary-foreground border-t-2 border-white/30 rounded-md rounded-t-lg hover:bg-primary"
          disabled={isPending || isPending2}
        >
          {modelData ? "Update Twilio" : "Import from Twilio"}
        </button>
      </div>
    </form>
  )
}

export default Twilio
