
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import CardWrapper from "./card-wrapper";

type props = {
  data: any
}

function AssisstantPerformance({ data }: props) {
  return (
    <CardWrapper title="Agents Performance" className="mb-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Agent Name</TableHead>
            <TableHead>Call Count</TableHead>
            <TableHead>Avg. Duration (min)</TableHead>
            <TableHead>Total Cost ($)</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data?.assistants_table?.map((assistant: any) => (
            <TableRow key={assistant?.assistant_name}>
              <TableCell>{assistant?.assistant_name}</TableCell>
              <TableCell>{assistant?.conversation_count}</TableCell>
              <TableCell>{assistant?.avg_duration.toFixed(2)}</TableCell>
              <TableCell>{data?.cost_breakdown_by_agent[assistant?.assistant_name].toFixed(6)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardWrapper>
  )
}

export default AssisstantPerformance
