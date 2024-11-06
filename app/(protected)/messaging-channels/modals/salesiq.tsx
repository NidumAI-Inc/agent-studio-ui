"use client";

import { useForm, Controller } from "react-hook-form";

import { useThirdPartyConfigMutate } from "@/hooks/use-third-party";
import { useAgentsList } from "@/hooks/use-agents";
import { useUser } from "@/hooks/use-user";

import useModelStore from "@/store/model";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type FormInput = {
  name: string
  assistant_id: string
  client_id: string
  client_secret: string
  redirect_uri: string
  access_token: string
  refresh_token: string
  salesIQDomain: string
  companyDomain: string
}

function SalesIQ() {
  const closeModel = useModelStore(s => s.closeModel)
  const modelData = useModelStore(s => s.data)

  const { data: agents, isLoading } = useAgentsList()
  const { userId } = useUser()

  const { control, formState: { errors }, register, handleSubmit } = useForm<FormInput>({
    defaultValues: {
      name: modelData?.name || "",
      assistant_id: modelData?.assistant_id || "",
      client_id: modelData?.client_id || "",
      client_secret: modelData?.client_secret || "",
      redirect_uri: modelData?.redirect_uri || "https://localhost.com",
      access_token: modelData?.access_token || "",
      refresh_token: modelData?.refresh_token || "",
      salesIQDomain: modelData?.salesIQDomain || "",
      companyDomain: modelData?.companyDomain || "",
    }
  })

  const { mutate, isPending } = useThirdPartyConfigMutate(!modelData)

  function onSubmit(data: FormInput) {
    const payload: any = {
      ...data,
      type: "salesiq",
      user_id: userId,
      baseUrl: window?.location?.origin,
    }

    if (modelData) {
      payload._id = modelData?._id
    } else {
      payload.expires_at = new Date().getTime()
    }

    mutate(payload, {
      onSuccess() {
        closeModel()
      }
    })
  }

  return (
    <Dialog open>
      <DialogContent className="md:w-[50vw]">
        <DialogHeader>
          <DialogTitle className="df pb-4 px-4 -mx-4 text-lg font-bold border-b">
            <img src="/salesiq.png" alt="" className="size-5" />
            Sales IQ Channel
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid md:grid-cols-2 md:gap-x-4 -mr-4 pr-4 [&_input]:bg-input/40 max-h-[70vh] overflow-y-auto"
        >
          <div className="mb-4">
            <label
              className="text-foreground/70"
              htmlFor="name"
            >
              Channel Name
            </label>
            <input
              id="name"
              {...register('name', {
                required: 'Name is required'
              })}
            />
            {errors.name &&
              <p className='text-[10px] text-red-400'>{errors.name.message}</p>
            }
          </div>

          <div className="mb-6">
            <label className="text-white/60" htmlFor="name">Agent</label>

            <Controller
              name="assistant_id"
              control={control}
              rules={{ required: "Agent is required" }}
              render={({ field: { value, onChange } }) => (
                <Select value={value} onValueChange={onChange}>
                  <SelectTrigger className="bg-input/50">
                    <SelectValue placeholder="Agent" />
                  </SelectTrigger>

                  <SelectContent>
                    {
                      !isLoading &&
                      agents?.map((l: any) => (
                        <SelectItem
                          key={l.id}
                          value={l.id}
                        >
                          {l.agent_name}
                        </SelectItem>
                      ))
                    }
                    {
                      !isLoading &&
                      agents?.length === 0 &&
                      <SelectItem value="-" disabled>No Phone Numbe Available</SelectItem>
                    }
                  </SelectContent>
                </Select>
              )}
            />

            {
              errors.assistant_id &&
              <p className="text-xs text-red-400">{errors.assistant_id.message}</p>
            }
          </div>

          <div className="mb-4">
            <label
              className="text-foreground/70"
              htmlFor="salesIQDomain"
            >
              Sales IQ Domain
            </label>

            <input
              id="salesIQDomain"
              {...register('salesIQDomain', {
                required: 'Sales IQ Key ID is required'
              })}
              disabled={isLoading || !!modelData}
            />
            {errors.salesIQDomain &&
              <p className='text-[10px] text-red-400'>{errors.salesIQDomain.message}</p>
            }
          </div>

          <div className="mb-4">
            <label
              className="text-foreground/70"
              htmlFor="companyDomain"
            >
              Company Domain
            </label>
            <input
              id="companyDomain"
              {...register('companyDomain', {
                required: 'Sales IQ Secret Key is required'
              })}
              disabled={isLoading || !!modelData}
            />
            {errors.companyDomain &&
              <p className='text-[10px] text-red-400'>{errors.companyDomain.message}</p>
            }
          </div>

          <div className="mb-4">
            <label
              className="text-foreground/70"
              htmlFor="client_id"
            >
              Client Id
            </label>
            <input
              id="client_id"
              {...register('client_id', {
                required: 'Sales IQ Secret Key is required'
              })}
              disabled={isLoading || !!modelData}
            />
            {errors.client_id &&
              <p className='text-[10px] text-red-400'>{errors.client_id.message}</p>
            }
          </div>

          <div className="mb-4">
            <label
              className="text-foreground/70"
              htmlFor="client_secret"
            >
              Client Secret
            </label>
            <input
              id="client_secret"
              {...register('client_secret', {
                required: 'Sales IQ Secret Key is required'
              })}
              disabled={isLoading || !!modelData}
            />
            {errors.client_secret &&
              <p className='text-[10px] text-red-400'>{errors.client_secret.message}</p>
            }
          </div>

          <div className="mb-4 md:col-span-2">
            <label
              className="text-foreground/70"
              htmlFor="refresh_token"
            >
              Refresh Token
            </label>
            <input
              id="refresh_token"
              {...register('refresh_token', {
                required: 'Sales IQ Secret Key is required'
              })}
              disabled={isLoading || !!modelData}
            />
            {errors.refresh_token &&
              <p className='text-[10px] text-red-400'>{errors.refresh_token.message}</p>
            }
          </div>

          <div className="df justify-end gap-4 md:col-span-2">
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
              disabled={isPending}
            >
              {modelData ? "Update" : "Create"} Channel
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default SalesIQ
