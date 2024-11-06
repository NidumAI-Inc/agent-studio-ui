"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { FaUserPlus } from "react-icons/fa";

import { createAgent, updateAgent, updateSIPMapedAgent } from "@/actions";
import { generateRandomAlphanumeric } from "@/lib/utils";
import { defaultChatBotData } from "@/utils/chat-bot";
import templates from "./teplates";

import { useCreateChatBot } from "@/hooks/use-chat-bot";
import { plusNumber } from "@/utils/phone-number-manup";
import { useSipList } from "@/hooks/use-sips";
import useModelStore from "@/store/model";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/hooks/use-user";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type formDataT = {
  agent_name: string;
  phone_number: string;
}

const Types = ["Phone", "Web"]

function CreateAssistant() {
  const closeModel = useModelStore(s => s.closeModel)
  const modelData = useModelStore(s => s.data)

  const [selected, setSelected] = useState("1")
  const [type, setType] = useState("Phone")

  const { data: sips, isLoading } = useSipList()
  const { userId, email } = useUser()

  const queryClient = useQueryClient()
  const { toast } = useToast()

  const { control, register, handleSubmit, formState: { errors } } = useForm<formDataT>({
    defaultValues: {
      agent_name: modelData?.agent_name || "",
      phone_number: modelData?.phone_number ? plusNumber(modelData?.phone_number) : "",
    }
  })

  const { mutate: mutateCreateChatBot } = useCreateChatBot()

  const { mutate: mutateSip } = useMutation({
    mutationFn: updateSIPMapedAgent,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["sip-list"] })
    }
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: any) => modelData ? updateAgent({ userId, agentId: modelData?.id }, payload) : createAgent(userId, payload),
    onSuccess(res, payload) {
      let num = payload?.phone_number
      if (type === "Phone") {
        num = plusNumber(num)
      }
      const current = sips?.find((d: any) => d?.phone_number === num)

      const newData = {
        email,
        phone_number: num,
        agent_name: payload?.agent_name
      }

      if (!modelData) {
        if (current) mutateSip(newData)
        mutateCreateChatBot({
          assistant_id: res.id,
          user_id: userId,
          ...defaultChatBotData
        })

      } else {
        if (modelData?.phone_number !== num) {
          if (current) mutateSip(newData)
          mutateSip({
            ...newData,
            phone_number: modelData?.phone_number,
            agent_name: ""
          })
        }
      }
      queryClient.invalidateQueries({ queryKey: ["agent-list"] })
      toast({ title: `${modelData ? "Updated" : "Created new"} agent` })
      closeModel()
    }
  })

  function onSubmit(payload: any) {
    let createData = {}
    if (!modelData) {
      const found = templates?.find(t => t.id === selected)

      createData = {
        temperature: modelData?.temperature || 0.8,
        max_tokens: modelData?.max_tokens || 300,
        language: modelData?.language || "en",
        TTS_provider: modelData?.TTS_provider || "open ai",
        voice: modelData?.voice || "nova",
        tts_speed: modelData?.tts_speed || 1,
        interrupt_speech_duration: modelData?.interrupt_speech_duration || 0.3,
        rag_enabled: modelData?.rag_enabled || false,
        LLM_provider: modelData?.LLM_provider || "open ai",
        LLM_model: modelData?.LLM_model || "gpt-4o",
        stt_provider: modelData?.stt_provider || "deepgram",
        stt_model: modelData?.stt_model || "deepgram",
        first_message: found?.first_message,
        system_prompt: found?.system_prompt,
      }
    }

    let phone_number = ""

    if (type !== "Phone") {
      phone_number = `${generateRandomAlphanumeric(16)}`
    } else {
      const provider = sips?.find((d: any) => d?.phone_number === payload?.phone_number)?.provider
      phone_number = provider === "telnyx" ? payload?.phone_number?.replace("+", "") : payload?.phone_number
    }

    mutate({
      ...createData,
      agent_name: payload?.agent_name,
      phone_number,
      agent_type: type === "Phone" ? "sip" : "web"
    })
  }

  const filteredSips = isLoading ? [] : sips?.filter((l: any) => !l.mapped_agent_name)

  return (
    <Dialog open>
      <DialogContent>
        <DialogHeader className="-m-4 p-4 bg-input/40 rounded-t-2xl border-b">
          <DialogTitle className="df">
            <FaUserPlus className="text-3xl text-foreground/60" />
            {modelData ? "Update" : "Create"} Agent
          </DialogTitle>

          <DialogDescription className="text-xs">
            Here's a few templates to get you started, or you can create your own template and use it to create a new agent.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mini-scroll-bar max-h-96 pl-px pr-4 mb-2 -mr-4 overflow-y-auto">
            <div className="my-4">
              <label htmlFor="">Agent Name</label>

              <input
                type="text"
                className="py-1.5 bg-input/60"
                {...register("agent_name", {
                  required: "Agent Name is required"
                })}
              />
              {
                errors.agent_name && <p className="mt-0.5 text-xs text-red-400">{errors.agent_name.message}</p>
              }
            </div>

            <div className="mb-4">
              <label htmlFor="">Type</label>

              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="bg-input/50">
                  <SelectValue placeholder="Phone number" />
                </SelectTrigger>

                <SelectContent>
                  {
                    Types?.map(l => (
                      <SelectItem
                        key={l}
                        value={l}
                      >
                        {l}
                      </SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
            </div>

            {
              type === "Phone" &&
              <div className="mb-4">
                <label htmlFor="">Phone Number</label>

                <Controller
                  name="phone_number"
                  control={control}
                  rules={{ required: type === "Phone" ? "Phone number is required" : false }}
                  render={({ field: { value, onChange } }) => (
                    <Select value={value} onValueChange={onChange}>
                      <SelectTrigger className="bg-input/50">
                        <SelectValue placeholder="Phone number" />
                      </SelectTrigger>

                      <SelectContent>
                        {
                          !isLoading &&
                          filteredSips?.map((l: any) => (
                            <SelectItem
                              key={l?.phone_number}
                              value={l?.phone_number}
                            >
                              {l?.phone_number}
                            </SelectItem>
                          ))
                        }
                        {
                          !isLoading &&
                          filteredSips?.length === 0 &&
                          <SelectItem value="-" disabled>No Phone Numbe Available</SelectItem>
                        }
                      </SelectContent>
                    </Select>
                  )}
                />

                {
                  errors.phone_number && <p className="mt-0.5 text-xs text-red-400">{errors?.phone_number?.message}</p>
                }
              </div>
            }

            <div className="">
              <label htmlFor="">Template</label>
            </div>

            <div className="">
              {
                templates?.map(l => (
                  <div
                    key={l.id}
                    className={`mb-4 p-3 rounded-lg bg-input/60 border cursor-pointer hover:bg-input ${selected === l.id ? "border-primary/60" : ""}`}
                    onClick={() => setSelected(l.id)}
                  >
                    <div className="df mb-2">
                      <p className={`p-2 rounded ${selected === l.id ? "bg-primary/10 text-primary" : "bg-foreground/10 text-foreground/50"}`}>
                        <l.icon className="text-xl" />
                      </p>
                      <p className="text-sm font-bold">{l.name}</p>
                    </div>

                    <div className="text-xs text-foreground/60">
                      {l.prompt}
                    </div>
                  </div>
                ))
              }
            </div>
          </div>

          <div className="df justify-end">
            <button
              type="button"
              onClick={closeModel}
              disabled={isPending}
              className="px-8 py-2 rounded-md bg-input border text-foreground/60"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="px-4 py-2 bg-primary/95 text-primary-foreground border-t-2 border-white/30 rounded-md rounded-t-lg hover:bg-primary"
            >
              {modelData ? "Update" : "Create"} Agent
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateAssistant
