import { createContext, useState, useCallback, useContext, ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import endPoints from "@/utils/end-points";

type ConnectionData = {
  shouldConnect: boolean
  wsUrl: string
  token: string
  connect: () => Promise<void>
  disconnect: () => void
}

const ConnectionContext = createContext<ConnectionData | undefined>(undefined)

type detailsT = {
  wsUrl: string
  token: string
  shouldConnect: boolean
}

type props = {
  children: ReactNode
}

export const ConnectionProvider = ({ children }: props) => {
  const searchParams = useSearchParams()

  const [connectionDetails, setConnectionDetails] = useState<detailsT>({
    wsUrl: "",
    token: "",
    shouldConnect: false,
  })

  const connect = useCallback(async () => {
    const url = process.env.NEXT_PUBLIC_LIVEKIT_URL || ""
    const { accessToken } = await fetch(
      `${endPoints.backendUrl}/generate-token?phone=${searchParams?.get("phone")}&id=${searchParams?.get("id")}`
      // `/api/token?phone=${searchParams?.get("phone")}&id=${searchParams?.get("id")}`
    ).then((res) => res.json())

    setConnectionDetails({ wsUrl: url, token: accessToken, shouldConnect: true })
  }, [searchParams])

  const disconnect = useCallback(() => {
    setConnectionDetails((prev) => ({ ...prev, shouldConnect: false }))
  }, [])

  return (
    <ConnectionContext.Provider
      value={{
        wsUrl: connectionDetails.wsUrl,
        token: connectionDetails.token,
        shouldConnect: connectionDetails.shouldConnect,
        connect,
        disconnect,
      }}
    >
      {children}
    </ConnectionContext.Provider>
  )
}

export const useConnection = () => {
  const context = useContext(ConnectionContext)
  if (context === undefined) {
    throw new Error("useConnection must be used within a ConnectionProvider")
  }
  return context
}