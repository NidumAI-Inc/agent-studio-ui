"use client";

import { useForm, Controller } from "react-hook-form";
import { SiZendesk } from "react-icons/si";

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
  zendesk_app_id: string
  zendesk_key_id: string
  zendesk_secret_key: string
}

function Zendesk() {
  const closeModel = useModelStore(s => s.closeModel)
  const modelData = useModelStore(s => s.data)

  const { data: agents, isLoading } = useAgentsList()
  const { userId } = useUser()

  const { control, formState: { errors }, register, handleSubmit } = useForm<FormInput>({
    defaultValues: {
      name: modelData?.name || "",
      assistant_id: modelData?.assistant_id || "",
      zendesk_app_id: modelData?.zendesk_app_id || "",
      zendesk_key_id: modelData?.zendesk_key_id || "",
      zendesk_secret_key: modelData?.zendesk_secret_key || "",
    }
  })

  const { mutate, isPending } = useThirdPartyConfigMutate(!modelData)

  function onSubmit(data: FormInput) {
    const agent = agents?.find((a: any) => a.id === data.assistant_id)
    const payload: any = {
      ...data,
      type: "zendesk",
      user_id: userId,
      displayName: `${agent?.agent_name} trigger`,
      baseUrl: window?.location?.origin
    }

    if (modelData) {
      payload._id = modelData?._id
    }
    mutate(payload, {
      onSuccess() {
        closeModel()
      }
    })
  }

  return (
    <Dialog open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="df pb-4 px-4 -mx-4 text-lg font-bold border-b">
            <SiZendesk className="text-foreground/50" />
            Zendesk Channel
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="[&_input]:bg-input/40"
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
              htmlFor="zendesk_app_id"
            >
              Zendesk App ID
            </label>
            <input
              id="zendesk_app_id"
              {...register('zendesk_app_id', {
                required: 'Zendesk App ID is required'
              })}
              disabled={isLoading || !!modelData}
            />
            {errors.zendesk_app_id &&
              <p className='text-[10px] text-red-400'>{errors.zendesk_app_id.message}</p>
            }
          </div>

          <div className="mb-4">
            <label
              className="text-foreground/70"
              htmlFor="zendesk_key_id"
            >
              Zendesk Key ID
            </label>

            <input
              id="zendesk_key_id"
              {...register('zendesk_key_id', {
                required: 'Zendesk Key ID is required'
              })}
              disabled={isLoading || !!modelData}
            />
            {errors.zendesk_key_id &&
              <p className='text-[10px] text-red-400'>{errors.zendesk_key_id.message}</p>
            }
          </div>

          <div className="mb-4">
            <label
              className="text-foreground/70"
              htmlFor="zendesk_secret_key"
            >
              Zendesk Secret Key
            </label>
            <input
              id="zendesk_secret_key"
              {...register('zendesk_secret_key', {
                required: 'Zendesk Secret Key is required'
              })}
              disabled={isLoading || !!modelData}
            />
            {errors.zendesk_secret_key &&
              <p className='text-[10px] text-red-400'>{errors.zendesk_secret_key.message}</p>
            }
          </div>

          <div className="df justify-end gap-4">
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

export default Zendesk
