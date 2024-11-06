import { NextResponse } from 'next/server';
import axios from 'axios';

import getCollection from '@/lib/get-collection';
import endPoints from '@/utils/end-points';

export async function POST(req: Request) {
  try {
    const { userId } = await req.json()
    const usersCollection = await getCollection('profile')

    await usersCollection.deleteOne({ userId })
    await axios.delete(`${endPoints.backendUrl}/users/${userId}`)
    return NextResponse.json({ message: "Account deleted" })

  } catch (error) {
    return new NextResponse("Something went wrong", { status: 500 })
  }
}