import { Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  // ChartLegend,
  // ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import CardWrapper from "./card-wrapper";

type props = {
  title: string
  config: ChartConfig
  chartData: any[]
}

function InPieChart({ title, config, chartData }: props) {
  return (
    <CardWrapper title={title}>
      <div className="grid grid-cols-3 gap-4">
        <div>
          {
            chartData?.map(ch => (
              <div className="df mb-2" key={ch?.name}>
                <span className="size-4 shrink-0 rounded" style={{ background: config[ch?.name]?.color }}></span>
                <p className="text-sm capitalize text-foreground/70">{ch?.label || ch?.name}</p>
                <p className=" ml-auto">{ch?.value}</p>
              </div>
            ))
          }
        </div>

        <ChartContainer
          config={config}
          className="col-span-2"
        >
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />

            {/* <ChartLegend className="mt-8" content={<ChartLegendContent />} /> */}
          </PieChart>
        </ChartContainer>
      </div>
    </CardWrapper>
  )
}


export default InPieChart
