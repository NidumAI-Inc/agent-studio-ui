"use client";

import { MdContentCopy, MdCheck, MdOutlineDeleteOutline, MdEdit } from 'react-icons/md';
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiViewList } from "react-icons/ci";
import { useRouter } from 'next/navigation';
import { FaPhone } from "react-icons/fa6";

import { getThirdPartyApiDetails } from '@/actions';
import useClipboardCopy from '@/hooks/use-clipboard-copy';
import { useAgentById } from '@/hooks/use-agents';
import { plusNumber } from '@/utils/phone-number-manup';
import useModelStore from '@/store/model';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/hooks/use-user';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const menulist = [
  {
    name: "Logs",
    icon: <CiViewList />,
  },
  {
    name: "Edit",
    icon: <MdEdit />,
  },
  {
    name: "Delete",
    icon: <MdOutlineDeleteOutline />,
  },
]

type props = {
  id: string
}

type props2 = {
  label: string
  text: string
}

function InputCopy({ text, label }: props2) {
  const { copied, onCopyClk, selectTextRef, onTextClk } = useClipboardCopy()

  return (
    <div>
      <label htmlFor="" className='text-xs text-foreground/50'>{label}</label>
      <div className='relative overflow-hidden'>
        <input
          value={text}
          ref={selectTextRef}
          onClick={onTextClk}
          onChange={() => { }}
          className='md:min-w-60 text-foreground/60 bg-input/70 border border-border focus:ring-none focus-visible:ring-none focus-within:ring-none'
        />
        <span className='absolute inset-px bg-gradient-to-r from-background-light/10 via-background-light/70 to-background-light select-none pointer-events-none rounded'></span>

        <button
          onClick={() => onCopyClk(text)}
          className='p-1.5 absolute right-1.5 bottom-1.5 bg-input/60 rounded text-foreground/60 hover:bg-input'
        >
          {copied ? <MdCheck /> : <MdContentCopy />}
        </button>
      </div>
    </div>
  )
}

function Header({ id }: props) {
  const updateModel = useModelStore(s => s.updateModel)
  const router = useRouter()

  const { data: current } = useAgentById(id)
  const { userId } = useUser()
  const { toast } = useToast()

  function onClk(val: string) {
    if (val === "Edit") {
      updateModel("assisstant", current)
    } else if (val === "Delete") {
      deleteAgent()
    } else if (val === "Logs") {
      router.push("/logs")
    }
  }

  async function deleteAgent() {
    try {
      const data = await getThirdPartyApiDetails(id)

      if (data) {
        toast({
          title: `Agent is mapped with ${data?.name} channel`,
          description: "Please delete the channel to proceed"
        })
      } else {
        updateModel("delete-assisstant", current)
      }

    } catch (error) {
      console.log(error)
    }
  }

  function getLink() {
    const query = `agent=${current?.agent_name}&phone=${current?.phone_number?.replace("+", "")}&id=${userId}_${id}`
    return `${window?.location?.origin}/bot-playground?${query}`
    // const callLinkToOpen = `/playground?${query}`
  }

  const linkToOpen = getLink()

  return (
    <div className="df justify-between items-start flex-wrap my-4">
      <div>
        <h1 className="mb-2 text-xl font-bold">{current?.agent_name || ""}</h1>

        <div className='df flex-wrap gap-4'>
          <InputCopy label="Agent URL" text={linkToOpen} />

          {
            current?.agent_type === "sip" &&
            <InputCopy label="Phone Number" text={plusNumber(current?.phone_number)} />
          }
        </div>
      </div>

      <div className='df'>
        <button
          className='px-4 py-2 font-semibold bg-primary text-primary-foreground hover:bg-primary/90'
          onClick={() => window.open(linkToOpen, "_blank")}
        >
          <FaPhone className='text-primary-foreground/60' />
          Talk with Agent
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger className='p-2 border bg-input focus-visible:outline-none'>
            <BsThreeDotsVertical className='text-xl text-foreground/60' />
          </DropdownMenuTrigger>

          <DropdownMenuContent align='end' className='bg-input'>
            {
              menulist.map(item => (
                <DropdownMenuItem
                  key={item.name}
                  className='text-foreground/50 focus:bg-background/30 focus:text-foreground'
                  onClick={() => onClk(item.name)}
                >
                  {item.icon}
                  {item.name}
                </DropdownMenuItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default Header
