
type props = {
  data: any[]
  selected: string
  updateSelect: (v: string) => void
}

function AssistantsList({ selected, data, updateSelect }: props) {
  return (
    <div className="scroll-y p-4">
      {
        data?.map(item => (
          <div
            key={item?.id}
            className={`mb-2 p-2 text-xs ${selected === item?.id ? "bg-amber-300/5" : ""} rounded-md cursor-pointer`}
            onClick={() => updateSelect(item?.id)}
          >
            <h3 className="mb-0.5 font-semibold truncate">{item?.agent_name}</h3>
          </div>
        ))
      }
    </div>
  )
}

export default AssistantsList
