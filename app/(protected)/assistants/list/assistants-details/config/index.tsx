"use client";

import { useMemo } from 'react';

import { useAgentById } from '@/hooks/use-agents';

import OutboundCall from './outbound-call';
import Transcriber from './transcriber';
import Model from './model';
import Voice from './voice';
import Files from './files';
import Chat from './chat';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";

type props = {
  id: string
}

function Config({ id }: props) {
  const { data } = useAgentById(id)

  const tabs = useMemo(() => {
    const type = data?.agent_type

    const final = [
      {
        value: "model",
        label: "Model",
        component: Model
      },
      {
        value: "transcriber",
        label: "Transcriber",
        component: Transcriber
      },
      {
        value: "voice",
        label: "Voice",
        component: Voice
      },
      {
        value: "files",
        label: "Files",
        component: Files
      },
      {
        value: "chat-inst",
        label: "Chat Configurations",
        component: Chat
      },
    ]

    if (type === "sip") {
      final.push({
        value: "outbound",
        label: "Outbound Call",
        component: OutboundCall
      })
    }

    return final
  }, [id, data?.agent_type])

  return (
    <div>
      <Tabs defaultValue="model">
        <div className='sticky top-0 z-[1] -mt-4 pt-4 pb-1 bg-background-light '>
          <TabsList>
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {
          tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              <tab.component id={id} />
            </TabsContent>
          ))
        }
      </Tabs>
    </div>
  )
}

export default Config
