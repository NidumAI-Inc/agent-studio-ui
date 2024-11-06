
import { engLangs, modelProviders } from "./data";
import useUpdate from "./use-update";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Card from "./card";

type props = {
  id: string
}

function Transcriber({ id }: props) {
  const { details, onSelect } = useUpdate(id)

  return (
    <Card title="Transcription" description="This section allows you to configure the transcription settings for the agent.">
      <div className=" p-3.5 bg-background-light rounded-xl border">
        <div className="grid @lg:grid-cols-2 gap-4">
          <div>
            <label className="df mb-2 text-foreground/60">
              <span>Provider</span>
            </label>

            <Select
              value={details?.stt_provider}
              onValueChange={val => onSelect("stt_provider", val)}
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

          <div>
            <label className="df mb-2 text-foreground/60">
              <span>Language</span>
            </label>

            <Select
              value={details?.language}
              onValueChange={val => onSelect("language", val)}
            >
              <SelectTrigger className="bg-input/60">
                <SelectValue placeholder="" />
              </SelectTrigger>

              <SelectContent className="max-h-72">
                {
                  engLangs.map(p => (
                    <SelectItem value={p.val} key={p.val}>
                      {p.name}
                    </SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default Transcriber
