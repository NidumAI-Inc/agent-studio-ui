import { MdOutlineCampaign } from "react-icons/md";
import CampaignBtn from "./campaign-btn";

function Empty() {
  return (
    <section className="main-container dc flex-col">
      <div className="max-w-xs">
        <div className="mb-4 text-sm text-foreground/60">
          <MdOutlineCampaign className="size-24 -ml-3 text-foreground/30" />
          <h2 className="text-xl font-semibold text-white">Campaign</h2>
          <p className="leading-6">You will be able to create campaigns using phone numbers imported from Telnyx.</p>
        </div>

        <div className="df">
          <CampaignBtn />
        </div>
      </div>
    </section>
  )
}

export default Empty
