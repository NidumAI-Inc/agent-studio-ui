import { DataTable } from "@/components/ui/data-table";
import { zendeskColumns } from "./zendesk-colums";
import iconList from "../common/icons-list";

type CardType = {
  type: string
  list: any[]
}

function Card({ type, list }: CardType) {
  return (
    <div className="m-4 mb-8 p-4 pt-6 border rounded relative bg-background/25">
      <div className='df gap-1 px-2 py-0.5 text-xs absolute -top-4 left-4 text-foreground/70 bg-background rounded border border-border/80'>
        <span className="p-1 text-lg text-foreground bg-background-light">{iconList[type]}</span>
        {type}
      </div>

      <DataTable
        columns={zendeskColumns}
        data={list}
      />
    </div>
  )
}

export default Card
