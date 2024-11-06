import { TbListDetails } from "react-icons/tb";

import { cn } from "@/lib/utils";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import MarkdownParse from "@/components/mark-down-preview";

type props = {
  conversation_analysis: string
  messages: {
    role: string;
    content: string;
  }[]
}

function Messages({ messages, conversation_analysis }: props) {
  return (
    <Sheet>
      <SheetTrigger>
        <TbListDetails className=" text-foreground/60" />
      </SheetTrigger>

      <SheetContent>
        <SheetHeader className="-mt-2 mb-2 border-b">
          <SheetTitle className="df pb-1 text-lg">
            <span className="p-2 text-base bg-background-light text-foreground/50 rounded-sm"><TbListDetails /></span>
            Call Log Details
          </SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>

        <Tabs defaultValue="Transcriptions">
          <TabsList>
            <TabsTrigger value="Transcriptions">Transcriptions</TabsTrigger>
            <TabsTrigger value="conversation_analysis">Conversation Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="Transcriptions" className="mini-scroll-bar h-[calc(100vh-8.5rem)] -mr-5 pr-5 overflow-y-auto">
            {
              messages?.map((m, i) => {
                return (
                  <div key={i} className="mb-4">
                    <div className={cn("max-w-[80%] px-4 py-2 text-xs rounded-3xl", {
                      "bg-background-light rounded-tl-none": m.role === "assistant",
                      "ml-auto rounded-br-none border": m.role === "user",
                    })}>
                      {m.content}
                    </div>
                  </div>
                )
              })
            }
          </TabsContent>

          <TabsContent value="conversation_analysis" className="mini-scroll-bar h-[calc(100vh-8.5rem)] -mr-5 pr-5 overflow-y-auto">
            <MarkdownParse
              response={conversation_analysis}
            />
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  )
}

export default Messages