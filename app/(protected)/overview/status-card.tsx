import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type props = {
  title: string
  value: number | string
  change?: number
}

type props1 = {
  title: string
  children: ReactNode
}

export function StatCardWrapper({ title, children }: props1) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>

      <CardContent>
        {children}
      </CardContent>
    </Card>
  )
}

function StatCard({ title = "", value = 0 }: props) {
  return (
    <StatCardWrapper title={title}>
      <div className="mb-1 text-2xl font-bold">{value}</div>
      {/* <p className={`text-xs ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
        </p> */}
    </StatCardWrapper>
  )
}

export default StatCard
