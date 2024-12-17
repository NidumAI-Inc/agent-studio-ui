
import { voiceProviders, voiceList } from "../data";
import useUpdate from "../use-update";
import config from "@/lib/config";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Card from "../card";

type props = {
  id: string
}

function Config({ id }: props) {
  const { details, onSelect } = useUpdate(id)

  return (
    <Card title="Voice Configuration" description={`Choose from the list of voices available from ${config.companyName} server.`}>
      <div className="p-3.5 bg-background-light rounded-xl border">
        <div className="grid @lg:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="df mb-2 text-foreground/60">
              <span>Provider</span>
            </label>

            <Select
              value={details?.TTS_provider}
              onValueChange={val => onSelect("TTS_provider", val)}
            >
              <SelectTrigger className="bg-input/60">
                <SelectValue placeholder="" />
              </SelectTrigger>

              <SelectContent>
                {
                  voiceProviders?.map(p => (
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
              <span>Voice</span>
            </label>

            <Select
              value={details?.voice}
              onValueChange={val => onSelect("voice", val)}
            >
              <SelectTrigger className="bg-input/60">
                <SelectValue placeholder="" />
              </SelectTrigger>

              <SelectContent>
                {
                  voiceList?.map(p => (
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

export default Config
