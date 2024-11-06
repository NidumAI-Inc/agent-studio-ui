import { useEffect, useState } from "react";

import { useAgentById, useUpdateAgent } from "@/hooks/use-agents";

function useUpdate(id: string) {
  const { mutate } = useUpdateAgent(id)
  const { data } = useAgentById(id)

  const [details, setDetails] = useState({
    LLM_provider: "",
    LLM_model: "",
    temperature: "",
    max_tokens: "",
    first_message: "",
    system_prompt: "",
    tts_speed: "",
    interrupt_speech_duration: "",

    stt_provider: "",
    stt_model: "",
    language: "",

    TTS_provider: "",
    voice: "",

    background_noise: "",

    rag_enabled: false,
  })

  useEffect(() => {
    if (data) {
      setDetails({ ...data })
    }
  }, [id, data])

  const onChange = (key: keyof typeof details, val: string | number | boolean) => {
    setDetails(p => ({
      ...p,
      [key]: val
    }))
  }

  function onSelect(key: keyof typeof details, val: string | number | boolean) {
    setDetails(p => ({
      ...p,
      [key]: val
    }))
    mutate({ [key]: val })
  }

  return {
    details,
    onChange,
    onSelect,
  }
}

export default useUpdate
