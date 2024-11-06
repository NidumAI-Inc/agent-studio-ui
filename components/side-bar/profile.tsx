import { LuChevronsUpDown } from "react-icons/lu";
import { FaUserLarge } from "react-icons/fa6";
import { SlLogout } from "react-icons/sl";
import { useRouter } from "next/navigation";

import { useToast } from "@/hooks/use-toast";
import { signOut } from 'next-auth/react';

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

function Profile() {
  const { toast } = useToast()
  const router = useRouter()

  const logOut = async () => {
    try {
      await signOut({ callbackUrl: "/" })

    } catch (error) {
      toast({
        title: "Error on logging out"
      })
      console.log(error)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="px-2.5 [.minimise_&]:w-8 [.minimise_&]:gap-0 [.minimise_&]:ml-0.5 py-1.5 text-[13px] text-gray-400 rounded-lg bg-white/5 outline outline-1 outline-white/10 text-nowrap overflow-hidden transition-all duration-300"
      >
        <FaUserLarge className="shrink-0" />
        <span className="[.minimise_&]:w-0 text-nowrap overflow-hidden transition-all duration-300">Profile</span>
        <LuChevronsUpDown className="[.minimise_&]:hidden ml-auto" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48 text-xs text-white/70">
        <DropdownMenuItem onClick={() => router.push("/account")}>
          <FaUserLarge />
          Profile
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logOut}>
          <SlLogout />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Profile
