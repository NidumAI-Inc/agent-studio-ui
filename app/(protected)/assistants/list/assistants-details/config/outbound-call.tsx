import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { FaPhone } from "react-icons/fa6";
import PhoneInput from 'react-phone-input-2';

import { makeOutboundCall } from "@/actions";
import { useAgentById } from "@/hooks/use-agents";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/hooks/use-user";

import Card from "./card";
import { plusNumber } from "@/utils/phone-number-manup";

type FormData = {
  phone_number: string
}

type props = {
  id: string
}

function OutboundCall({ id }: props) {
  const { data: current } = useAgentById(id)

  const { email } = useUser()
  const { toast } = useToast()

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      phone_number: '91',
    },
  })

  const { isPending, mutate } = useMutation({
    mutationFn: makeOutboundCall,
    onSuccess(res) {
      toast({ title: res?.detail || "Will trigger outbound call" })
    },
    onError() {
      toast({
        title: "Something went wrong!",
        description: "Please try again later"
      })
    }
  })

  function onSubmit(data: FormData) {
    mutate({
      email,
      agent_phone_number: plusNumber(current?.phone_number),
      phone_number_to_dial: data.phone_number
    })
  }

  return (
    <Card title="Outbound Call" description="You can make an outbound phone number call">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="df items-start"
      >
        <div className="flex-1">
          <label htmlFor="" className="text-xs text-foreground/60">Outbound Phone Number</label>
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

        <button
          type="submit"
          disabled={isPending}
          className="px-4 py-2 mt-6 bg-primary text-primary-foreground hover:bg-primary/80"
        >
          <FaPhone />
          Outbound Call
        </button>
      </form>
    </Card>
  )
}

export default OutboundCall
