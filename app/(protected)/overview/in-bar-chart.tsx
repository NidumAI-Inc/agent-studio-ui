import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import CardWrapper from "./card-wrapper";

type props = {
  title: string
  config: ChartConfig
  chartData: any[]
}

function InBarChart({ title, config, chartData }: props) {
  return (
    <CardWrapper title={title}>
      <ChartContainer
        config={config}
        className="mx-auto aspect-square max-h-[450px]"
      >
        <BarChart accessibilityLayer data={chartData}>
          {
            Object.keys(config)?.map(conf => (
              <Bar
                key={conf}
                dataKey={conf}
                fill={config?.[conf]?.color}
                radius={4}
              />
            ))
          }

          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="name"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />

          <ChartLegend className="mt-8" content={<ChartLegendContent />} />
        </BarChart>
      </ChartContainer>
    </CardWrapper>
  )
}

export default InBarChart
