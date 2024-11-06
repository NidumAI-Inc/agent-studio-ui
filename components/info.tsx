import { BiInfoCircle } from "react-icons/bi";

import {
  Tooltip,
  TooltipPortal,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type InfoProps = {
  description: string;
}

function Info({ description }: InfoProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="p-0">
          <BiInfoCircle />
        </TooltipTrigger>

        <TooltipPortal>
          <TooltipContent className="max-w-[300px]">
            {description}
          </TooltipContent>
        </TooltipPortal>
      </Tooltip>
    </TooltipProvider>
  )
}

export default Info
