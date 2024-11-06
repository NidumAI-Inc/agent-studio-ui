import { NextResponse } from "next/server";
import type { AccessTokenOptions, VideoGrant } from "livekit-server-sdk";
import { AccessToken } from "livekit-server-sdk";

const apiKey = process.env.LIVEKIT_API_KEY
const apiSecret = process.env.LIVEKIT_API_SECRET

const createToken = (userInfo: AccessTokenOptions, grant: VideoGrant) => {
  const at = new AccessToken(apiKey, apiSecret, userInfo)
  at.addGrant(grant)
  return at.toJwt()
}

export async function GET(req: Request) {
  try {
    if (!apiKey || !apiSecret) {
      return new NextResponse("Environment variables aren't set up correctly", { status: 500 })
    }

    const { searchParams } = new URL(req.url)
    const phone = searchParams.get('phone')
    const id = searchParams.get('id')

    if (!phone || !id) {
      return new NextResponse("Missing required query parameters", { status: 400 })
    }

    const roomName = phone
    const identity = `web_${id}`

    const grant: VideoGrant = {
      room: roomName,
      roomJoin: true,
      canPublish: true,
      canPublishData: true,
      canSubscribe: true,
    }

    const token = await createToken({ identity }, grant)
    const result = {
      identity,
      accessToken: token,
    }

    return NextResponse.json(result)

  } catch (e) {
    return new NextResponse((e as Error).message, { status: 500 })
  }
}