import { useEffect } from 'react';
import { MdOutlineDeleteOutline, MdEdit } from 'react-icons/md';
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosAddCircle } from "react-icons/io";
import { TfiImport } from "react-icons/tfi";

import { useCampaignDetails, useCampaignStatus } from '@/hooks/use-campaign';
import useModelStore from '@/store/model';
import { cn } from '@/lib/utils';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from '@/components/ui/skeleton';

import DeleteCampaign from './delete-campaign';
import StartCampaign from './start-campaign';
import AddMembers from './add-members';
import ImportCSV from './import-csv';
import NumberBox from './number-box';

const menulist = [
  {
    name: "Edit Configurations",
    icon: <MdEdit />,
  },
  {
    name: "Delete Campaign",
    icon: <MdOutlineDeleteOutline />,
  },
  {
    name: "Add New Members",
    icon: <IoIosAddCircle />,
  },
  {
    name: "Import from CSV",
    icon: <TfiImport />,
  },
]

type props = {
  data: {
    campaign_id: string
    campaign_name: string
    agent_phone_number: string
  }
}

function Details({ data }: props) {
  const updateModel = useModelStore(s => s.updateModel)
  const open = useModelStore(s => s.open)

  const { data: campaignStatus, isLoading: isLoading1, refetch } = useCampaignStatus(data?.campaign_id)
  const { data: campaignDetails, isLoading } = useCampaignDetails(data?.campaign_id)

  useEffect(() => {
    let timer = null
    if (campaignStatus === "running") {
      timer = setTimeout(() => {
        refetch()
      }, 5000)
    }

    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [campaignStatus])

  function onClkToImportCSV() {
    document.getElementById("import-csv")?.click()
  }

  function onClk(val: string) {
    if (val === "Edit Configurations") {
      updateModel("campaign", data)
    } else if (val === "Delete Campaign") {
      updateModel("delete-campaign", { campaign_id: data?.campaign_id })
    } else if (val === "Add New Members") {
      updateModel("add-members", { campaign_id: data?.campaign_id })
    } else if (val === "Import from CSV") {
      onClkToImportCSV()
    }
  }

  return (
    <div className="p-4 md:overflow-y-auto relative">
      <div className="df gap-4 flex-wrap">
        <div className='mr-auto'>
          <h1 className="text-xl font-bold">{data?.campaign_name}</h1>
          <p className="text-sm text-foreground/70">
            Mapped agent phone number : {data?.agent_phone_number}
          </p>
        </div>

        <div>
          <div className='df'>
            {
              campaignStatus !== "running" &&
              <button
                className='px-4 py-2 font-semibold bg-primary text-primary-foreground hover:bg-primary/90'
                onClick={() => updateModel("start-campaign", { campaign_id: data?.campaign_id })}
              >
                {campaignStatus === "failed" ? "Retry" : "Start"} Campaign
              </button>
            }

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

          {
            !["created"].includes(campaignStatus) && !isLoading1 &&
            <div className='df w-fit mt-1 text-xs px-1.5 py-0.5 bg-background/50 border rounded'>
              <p className='text-foreground/80'>Status : </p>
              <p className={cn('capitalize', {
                "text-amber-400": campaignStatus === "running",
                "text-green-400": campaignStatus === "completed",
                "text-red-400": campaignStatus === "failed",
              })}>
                {campaignStatus}
              </p>
            </div>
          }
        </div>
      </div>

      {
        (isLoading || isLoading1) &&
        <Skeleton className='h-[450px] mt-6' />
      }
      {
        !isLoading && !isLoading1 && campaignDetails?.phone_numbers?.length === 0 &&
        <div className="grid justify-center items-center h-[450px]">
          <div>
            <div className="mb-4 text-sm text-foreground/60">
              Upload your CSV file for bulk data import or <br /> manually enter information
            </div>

            <div className="df gap-4">
              <button
                className="px-4 py-2 text-sm font-semibold bg-primary/95 text-primary-foreground border-t-[3px] border-white/30 rounded-md rounded-t-lg hover:bg-primary"
                onClick={() => updateModel("add-members", { campaign_id: data?.campaign_id })}
              >
                Add manually <IoIosAddCircle className="opacity-50" />
              </button>

              <button
                className="px-4 py-2 text-sm font-semibold bg-primary/95 text-primary-foreground border-t-[3px] border-white/30 rounded-md rounded-t-lg hover:bg-primary"
                onClick={onClkToImportCSV}
              >
                Import csv <TfiImport />
              </button>
            </div>
          </div>
        </div>
      }

      {
        !isLoading && !isLoading1 && campaignDetails?.phone_numbers?.length > 0 &&
        <div className='p-8 max-w-lg bg-background/60 mt-6 rounded-2xl border'>
          {
            campaignDetails?.phone_numbers?.map((num: string) => (
              <NumberBox
                key={num}
                campaign_id={data?.campaign_id}
                phone_number={num}
              />
            ))
          }
        </div>
      }

      {
        open === "add-members" &&
        <AddMembers />
      }

      {
        open === "delete-campaign" &&
        <DeleteCampaign />
      }

      {
        open === "start-campaign" &&
        <StartCampaign />
      }

      <ImportCSV
        campaign_id={data?.campaign_id}
      />
    </div>
  )
}

export default Details
