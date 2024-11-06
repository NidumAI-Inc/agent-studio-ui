"use client";

import { TiDownload } from "react-icons/ti";

import useModelStore from "@/store/model";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";

// import Twilio from "./twilio";
import Telynx from "./telynx";

function ImportNumbers() {
  const modelData = useModelStore(s => s.data)

  return (
    <Dialog open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="df pb-4 px-4 -mx-4 text-lg font-bold border-b">
            <TiDownload className="text-foreground/50" />
            {modelData ? "Update" : "Import"} Phone Number
          </DialogTitle>
        </DialogHeader>

        <Tabs
          className="[&_input]:bg-input/40"
          defaultValue={modelData?.provider || "telnyx"}
        >
          <TabsList
            className={`hidden w-full h-11 gap-2 bg-background/90 rounded-lg border ${modelData ? "hidden" : ""}`}
          >
            {/* <TabsTrigger className="w-full py-1.5 font-semibold rounded-md border border-transparent data-[state=active]:border-border data-[state=active]:text-primary/90 data-[state=active]:bg-background-light hover:bg-background-light" value="twilio">Twilio</TabsTrigger> */}
            <TabsTrigger className="w-full py-1.5 font-semibold rounded-md border border-transparent data-[state=active]:border-border data-[state=active]:text-primary/90 data-[state=active]:bg-background-light hover:bg-background-light" value="telnyx">Telnyx</TabsTrigger>
          </TabsList>

          {/* <TabsContent value="twilio">
            <Twilio />
          </TabsContent> */}

          <TabsContent value="telnyx">
            <Telynx />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

export default ImportNumbers
