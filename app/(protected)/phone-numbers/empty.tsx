import { CiMobile1 } from "react-icons/ci";

import ImportPhoneBtn from "./import-phone-btn";

function Empty() {
  return (
    <section className="main-container dc flex-col">
      <div className="max-w-xs">
        <div className="mb-4 text-sm text-foreground/60">
          <CiMobile1 className="size-24 -ml-5 text-foreground/30" />
          <h2 className="text-xl font-semibold text-white">Phone Numbers</h2>
          <p className="mb-2 leading-6">You will be able to import purchased phone numbers from Telynx here.</p>
        </div>

        <div className="df">
          <ImportPhoneBtn />
        </div>
      </div>
    </section>
  )
}

export default Empty
