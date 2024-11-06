
import { backgroundNoises } from "../data";
import useUpdate from "../use-update";

import Info from "@/components/info";
import Card from "../card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type props = {
  id: string
}

function AdditionalConfig({ id }: props) {
  const { details, onSelect } = useUpdate(id)

  return (
    <Card title="Additional Configuration" description="Configure additional settings for the voice of your agent.">
      <div className="bg-background-light rounded-xl border">
        <div className="grid @lg:grid-cols-2 gap-4 p-3.5">
          <div className="">
            <label className="df mb-2 text-foreground/60">
              <span>Background Sound</span>
              <Info description="This is the background sound in the call. Default for phone calls is 'office' and default for web calls is 'off'." />
            </label>

            <Select
              value={details?.background_noise}
              onValueChange={val => onSelect("background_noise", val)}
            >
              <SelectTrigger className="bg-input/60">
                <SelectValue placeholder="" />
              </SelectTrigger>

              <SelectContent>
                {
                  backgroundNoises?.map(noise => (
                    <SelectItem value={noise} key={noise}>{noise}</SelectItem>
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

export default AdditionalConfig
