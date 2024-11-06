import { MdOutlineDialerSip } from "react-icons/md";

function Page() {
  return (
    <section className="main-container mini-scroll-bar">
      <header className="df px-6 py-4 text-lg font-medium sticky top-0 backdrop-blur-lg border-b rounded-t-3xl z-[1]">
        <span className="p-1 bg-white/5 rounded"><MdOutlineDialerSip className="text-2xl opacity-50" /></span>
        SIP Trunk Setup Guide
      </header>

      <div className="m-4 p-4 text-sm text-foreground/60 bg-background/80 rounded-xl">
        <h2 className="text-lg font-semibold text-foreground/80">Telnyx SIP Trunk Setup Guide</h2>
        <ol className="list-decimal list-inside pl-4">
          <li className="mb-2">
            <strong className="text-foreground/80">Step 1: Buy a Phone Number</strong>
            <p className="pl-4">Purchase a phone number from Telnyx. Example: The guide assumes you have bought the number +1234567890.</p>
          </li>
          <li className="mb-2">
            <strong className="text-foreground/80">Step 2: Follow the SIP Quickstart Guide</strong>
            <p className="pl-4">Telnyx provides a step-by-step <a href="https://developers.telnyx.com/docs/voice/sip-trunking/quickstart" className="text-blue-300 hover:text-blue-500">SIP Quickstart tutorial</a>.</p>
          </li>
          <li className="mb-2">
            <strong className="text-foreground/80">Step 3: Configure Inbound Calling</strong>
            <ol className="list-decimal list-inside pl-4">
              <li>Choose FQDN Authentication: Use <i>FQDN Authentication</i> with the following FQDN: <strong>216.48.180.192:5060</strong>.</li>
              <li>Enter the SIP URI: Use the SIP URI you have for your system.</li>
            </ol>
          </li>
          <li className="mb-2">
            <strong className="text-foreground/80">Step 4: Configure Outbound Calling</strong>
            <ol className="list-decimal list-inside pl-4">
              <li>Select the SIP Signaling Address: Choose a <a href="https://sip.telnyx.com/#signaling-addresses" className="text-blue-300 hover:text-blue-500">SIP Signaling Address</a>.</li>
              <li>Configure Credentials Authentication: Create and manage a username and password.</li>
            </ol>
          </li>
          <li className="mb-2">
            <strong className="text-foreground/80">Step 5: Assign the Purchased Number to the SIP Trunk</strong>
            <p className="pl-4">In the Telnyx portal, go to the <i>Numbers</i> tab and assign the phone number.</p>
          </li>
        </ol>
      </div>

      {/* <>
        <h2 className="text-lg font-semibold text-foreground/80">Twilio SIP Trunk Setup Guide</h2>
        <ol className="list-decimal list-inside pl-4">
          <li className="mb-2">
            <strong className="text-foreground/80">Step 1: Buy a Phone Number</strong>
            <p className="pl-4">Purchase a phone number from Twilio that will be used for the SIP trunk. Example: The guide will assume the number is +1234567890.</p>
          </li>
          <li className="mb-2">
            <strong className="text-foreground/80">Step 2: Create a SIP Trunk</strong>
            <p className="pl-4">Go to the Twilio Console and create a new SIP Trunk. Follow Twilio's <a href="https://www.twilio.com/docs/sip-trunking#create-a-trunk" className="text-blue-300 hover:text-blue-500">SIP Trunking documentation</a> for detailed instructions.</p>
          </li>
          <li className="mb-2">
            <strong className="text-foreground/80">Step 3: Configure Inbound Calling (Origination)</strong>
            <p className="pl-4">In the SIP Trunk's Origination section, configure the <i>Origination SIP URI</i>. Set the URI to: <code>sip:&lt;your SIP URI&gt;;transport=tcp</code>.</p>
          </li>
          <li className="mb-2">
            <strong className="text-foreground/80">Step 4: Configure Outbound Calling (Termination)</strong>
            <ol className="list-decimal list-inside pl-4">
              <li>Copy Termination URI: Follow Twilio's <a href="https://www.twilio.com/docs/sip-trunking#termination-uri" className="text-blue-300 hover:text-blue-500">Termination URI guide</a>.</li>
              <li>Configure Authentication: Create a new <i>Credential List</i> for authentication.</li>
              <li>Set the Accepted IP Range: Define the accepted IP range.</li>
            </ol>
          </li>
        </ol>
      </> */}
    </section>
  );
};

export default Page;