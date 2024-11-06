import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { useSession } from "next-auth/react";
import PhoneInput from 'react-phone-input-2';

import { createSIP, getSIPsFromTelynx, updateSIP } from "@/actions";
import { plusNumber } from "@/utils/phone-number-manup";
import useModelStore from "@/store/model";
import { useToast } from "@/hooks/use-toast";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type TelynxFormData = {
  auth_username: string;
  auth_password: string;
  phone_number: string;
  sip_address: string;
  api_secret: string;
  api_key: string;
  label: string;
}

const list = [
  {
    name: "US",
    value: "sip.telnyx.com",
  },
  {
    name: "Europe",
    value: "sip.telnyx.eu",
  },
  {
    name: "Australia",
    value: "sip.telnyx.com.au",
  },
  {
    name: "Canada",
    value: "sip.telnyx.ca",
  },
]

function Telynx() {
  const { data: userData } = useSession()
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const closeModel = useModelStore(s => s.closeModel)
  const modelData = useModelStore(s => s.data)

  const { control, register, handleSubmit, formState: { errors } } = useForm<TelynxFormData>({
    defaultValues: {
      auth_username: modelData?.auth_username || '',
      auth_password: modelData?.auth_password || '',
      phone_number: modelData?.phone_number || '91',
      sip_address: modelData?.sip_address || "",
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
    mutationFn: getSIPsFromTelynx,
  })

  const onSubmit = (data: TelynxFormData) => {
    mutateCheck(data?.api_key, {
      onSuccess(res) {
        let phone_number = plusNumber(data?.phone_number)
        const isNumPresent = res?.some((r: any) => r.phone_number === phone_number)
        if (isNumPresent) {
          mutate({
            ...data,
            phone_number,
            mapped_agent_name: modelData?.mapped_agent_name || "",
            provider: "telnyx",
            email: userData?.user?.email || ""
          })

        } else {
          toast({ title: "Phone numbert is not poresent in the Telynx" })
        }
      },
      onError(err) {
        toast({ title: "Authentication failed" })
      }
    })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-4"
    >
      <h2 className="mb-2 -mt-4 text-lg font-semibold">Telynx</h2>

      <div className="mini-scroll-bar p-px max-h-[45vh] -mr-4 pr-4 overflow-y-auto space-y-4">
        <div>
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

        <div>
          <label className="mb-1.5 text-[13px] text-foreground/70">Telnyx Phone Number</label>
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
                disabled={!!modelData}
              />
            )}
          />

          {
            errors.phone_number && <p className="mt-0.5 text-xs text-red-400">{errors.phone_number.message}</p>
          }
        </div>

        <div>
          <label className="mb-1.5 text-[13px] text-foreground/70">Telnyx API Key</label>
          <input
            placeholder="Telnyx API Key"
            {...register('api_key', {
              required: 'API Key is required'
            })}
          />
          {
            errors.api_key && <p className="mt-0.5 text-xs text-red-400">{errors.api_key.message}</p>
          }
        </div>

        <div>
          <label className="mb-1.5 text-[13px] text-foreground/70">Telnyx API Secret</label>
          <input
            placeholder="Telnyx API Secret"
            {...register('api_secret', {
              required: 'API Secret is required'
            })}
          />
          {
            errors.api_secret && <p className="mt-0.5 text-xs text-red-400">{errors.api_secret.message}</p>
          }
        </div>

        <div>
          <label className="mb-1.5 text-[13px] text-foreground/70">Auth Username</label>
          <input
            {...register('auth_username', {
              required: 'Auth username is required'
            })}
          />
          {
            errors.auth_username && <p className="mt-0.5 text-xs text-red-400">{errors.auth_username.message}</p>
          }
        </div>

        <div>
          <label className="mb-1.5 text-[13px] text-foreground/70">Auth Password</label>
          <input
            {...register('auth_password', {
              required: 'Auth Password is required'
            })}
          />
          {
            errors.auth_password && <p className="mt-0.5 text-xs text-red-400">{errors.auth_password.message}</p>
          }
        </div>

        <div>
          <label htmlFor="" className="mb-1.5 text-[13px] text-foreground/70">SIP Signaling Addresses</label>
          <Controller
            name="sip_address"
            control={control}
            rules={{ required: "Address is required" }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="h-9 text-xs bg-input/40">
                  <SelectValue placeholder="Address" />
                </SelectTrigger>

                <SelectContent>
                  {
                    list.map(l => (
                      <SelectItem value={l.value} key={l.value}>
                        {l.name}
                      </SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
            )}
          />
          {
            errors.sip_address && <p className="mt-0.5 text-xs text-red-400">{errors.sip_address.message}</p>
          }
        </div>
      </div>


      <div className="df justify-end mt-6">
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
          {modelData ? "Update Telnyx" : "Import from Telnyx"}
        </button>
      </div>
    </form>
  )
}

export default Telynx
