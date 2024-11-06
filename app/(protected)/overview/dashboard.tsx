
import { typeT, useOverview } from "@/hooks/use-overview";

import AssisstantPerformance from "./assisstant-performance";
import InBarChart from "./in-bar-chart";
import InPieChart from "./in-pie-chart";
import StatCard, { StatCardWrapper } from "./status-card";
import { Skeleton } from "@/components/ui/skeleton";

type props = {
  selected: typeT
}

function Dashboard({ selected }: props) {
  const { data, isLoading } = useOverview(selected)

  if (isLoading) return (
    <div className="p-6 @container">
      <div className="mb-6 grid @container @md:grid-cols-2 @2xl:grid-cols-4 gap-4">
        <Skeleton className="h-40" />
        <Skeleton className="h-40" />
        <Skeleton className="h-40" />
        <Skeleton className="h-40" />
      </div>

      <div className="grid @2xl:grid-cols-2 gap-4 mb-6">
        <Skeleton className="h-80" />
        <Skeleton className="h-80" />
      </div>

      <div className="grid @2xl:grid-cols-2 gap-4 mb-6">
        <Skeleton className="h-80" />
        <Skeleton className="h-80" />
      </div>
    </div>
  )

  if (!data) return null

  return (
    <div className="p-6 @container">
      <div className="mb-6 grid @container @md:grid-cols-2 @2xl:grid-cols-4 gap-4">
        <StatCardWrapper title="Total Conversations">
          <div className="df items-end mb-1">
            <div className="text-2xl font-bold leading-6">{data?.total_conversations}</div>
            <div className="text-xs font-normal">
              {data?.number_of_calls} Calls | {data?.number_of_chats} Chats
            </div>
          </div>
        </StatCardWrapper>

        <StatCard
          title="Total Call Minutes"
          value={`${data?.total_conversation_minutes?.toFixed(2)} min`}
        // change={data?.percentage_changes?.total_conversation_minutes}
        />
        <StatCard
          title="Total Spent"
          value={`${data?.total_spent?.toFixed(5)} $`}
        // change={data?.percentage_changes?.total_spent}
        />
        <StatCard
          title="Avg. Cost per Call"
          value={`${data?.average_cost_per_conversation?.toFixed(5)} $`}
        // change={data?.percentage_changes?.average_cost_per_conversation}
        />
      </div>

      <AssisstantPerformance data={data} />

      <div className="grid @2xl:grid-cols-2 gap-4 mb-6">
        <InPieChart
          title="Conversations"
          config={{
            number_of_calls: {
              label: "No. of Calls",
              color: "hsl(var(--chart-1))",
            },
            number_of_chats: {
              label: "No of Chats",
              color: "hsl(var(--chart-2))",
            },
          }}
          chartData={[
            { label: "No. of Calls", name: "number_of_calls", value: data?.number_of_calls, fill: "var(--color-number_of_calls)" },
            { label: "No. of Chats", name: "number_of_chats", value: data?.number_of_chats, fill: "var(--color-number_of_chats)" },
          ]}
        />

        <InPieChart
          title="Total Tokens Used"
          config={{
            LLM: {
              label: "LLM",
              color: "hsl(var(--chart-5))",
            },
            STT: {
              label: "STT",
              color: "hsl(var(--chart-4))",
            },
            TTS: {
              label: "TTS",
              color: "hsl(var(--chart-1))",
            },
          }}
          chartData={[
            { name: "LLM", value: data?.total_tokens_used?.total_tokens_llm, fill: "var(--color-LLM)" },
            { name: "STT", value: data?.total_tokens_used?.total_tokens_stt, fill: "var(--color-STT)" },
            { name: "TTS", value: data?.total_tokens_used?.total_tokens_tts, fill: "var(--color-TTS)" },
          ]}
        />
      </div>

      <div className="grid @2xl:grid-cols-2 gap-4 mb-6">
        <InBarChart
          title="Agent Performance"
          config={{
            duration: {
              label: "Duration",
              color: "hsl(var(--chart-1))",
            },
            calls: {
              label: "No. of calls",
              color: "hsl(var(--chart-2))",
            },
            cost: {
              label: "Cost",
              color: "hsl(var(--chart-3))",
            },
          }}
          chartData={
            data?.average_call_duration_by_assistant ?
              Object?.keys(data?.average_call_duration_by_assistant)
                ?.map(key => ({
                  name: key,
                  duration: data?.average_call_duration_by_assistant?.[key],
                  calls: data?.total_conversations_per_agent?.[key],
                  cost: data?.cost_breakdown_by_agent?.[key],
                }))
              : []
          }
        />

        <InBarChart
          title="Call Breakdown by Category"
          config={{
            duration: {
              label: "Duration",
              color: "hsl(var(--chart-2))",
            },
            calls: {
              label: "No. of calls",
              color: "hsl(var(--chart-3))",
            },
            cost: {
              label: "Cost",
              color: "hsl(var(--chart-1))",
            },
            avg: {
              label: "Average duration",
              color: "hsl(var(--chart-5))",
            },
          }}
          chartData={
            ["web", "sip"]
              ?.map(key => ({
                name: key,
                duration: data?.call_breakdown_by_category?.call_durations?.[key],
                calls: data?.call_breakdown_by_category?.call_counts?.[key],
                cost: data?.call_breakdown_by_category?.total_spent?.[key],
                avg: data?.average_call_duration_per_category?.[key],
              }))
          }
        />
      </div>
    </div>
  )
}

export default Dashboard
