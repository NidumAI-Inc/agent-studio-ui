import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import BotCustomisation from "./bot-customisation";
import DataCollections from "./data-collections";
import Instructions from "./instructions";

type props = {
  id: string
}

function ChatInstructions({ id }: props) {
  return (
    <Accordion
      type="single"
      collapsible
    >
      <AccordionItem value="item-1" className="my-4 p-4 rounded-xl border bg-background/30 @container">
        <AccordionTrigger className="p-0 text-lg font-medium">Chat Integration</AccordionTrigger>
        <AccordionContent className="pt-4">
          <Instructions id={id} />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2" className="my-4 p-4 rounded-xl border bg-background/30 @container">
        <AccordionTrigger className="p-0 text-lg font-medium">Data Collections</AccordionTrigger>
        <AccordionContent>
          <DataCollections id={id} />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3" className="my-4 p-4 rounded-xl border bg-background/30 @container">
        <AccordionTrigger className="p-0 text-lg font-medium">Bot Customisation</AccordionTrigger>
        <AccordionContent className="pt-4">
          <BotCustomisation id={id} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default ChatInstructions
