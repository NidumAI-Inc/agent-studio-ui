import { NextResponse } from 'next/server';
import { getAgentsByUserId } from '@/actions';
import getCollection from '@/lib/get-collection';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const user_id = searchParams.get('user_id') || ""

    if (!user_id) return new NextResponse("user_id is missing", { status: 500 })

    const thirdPartyCollection = await getCollection('third-party')
    const details = await thirdPartyCollection.find({ user_id }).toArray()

    const agents = await getAgentsByUserId(user_id)

    const final = details.map(de => {
      return {
        ...de,
        agent_name: agents?.find((a: any) => a?.id === de.assistant_id)?.agent_name,
      }
    })

    return NextResponse.json(final)

  } catch (error) {
    return new NextResponse("Something went wrong", { status: 500 })
  }
}
