
import { modelProviders, models } from "./data";
import useUpdate from "./use-update";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Info from "@/components/info";
import Card from "./card";

type props = {
  id: string
}

function Model({ id }: props) {
  const { details, onChange, onSelect } = useUpdate(id)

  return (
    <Card title="Model" description="LLM Configurations">
      <div className="grid @xl:grid-cols-3 gap-4 p-3.5 bg-background-light rounded-xl border">
        <div className="@xl:col-span-2">
          <div className="mb-4">
            <label className="df mb-2 text-foreground/60">
              <span>First Message</span>
              <Info description="The first message that the agent will say. This can also be a URL to a containerized audio file (mp3, wav, etc.)." />
            </label>

            <input
              type="text"
              className="bg-input/60"
              value={details?.first_message}
              onChange={e => onChange("first_message", e.target.value)}
              onBlur={e => onSelect("first_message", e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="df mb-2 text-foreground/60">
              <span>System Prompt</span>
              <Info description="The system prompt can be used to configure the context, role, personality, instructions and so on for the agent." />
            </label>

            <textarea
              className="h-80 bg-input/60"
              value={details?.system_prompt}
              onChange={e => onChange("system_prompt", e.target.value)}
              onBlur={e => onSelect("system_prompt", e.target.value)}
            />
          </div>
        </div>

        <div>
          <div className="mb-4">
            <label className="df mb-2 text-foreground/60">
              <span>Provider</span>
            </label>

            <Select
              value={details?.LLM_provider}
              onValueChange={val => onSelect("LLM_provider", val)}
            >
              <SelectTrigger className="bg-input/60">
                <SelectValue placeholder="" />
              </SelectTrigger>

              <SelectContent>
                {
                  modelProviders?.map(p => (
                    <SelectItem value={p.val} key={p.val}>
                      {p.name}
                    </SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
          </div>

          <div className="mb-4">
            <label className="df mb-2 text-foreground/60">
              <span>Model</span>
            </label>

            <Select
              value={details?.LLM_model}
              onValueChange={val => onSelect("LLM_model", val)}
            >
              <SelectTrigger className="bg-input/60">
                <SelectValue placeholder="" />
              </SelectTrigger>

              <SelectContent>
                {
                  models?.map(p => (
                    <SelectItem value={p.val} key={p.val}>
                      {p.name}
                    </SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
          </div>

          <div className="mb-4">
            <label className="df mb-2 text-foreground/60">
              <span>Temperature</span>
              <Info description="The temperature is used to control the randomness of the output. When you set it higher, you'll get more random outputs. When you set it lower, towards 0, the values are more deterministic." />
            </label>

            <input
              min={0}
              max={1}
              step={0.1}
              type="number"
              className="no-number-arrows bg-input/60"
              value={details?.temperature}
              onChange={e => onChange("temperature", e.target.value)}
              onBlur={e => onSelect("temperature", e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="df mb-2 text-foreground/60">
              <span>Max Tokens</span>
              <Info description="This is the max number of tokens that the agent will be allowed to generate in each turn of the conversation." />
            </label>

            <input
              min={0}
              step={1}
              type="number"
              className="no-number-arrows bg-input/60"
              value={details?.max_tokens}
              onChange={e => onChange("max_tokens", e.target.value)}
              onBlur={e => onSelect("max_tokens", e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="df mb-2 text-foreground/60">
              <span>Speech Speed</span>
              <Info description="This feature allows you to control the speed of speech playback." />
            </label>

            <input
              min={1}
              max={2}
              step={0.1}
              type="number"
              className="no-number-arrows bg-input/60"
              value={details?.tts_speed}
              onChange={e => onChange("tts_speed", e.target.value)}
              onBlur={e => onSelect("tts_speed", e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="df mb-2 text-foreground/60">
              <span>Interrupt Speech Duration</span>
              <Info description="This feature defines the duration for interrupting or pausing speech during playback." />
            </label>

            <input
              min={0.1}
              max={1}
              step={0.1}
              type="number"
              className="no-number-arrows bg-input/60"
              value={details?.interrupt_speech_duration}
              onChange={e => onChange("interrupt_speech_duration", e.target.value)}
              onBlur={e => onSelect("interrupt_speech_duration", e.target.value)}
            />
          </div>
        </div>
      </div>
    </Card>
  )
}

export default Model
