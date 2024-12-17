import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import {
  TrackReferenceOrPlaceholder,
  useConnectionState,
  useDataChannel,
  useLocalParticipant,
  useRemoteParticipants,
  useTracks,
} from "@livekit/components-react";

import {
  ConnectionState,
  LocalParticipant,
  RoomEvent,
  Track,
} from "livekit-client";

import { useMultibandTrackVolume } from "@/hooks/use-track-volume";
import config from "@/lib/config";

import AudioVisualizer from "./audio-visualizer";
import LoadingSVG from "./loading-svg";

interface PlaygroundProps {
  onConnect: (connect: boolean) => void
}

type ChatMessageType = {
  name: string
  message: string
  isSelf: boolean
  timestamp: number
}

function Playground({ onConnect }: PlaygroundProps) {
  const [transcripts, setTranscripts] = useState<ChatMessageType[]>([])
  const { localParticipant } = useLocalParticipant()
  const searchParam = useSearchParams()

  const participants = useRemoteParticipants({
    updateOnlyOn: [RoomEvent.ParticipantMetadataChanged],
  })
  const agentParticipant = participants.find((p) => p.isAgent)

  const roomState = useConnectionState()
  const tracks = useTracks()

  useEffect(() => {
    if (roomState === ConnectionState.Connected) {
      localParticipant.setMicrophoneEnabled(true)
    }
  }, [localParticipant, roomState])

  let agentAudioTrack: TrackReferenceOrPlaceholder | undefined
  const aat = tracks.find(
    (trackRef) =>
      trackRef.publication.kind === Track.Kind.Audio &&
      trackRef.participant.isAgent
  )
  if (aat) {
    agentAudioTrack = aat
  } else if (agentParticipant) {
    agentAudioTrack = {
      participant: agentParticipant,
      source: Track.Source.Microphone,
    }
  }

  const subscribedVolumes = useMultibandTrackVolume(
    agentAudioTrack?.publication?.track,
    5
  )

  const localTracks = tracks.filter(
    ({ participant }) => participant instanceof LocalParticipant
  )
  const localMicTrack = localTracks.find(
    ({ source }) => source === Track.Source.Microphone
  )

  const localMultibandVolume = useMultibandTrackVolume(
    localMicTrack?.publication.track,
    20
  )

  const onDataReceived = useCallback(
    (msg: any) => {
      if (msg.topic === "transcription") {
        const decoded = JSON.parse(
          new TextDecoder("utf-8").decode(msg.payload)
        )
        let timestamp = new Date().getTime()
        if ("timestamp" in decoded && decoded.timestamp > 0) {
          timestamp = decoded.timestamp
        }
        setTranscripts([
          ...transcripts,
          {
            name: "You",
            message: decoded.text,
            timestamp: timestamp,
            isSelf: true,
          },
        ])
      }
    },
    [transcripts]
  )

  useDataChannel(onDataReceived)

  const audioContent = useMemo(() => {
    const disconnectedContent = (
      <div className="flex flex-col items-center justify-center gap-2 text-gray-400 text-center w-full h-full">
        <p className="text-2xl">{config.companyName} Agent</p>
        <p className="text-sm">Connect to get started</p>
      </div>
    )

    const waitingContent = (
      <div className="flex flex-col items-center gap-4 text-gray-400 text-center w-full h-full">
        <LoadingSVG />
        <p className="text-xl">Waiting for audio track</p>
      </div>
    )

    const visualizerContent = (
      <div className="flex flex-col h-full w-full">
        <div className="flex-grow flex items-center justify-center">
          <AudioVisualizer
            state="speaking"
            barWidth={12}
            minBarHeight={20}
            maxBarHeight={240}
            accentColor="bg-amber-500"
            accentShade="shadow-amber-500"
            frequencies={subscribedVolumes}
            borderRadius={6}
            gap={6}
          />
        </div>
      </div>
    )

    if (roomState === ConnectionState.Disconnected) {
      return disconnectedContent
    }

    if (!agentAudioTrack) {
      return waitingContent
    }

    return visualizerContent
  }, [
    agentAudioTrack,
    subscribedVolumes,
    roomState,
  ])

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-8 flex flex-col">
      <header className="flex justify-between items-center flex-wrap gap-y-2 mb-8">
        <div className="flex items-center">
          <img
            src="https://raw.githubusercontent.com/aivfkesavan/installation-guide-site/main/public/logo.png"
            alt="Logo"
            className="h-8 sm:h-10 w-auto mr-2 sm:mr-4"
          />
          <h1 className="text-base sm:text-xl md:text-3xl tracking-wider">{config.companyName} <span>Conversational Agent</span></h1>
        </div>

        <button
          onClick={() => onConnect(roomState === ConnectionState.Disconnected)}
          className={`px-4 py-1.5 sm:px-6 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${roomState === ConnectionState.Connected
            ? 'bg-red-500 hover:bg-red-600 text-white'
            : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
        >
          {roomState === ConnectionState.Connected ? 'Disconnect' : 'Connect'}
        </button>
      </header>

      <div className="flex-grow flex flex-col gap-8">
        <div className="bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl p-6 border border-gray-800 flex-grow border-none">
          <h2 className="text-2xl mb-4 text-center text-amber-400">Agent: {searchParam?.get("agent")}</h2>
          <div className="h-60">
            {audioContent}
          </div>
        </div>

        <div className="flex flex-col gap-8 lg:w-1/3 lg:mx-auto">
          <div className="bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl p-6 border border-gray-800">
            <h2 className="text-sm mb-1 -mt-2 text-amber-400">User</h2>
            {localMicTrack && (
              <div className="flex flex-row gap-2 h-[40px] items-center w-full justify-center border rounded-sm border-gray-800 bg-gray-900">
                <AudioVisualizer
                  state="speaking"
                  barWidth={4}
                  minBarHeight={2}
                  maxBarHeight={50}
                  accentColor={"bg-gray-400"}
                  accentShade="shadow-gray-400"
                  frequencies={localMultibandVolume}
                  borderRadius={2}
                  gap={4}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Playground
