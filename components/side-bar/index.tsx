"use client";

import { MdOutlineDialerSip, MdOutlineCampaign, MdCallToAction } from "react-icons/md";
import { LuMaximize2, LuMinimize2 } from "react-icons/lu";
import { FaUserTie, FaPhoneAlt } from "react-icons/fa";
import { BiSolidPieChartAlt2 } from "react-icons/bi";
import { usePathname } from "next/navigation";
import { GrChannel } from "react-icons/gr";
import Link from "next/link";

import { cn } from "@/lib/utils";

import Profile from "./profile";

const list = [
  {
    id: "1",
    link: "/overview",
    title: "Overview",
    logo: <BiSolidPieChartAlt2 />,
  },
  {
    id: "2",
    link: "/assistants",
    title: "Agent",
    logo: <FaUserTie />,
  },
  {
    id: "3",
    link: "/phone-numbers",
    title: "Phone Numbers",
    logo: <FaPhoneAlt />,
  },
  {
    id: "4",
    link: "/campaign",
    title: "Campaign",
    logo: <MdOutlineCampaign />,
  },
  {
    id: "5",
    link: "/logs",
    title: "Logs",
    logo: <MdCallToAction />,
  },
  {
    id: "7",
    link: "/messaging-channels",
    title: "Messaging Channels",
    logo: <GrChannel />,
  },
  {
    id: "6",
    link: "/configurations",
    title: "SIP Configuration",
    logo: <MdOutlineDialerSip />,
  },
]

function SideBar() {
  const pathname = usePathname()

  function toggleMinimise() {
    document.querySelector(".app-container")?.classList.toggle("minimise")
  }

  return (
    <aside className="sidebar dfc gap-1.5 w-56 [.minimise_&]:w-[70px] px-4 py-4 z-[1] bg-background -translate-x-full [.open_&]:translate-x-0 md:translate-x-0 transition-all duration-300">
      {
        list.map(l => (
          <Link
            key={l.id}
            href={l.link}
            className={cn("df p-2 text-[13px] leading-none text-gray-400 rounded-lg text-nowrap overflow-hidden", {
              "font-medium outline outline-1 outline-primary/40 bg-primary/10 text-primary": pathname === l.link,
              "hover:bg-white/5 hover:outline hover:outline-1 hover:outline-white/10": pathname !== l.link,
            })}
          >
            <span className="p-1 text-sm bg-white/5 rounded">
              {l.logo}
            </span>
            {l.title}
          </Link>
        ))
      }

      <button
        className="justify-start mt-auto p-2 text-gray-400 hover:text-gray-500 text-nowrap overflow-hidden"
        onClick={toggleMinimise}
      >
        <span className="p-1 text-sm bg-white/5 rounded">
          <LuMaximize2 className="hidden [.minimise_&]:block rotate-45" />
          <LuMinimize2 className="[.minimise_&]:hidden rotate-45" />
        </span>

        <span className="text-sm hidden [.minimise_&]:block">Maximize</span>
        <span className="text-sm [.minimise_&]:hidden">Minimize</span>
      </button>

      <Profile />
    </aside>
  )
}

export default SideBar
