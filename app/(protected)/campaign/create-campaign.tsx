"use client";

import { Controller, useForm } from "react-hook-form";
import { MdOutlineCampaign } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createCampaign, updateCampaign } from "@/actions";
import { useAgentsList } from "@/hooks/use-agents";
import useModelStore from "@/store/model";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/hooks/use-user";

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

type FormData = {
  campaign_name: string
  agent_phone_number: string
  campaign_description: string
}

function CreateCampaign() {
  const closeModel = useModelStore(s => s.closeModel)
  const modelData = useModelStore(s => s.data)

  const { data, isLoading } = useAgentsList()
  const queryClient = useQueryClient()
  const { email } = useUser()
  const { toast } = useToast()

  const { control, register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      campaign_name: modelData?.campaign_name || '',
      agent_phone_number: modelData?.agent_phone_number || '',
      campaign_description: modelData?.campaign_description || '',
    },
  })

  const { isPending, mutate } = useMutation({
    // @ts-ignore
    mutationFn: modelData ? updateCampaign : createCampaign,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["campaign-list", email] })
      toast({ title: `Campaign ${!modelData ? "created" : "updated"} successfully` })
      closeModel()
    },
    onError() {
      toast({
        title: "Something went wrong!",
        description: "Please try again later"
      })
    }
  })

  function onSubmit(data: FormData) {
    let payload: any = {
      email,
      ...data
    }
    if (modelData) {
      payload.campaign_id = modelData?.campaign_id
    }
    mutate(payload)
  }

  const filtered = data?.filter((d: any) => d?.agent_type === "sip")

  return (
    <Dialog open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="df pb-4 px-4 -mx-4 text-lg font-bold border-b">
            <MdOutlineCampaign className="text-foreground/50" />
            {modelData ? "Update" : "Create"} Campaign
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="text-white/60" htmlFor="name">Name</label>
            <input
              id="name"
              {...register("campaign_name", {
                required: "Name is required",
              })}
              className=" bg-input/50"
            />
            {
              errors.campaign_name &&
              <p className="text-xs text-red-400">{errors.campaign_name.message}</p>
            }
          </div>

          <div className="mb-4">
            <label className="text-white/60" htmlFor="campaign_description">Description</label>
            <input
              id="campaign_description"
              {...register("campaign_description", {
                required: "Description is required",
              })}
              className="bg-input/50"
            />
            {
              errors.campaign_description &&
              <p className="text-xs text-red-400">{errors.campaign_description.message}</p>
            }
          </div>

          <div className="mb-6">
            <label className="text-white/60" htmlFor="name">Agent</label>

            <Controller
              name="agent_phone_number"
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
                      filtered?.map((l: any) => (
                        <SelectItem
                          key={l?.id}
                          value={l?.phone_number}
                        >
                          {l?.agent_name}
                        </SelectItem>
                      ))
                    }
                    {
                      !isLoading &&
                      filtered?.length === 0 &&
                      <SelectItem value="-" disabled>No Phone Numbe Available</SelectItem>
                    }
                  </SelectContent>
                </Select>
              )}
            />

            {
              errors.agent_phone_number &&
              <p className="text-xs text-red-400">{errors.agent_phone_number.message}</p>
            }
          </div>

          <div className="df">
            <button
              type="button"
              className="px-8 py-2 rounded-md bg-input border text-foreground/60"
              onClick={closeModel}
              disabled={isPending}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-primary/95 text-primary-foreground border-t-2 border-white/30 rounded-md rounded-t-lg hover:bg-primary"
              disabled={isPending}
            >
              {modelData ? "Update" : "Create"} Campaign
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateCampaign
