import { FaUserCog } from "react-icons/fa";
import CreateAssistantBtn from "./create-assistant-btn";

function Empty() {
  return (
    <section className="main-container dc flex-col">
      <div className="max-w-xs">
        <div className="mb-4 text-sm text-foreground/60">
          <FaUserCog className="size-24 text-foreground/30" />
          <h2 className="text-xl font-semibold text-white">Agents</h2>
          <p className="mb-2 leading-6">Agents are voice AI chat bots used for integrations into your applications.</p>
          <p className="leading-6">You can fully configure them to your businesses needs, and we support all major models and providers.</p>
        </div>

        <div className="df">
          <CreateAssistantBtn />
        </div>
      </div>
    </section>
  )
}

export default Empty
